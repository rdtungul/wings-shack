import { Resend } from 'resend'
import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json()

  if (!name || !email || !message) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const subjectLabels: Record<string, string> = {
    general: 'General Inquiry',
    catering: 'Catering / Party Pack',
    feedback: 'Feedback',
    careers: 'Careers',
    other: 'Other',
  }

  const subjectLabel = subjectLabels[subject] ?? subject ?? 'Contact Form'

  await prisma.contactSubmission.create({
    data: { name, email, subject: subject ?? null, message },
  })

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: process.env.RESEND_TO_EMAIL!,
    replyTo: email,
    subject: `[Wing Shack Contact] ${subjectLabel}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subjectLabel}`,
      '',
      message,
    ].join('\n'),
  })

  if (error) {
    console.error('Resend error (contact):', error)
  }

  return Response.json({ ok: true })
}
