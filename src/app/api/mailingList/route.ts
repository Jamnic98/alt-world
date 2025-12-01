import { NextResponse } from 'next/server'

import clientPromise from '@/lib/mongodb'

export const POST = async (req: Request) => {
  try {
    const { firstName, lastName, email } = await req.json()

    if (
      !firstName ||
      !lastName ||
      !email ||
      typeof firstName !== 'string' ||
      typeof lastName !== 'string' ||
      typeof email !== 'string'
    ) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db('altworld_database')
    const mailingList = db.collection('mailing_list')

    // avoid duplicates by email
    await mailingList.updateOne(
      { email },
      {
        $setOnInsert: {
          firstName,
          lastName,
          email,
          createdAt: new Date(),
        },
      },
      { upsert: true }
    )

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
