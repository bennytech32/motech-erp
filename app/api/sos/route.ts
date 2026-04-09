import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';
const prisma = new PrismaClient();

// MTEJA ANAPOTUMA SOS
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, location, issue } = body;

    const newSOS = await prisma.sOSAlert.create({
      data: { name, phone, location, issue }
    });

    return NextResponse.json({ success: true, data: newSOS }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to send SOS' }, { status: 500 });
  }
}

// ADMIN NA RECEPTION WANAPOSOMA SOS
export async function GET() {
  try {
    const alerts = await prisma.sOSAlert.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ success: true, data: alerts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to fetch alerts' }, { status: 500 });
  }
}

// KUFANGA SOS KAMA IMETATULIWA (Resolved)
export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();
    const updated = await prisma.sOSAlert.update({
      where: { id },
      data: { status }
    });
    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to update SOS' }, { status: 500 });
  }
}