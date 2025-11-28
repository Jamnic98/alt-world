import { NextResponse } from 'next/server'

import clientPromise from '@/lib/mongodb'

export const POST = async (req: Request) => {
  try {
    const { email } = await req.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db('altworld_database')
    const waitlist = db.collection('mailing_list')

    // avoid duplicates
    await waitlist.updateOne(
      { email },
      { $setOnInsert: { email, createdAt: new Date() } },
      { upsert: true }
    )

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
