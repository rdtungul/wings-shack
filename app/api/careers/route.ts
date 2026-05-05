import { Resend } from 'resend'
import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const data = await req.json()

  const {
    firstName, lastName, email, phone,
    address, city, state, zip, birthdate,
    lastEmployer, lastJobTitle, lastJobFrom, lastJobTo, lastJobReason,
    hearAbout, additionalInfo,
  } = data

  if (!firstName || !lastName || !email || !phone || !birthdate) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const lines = [
    '=== PERSONAL INFORMATION ===',
    `Name:      ${firstName} ${lastName}`,
    `Email:     ${email}`,
    `Phone:     ${phone}`,
    `Birthdate: ${birthdate}`,
    '',
    '=== ADDRESS ===',
    [address, city, state, zip].filter(Boolean).join(', ') || '(not provided)',
    '',
    '=== LAST JOB ===',
    `Employer:         ${lastEmployer || '(not provided)'}`,
    `Title:            ${lastJobTitle || '(not provided)'}`,
    `From:             ${lastJobFrom || '(not provided)'}`,
    `To:               ${lastJobTo || '(not provided)'}`,
    `Reason for leaving: ${lastJobReason || '(not provided)'}`,
    '',
    '=== ADDITIONAL INFORMATION ===',
    `How they heard about us: ${hearAbout || '(not provided)'}`,
    '',
    additionalInfo || '(no additional info)',
  ]

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: process.env.RESEND_TO_EMAIL!,
    replyTo: email,
    subject: `[Wing Shack Application] ${firstName} ${lastName}`,
    text: lines.join('\n'),
  })

  if (error) {
    console.error('Resend error:', error)
    return Response.json({ error: 'Failed to send application' }, { status: 500 })
  }

  await prisma.careerApplication.create({
    data: {
      firstName, lastName, email, phone, birthdate,
      address: address || null,
      city: city || null,
      state: state || null,
      zip: zip || null,
      lastEmployer: lastEmployer || null,
      lastJobTitle: lastJobTitle || null,
      lastJobFrom: lastJobFrom || null,
      lastJobTo: lastJobTo || null,
      lastJobReason: lastJobReason || null,
      hearAbout: hearAbout || null,
      additionalInfo: additionalInfo || null,
    },
  })

  return Response.json({ ok: true })
}
