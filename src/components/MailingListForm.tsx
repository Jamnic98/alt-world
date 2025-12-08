'use client'

import { useState } from 'react'

interface MailingListFormProps {
  title?: string
}

const MailingListForm = ({ title }: MailingListFormProps) => {
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!firstName || !lastName || !email) return

    setLoading(true)
    try {
      const res = await fetch('/api/mailingList', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email }),
      })

      if (res.ok) {
        setSuccess(true)
        setFirstName('')
        setLastName('')
        setEmail('')
        setTimeout(() => setSuccess(false), 3000)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full gap-3">
      {title && <h1 className="mb-2 text-xl font-semibold">{title}</h1>}

      {success && <p className="text-green-400">Successfully joined!</p>}

      <div className="flex flex-wrap w-full gap-2">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="flex-1 min-w-[130px] px-3 py-2 rounded-md border border-white/30 bg-transparent text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="flex-1 min-w-[130px] px-3 py-2 rounded-md border border-white/30 bg-transparent text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
        />
      </div>

      <div className="flex flex-wrap w-full gap-2">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 min-w-[130px] px-3 py-2 rounded-md border border-white/30 bg-transparent text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
        />

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 font-semibold text-white transition rounded-md cursor-pointer basis-full sm:basis-auto bg-amber-400 hover:bg-amber-500 disabled:opacity-50"
        >
          {loading ? 'Joining...' : 'Join'}
        </button>
      </div>
    </form>
  )
}

export default MailingListForm
