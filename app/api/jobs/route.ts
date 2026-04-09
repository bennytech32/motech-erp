import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';
const prisma = new PrismaClient();

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

    // HAPA NDIPO TUNAPOMTAMBULISHA FUNDI KWENYE DATABASE
    if (mechanicName && mechanicEmail) {
      let user = await prisma.user.findUnique({ where: { email: mechanicEmail } });
      if (!user) {
        // Kama fundi hayupo, tunamweka kwenye Database
        user = await prisma.user.create({
          data: {
            name: mechanicName,
            email: mechanicEmail,
            password: "motech_secured",
            role: "Mechanic"
          }
        });
      }
      // Tunachukua ID halisi ya Database na kumpa gari
      updateData.mechanicId = user.id;
    }

    const updatedJob = await prisma.job.update({
      where: { id: jobId },
      data: updateData,
      include: { mechanic: true }
    });

    return NextResponse.json({ success: true, message: 'Updated successfully', data: updatedJob }, { status: 200 });

  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ success: false, message: 'Failed to update' }, { status: 500 });
  }
}