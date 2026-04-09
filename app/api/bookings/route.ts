import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// HII INAZUIA CACHING - Inafanya mfumo uvute data mpya kila mara
export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

// ============================================================================
// 1. KUTENGENEZA BOOKING MPYA (Mteja anapojaza Fomu)
// ============================================================================
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, make, model, plate, vin, issue, serviceType, date, time } = body;

    // Tafuta au Sajili Mteja
    let client = await prisma.client.findFirst({ where: { phone } });
    if (!client) {
      client = await prisma.client.create({ data: { name, phone, email } });
    }

    // Tafuta au Sajili Gari
    let vehicle = await prisma.vehicle.findUnique({ where: { plate: plate.toUpperCase() } });
    if (!vehicle) {
      vehicle = await prisma.vehicle.create({
        data: { clientId: client.id, make, model, plate: plate.toUpperCase(), vin }
      });
    }

    // Tengeneza Booking (Job)
    const appointmentDate = new Date(`${date} ${time}`);
    const newJob = await prisma.job.create({
      data: {
        vehicleId: vehicle.id,
        serviceType,
        description: issue,
        status: "Pending",
        appointment: appointmentDate,
      },
      include: { vehicle: { include: { client: true } } }
    });

    return NextResponse.json({ success: true, data: newJob }, { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json({ success: false, message: 'Failed to create booking' }, { status: 500 });
  }
}

// ============================================================================
// 2. KUVUTA BOOKINGS ZOTE (Kwa ajili ya Dashboard ya Reception/Admin)
// ============================================================================
export async function GET() {
  try {
    const bookings = await prisma.job.findMany({
      orderBy: { createdAt: 'desc' }, // Zilizotoka kuingia zikae juu
      include: {
        vehicle: { include: { client: true } },
        mechanic: true
      }
    });
    
    return NextResponse.json({ success: true, data: bookings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json({ success: false, message: 'Failed to fetch bookings' }, { status: 500 });
  }
}