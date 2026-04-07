import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Vuta data iliyotoka kwenye form ya mteja
    const body = await request.json();
    const { name, phone, carPlate, issue, lat, lng } = body;

    // Unganisha na Neon Database
    const sql = neon(process.env.DATABASE_URL!);

    // Ingiza data kwenye Table yetu
    await sql`
      INSERT INTO sos_alerts (name, phone, car_plate, issue, latitude, longitude)
      VALUES (${name}, ${phone}, ${carPlate}, ${issue}, ${lat}, ${lng})
    `;

    return NextResponse.json({ success: true, message: "SOS Alert saved successfully!" }, { status: 201 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ success: false, error: "Imeshindwa kutuma taarifa" }, { status: 500 });
  }
}