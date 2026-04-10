import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';
const prisma = new PrismaClient();

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        vehicle: {
          include: { client: true }
        },
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
    const { name, phone, email, make, model, plate, issue, serviceType, vin } = body;

    // 1. Tafuta Mteja kwa kutumia findFirst
    let client = await prisma.client.findFirst({ where: { phone } });
    if (!client) {
      client = await prisma.client.create({ 
        data: { name, phone, email: email || null } 
      });
    }

    // 2. Tafuta Gari kwa kutumia findFirst
    let vehicle = await prisma.vehicle.findFirst({ where: { plate } });
    if (!vehicle) {
      vehicle = await prisma.vehicle.create({
        data: { plate, make, model, vin: vin || null, clientId: client.id }
      });
    }

    // 3. Tengeneza Kazi (Job) - HAPA NDIPO TULIPOREKEBISHA 'description'
    const jobData: any = {
      vehicleId: vehicle.id,
      serviceType: serviceType || 'General Repair',
      status: 'Pending'
    };

    // Tunatumia 'description' badala ya 'issue' kama Schema yako inavyotaka
    if (issue) {
      jobData.description = issue; 
    }

    const job = await prisma.job.create({
      data: jobData,
      include: { vehicle: { include: { client: true } } }
    });

    return NextResponse.json({ success: true, message: 'Booking successful', data: job }, { status: 201 });

  } catch (error: any) {
    console.error("💥 DATABASE ERROR (Booking):", error.message);
    return NextResponse.json({ 
      success: false, 
      message: error.message || 'System Error' 
    }, { status: 500 });
  }
}