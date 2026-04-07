import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) return NextResponse.json({ success: false, message: "User ID missing" }, { status: 400 });

    const sql = neon(process.env.DATABASE_URL!);

    // Tunavuta taarifa zote za huyu mteja kwa mkupuo
    const vehicles = await sql`SELECT * FROM vehicles WHERE user_id = ${userId}`;
    const appointments = await sql`SELECT * FROM appointments WHERE user_id = ${userId} ORDER BY id DESC`;
    const history = await sql`SELECT * FROM service_history WHERE user_id = ${userId} ORDER BY id DESC`;

    return NextResponse.json({ 
      success: true, 
      data: { vehicles, appointments, history } 
    });

  } catch (error) {
    console.error("Dashboard Fetch Error:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}