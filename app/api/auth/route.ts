import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const { action, name, contact, password } = await request.json();

    if (action === 'register') {
      // HAPA TUNAZUIA DUPLICATION (KAMA NAMBA AU EMAIL IPO, INAKATAA)
      const existingUser = await sql`SELECT id FROM users WHERE contact = ${contact}`;
      if (existingUser.length > 0) {
        return NextResponse.json({ success: false, message: 'Namba ya simu au Email hii imeshasajiliwa! Tafadhali Ingia (Login).' }, { status: 400 });
      }

      // Kama haipo, tunamsajili
      const result = await sql`INSERT INTO users (name, contact, password) VALUES (${name}, ${contact}, ${password}) RETURNING id, name, contact`;
      return NextResponse.json({ success: true, user: result[0] });
    } 
    
    if (action === 'login') {
      // HAPA TUNAHAKIKISHA PASSWORD NA CONTACT ZIPO SAHIHI
      const users = await sql`SELECT id, name, contact FROM users WHERE contact = ${contact} AND password = ${password}`;
      if (users.length === 0) {
        return NextResponse.json({ success: false, message: 'Namba au Password sio sahihi.' }, { status: 401 });
      }
      return NextResponse.json({ success: true, user: users[0] });
    }

  } catch (error) {
    console.error("Auth Error:", error);
    return NextResponse.json({ success: false, message: "Tatizo la kimtandao." }, { status: 500 });
  }
}