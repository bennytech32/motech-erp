import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, make, model, plate, vin, issue } = body;

    // 1. Tafuta au Sajili Mteja
    let client = await prisma.client.findFirst({ where: { phone } });
    if (!client) {
      client = await prisma.client.create({ data: { name, phone, email } });
    }

    // 2. Tafuta au Sajili Gari
    let vehicle = await prisma.vehicle.findUnique({ where: { plate: plate.toUpperCase() } });
    if (!vehicle) {
      vehicle = await prisma.vehicle.create({
        data: { clientId: client.id, make, model, plate: plate.toUpperCase(), vin }
      });
    }

    // 3. Tengeneza Kazi (Job) - Hii inaingia moja kwa moja kama "In Progress" au "Pending"
    const newJob = await prisma.job.create({
      data: {
        vehicleId: vehicle.id,
        serviceType: "Walk-in Repair",
        description: issue,
        status: "Pending", 
        appointment: new Date(), // Muda huo huo
      }
    });

    return NextResponse.json({ success: true, message: 'Walk-in registered successfully', data: newJob }, { status: 201 });

  } catch (error) {
    console.error("Walk-in Registration Error:", error);
    return NextResponse.json({ success: false, message: 'Failed to register client' }, { status: 500 });
  }
}