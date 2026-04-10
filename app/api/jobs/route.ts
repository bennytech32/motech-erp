import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';
const prisma = new PrismaClient();

// ==========================================
// FUNCTION YA KUTUMA SMS (Automated)
// ==========================================
async function sendSMS(phone: string, message: string) {
  // Hapa utaweka API Keys zako utakapojisajili na mtandao wa SMS
  const API_KEY = process.env.SMS_API_KEY || 'WEKA_API_KEY_YAKO_HAPA';
  const SECRET_KEY = process.env.SMS_SECRET_KEY || 'WEKA_SECRET_KEY_YAKO_HAPA';

  // Format namba ianze na 255 badala ya 0
  let formattedPhone = phone;
  if (formattedPhone.startsWith('0')) {
    formattedPhone = '255' + formattedPhone.substring(1);
  }

  // SIMULATION: Wakati una-test, hii itaonekana kwenye Terminal yako
  console.log(`\n💬 [SYSTEM AUTOMATION] SMS Inatumwa kwenda: ${formattedPhone}`);
  console.log(`📝 [MESSAGE]: "${message}"\n`);

  // KODI HALISI YA KUTUMA SMS (Ipo tayari kwa matumizi ukiondoa hizi double slashes mwanzo mwa kila mstari)
  
  // try {
  //   await fetch('https://apisms.beem.africa/v1/send', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Basic ' + Buffer.from(API_KEY + ':' + SECRET_KEY).toString('base64')
  //     },
  //     body: JSON.stringify({
  //       source_addr: 'MOTECH-I',
  //       schedule_time: '',
  //       encoding: 0,
  //       message: message,
  //       recipients: [{ recipient_id: 1, dest_addr: formattedPhone }]
  //     })
  //   });
  // } catch(err) {
  //   console.error("SMS Failed to send:", err);
  // }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { jobId, status, mechanicName, mechanicEmail, mechanicNotes, requestedParts } = body;

    if (!jobId) {
      return NextResponse.json({ success: false, message: 'Job ID is required' }, { status: 400 });
    }

    const updateData: any = {};
    if (status) updateData.status = status;
    if (mechanicNotes !== undefined) updateData.mechanicNotes = mechanicNotes;
    if (requestedParts !== undefined) updateData.requestedParts = requestedParts;

    // HAPA TUNAMHIFADHI FUNDI KAMA AMEPEWA GARI
    if (mechanicName && mechanicEmail) {
      let user = await prisma.user.findUnique({ where: { email: mechanicEmail } });
      if (!user) {
        user = await prisma.user.create({
          data: {
            name: mechanicName,
            email: mechanicEmail,
            password: "motech_secured",
            role: "Mechanic"
          }
        });
      }
      updateData.mechanicId = user.id;
    }

    // UPDATE JOB KWENYE DATABASE NA KUVUTA TAARIFA ZA MTEJA
    const updatedJob = await prisma.job.update({
      where: { id: jobId },
      data: updateData,
      include: { 
        mechanic: true,
        vehicle: {
          include: { client: true }
        }
      }
    });

    // ==========================================
    // SMS TRIGGERS (Zinatumwa Kiotomatiki kulingana na Status)
    // ==========================================
    
    // 1. Kama gari limekamilika (Ready)
    if (status === 'Ready' && updatedJob.vehicle?.client) {
      const clientPhone = updatedJob.vehicle.client.phone;
      const clientName = updatedJob.vehicle.client.name.split(' ')[0]; 
      const plateNumber = updatedJob.vehicle.plate;
      
      const smsMessage = `Habari ${clientName}, matengenezo ya gari lako (${plateNumber}) yamekamilika. Lipo tayari kuchukuliwa. Karibu sana MoTech-i! Kwa msaada: 0758406251`;
      
      await sendSMS(clientPhone, smsMessage);
    } 
    
    // 2. Kama gari limeanza kutengenezwa (In Progress)
    else if (status === 'In Progress' && mechanicName && updatedJob.vehicle?.client) {
      const clientPhone = updatedJob.vehicle.client.phone;
      const clientName = updatedJob.vehicle.client.name.split(' ')[0];
      const plateNumber = updatedJob.vehicle.plate;
      
      const smsMessage = `Habari ${clientName}, gari lako (${plateNumber}) limekabidhiwa kwa fundi ${mechanicName} na linafanyiwa kazi. Fuatilia kupitia Portal yetu!`;
      
      await sendSMS(clientPhone, smsMessage);
    }

    return NextResponse.json({ success: true, message: 'Updated successfully', data: updatedJob }, { status: 200 });

  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ success: false, message: 'Failed to update' }, { status: 500 });
  }
}