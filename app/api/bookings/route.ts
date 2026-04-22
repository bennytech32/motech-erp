import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        vehicle: { include: { client: true } },
        mechanic: true
      },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ success: true, data: jobs });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, make, model, plate, issue, serviceType, vin, appointment } = body;

    // 1. Tafuta au Tengeneza Mteja
    let client = await prisma.client.findFirst({ where: { phone } });
    if (!client) {
      client = await prisma.client.create({ 
        data: { name, phone, email: email || null } 
      });
    }

    // 2. Tafuta au Tengeneza Gari
    let vehicle = await prisma.vehicle.findFirst({ where: { plate } });
    if (!vehicle) {
      vehicle = await prisma.vehicle.create({
        data: { plate, make, model, vin: vin || null, clientId: client.id }
      });
    }

    // 3. Tengeneza Kazi (Job Card)
    const job = await prisma.job.create({
      data: {
        vehicleId: vehicle.id,
        serviceType: serviceType || 'Online Booking',
        status: 'Pending',
        appointment: appointment ? new Date(appointment) : null,
        description: issue || "General Service Request"
      },
      include: { vehicle: { include: { client: true } } }
    });

    // =================================================================
    // 4. SEMA SMS INTEGRATION (DYNAMIC SENDER ID)
    // =================================================================
    
    // Format namba iwe 255...
    let formattedPhone = phone.replace(/\D/g, '');
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '255' + formattedPhone.substring(1);
    } else if (!formattedPhone.startsWith('255')) {
      formattedPhone = '255' + formattedPhone;
    }

    const dateStr = appointment ? new Date(appointment).toLocaleDateString('en-GB') : 'hivi karibuni';
    const smsMessage = `Habari ${name}, booking ya gari lako ${plate.toUpperCase()} kwa tarehe ${dateStr} imethibitishwa. Karibu sana MoTECH-i.`;

    try {
      const smsPayload = {
        api_id: process.env.SEMA_API_ID, 
        api_password: process.env.SEMA_API_PASSWORD, 
        sms_type: "T",
        encoding: "T",
        // Hapa inasoma SEMA_SENDER_ID toka .env, isipoipata inatumia "Sema" kama default
        sender_id: process.env.SEMA_SENDER_ID || "Sema", 
        phonenumber: formattedPhone,
        textmessage: smsMessage
      };

      await fetch('https://api.sema.co.tz/api/SendSMS', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(smsPayload)
      });
      
    } catch (smsError) {
      console.error("SMS Failed:", smsError);
    }
    // =================================================================

    return NextResponse.json({ success: true, data: job }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}