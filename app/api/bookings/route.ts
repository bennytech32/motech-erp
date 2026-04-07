import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const body = await request.json();
    const { name, contact, vehicle, plate, service, date, time } = body;

    // Ingiza Booking kwenye Database ya Admin/Receptionist
    await sql`
      INSERT INTO appointments (name, contact, vehicle, plate, service, apt_date, apt_time, status)
      VALUES (${name}, ${contact}, ${vehicle}, ${plate}, ${service}, ${date}, ${time}, 'Pending')
    `;

    return NextResponse.json({ success: true, message: "Booking received successfully!" });
  } catch (error) {
    console.error("Booking Error:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}