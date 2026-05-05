'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import { CheckCircle } from 'lucide-react'

const hearAboutOptions = [
  'Indeed',
  'Facebook / Social Media',
  'Friend or Family',
  'Walk-in / In-store',
  'Google',
  'Other',
]

type FormState = {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zip: string
  birthdate: string
  lastEmployer: string
  lastJobTitle: string
  lastJobFrom: string
  lastJobTo: string
  lastJobReason: string
  hearAbout: string
  additionalInfo: string
}

const initialForm: FormState = {
  firstName: '', lastName: '', email: '', phone: '',
  address: '', city: '', state: '', zip: '',
  birthdate: '',
  lastEmployer: '', lastJobTitle: '', lastJobFrom: '', lastJobTo: '', lastJobReason: '',
  hearAbout: '', additionalInfo: '',
}

const inputCls = 'w-full border border-brand-lightgray rounded-xl px-4 py-3 text-brand-black placeholder-brand-gray focus:outline-none focus:border-brand-red bg-white text-sm'
const labelCls = 'block text-sm font-semibold text-brand-black mb-1.5'
const sectionHeadCls = 'font-display text-2xl uppercase tracking-wide text-brand-black mb-5 mt-8 border-b border-brand-lightgray pb-2'

export default function CareersPage() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to send')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-brand-offwhite">
      {/* Hero */}
      <div className="bg-brand-black py-20 px-4 text-center">
        <h1 className="font-display text-7xl md:text-8xl uppercase text-white tracking-wide leading-none">
          Join Our <span className="text-brand-red">Flock</span>
        </h1>
        <p className="mt-4 text-white/70 text-lg max-w-xl mx-auto">
          Wing Shack is always looking for passionate people to join our growing team.
          Whether you&apos;re in the kitchen or front-of-house, we&apos;d love to have you.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16">
        {submitted ? (
          <div className="bg-white border border-brand-lightgray rounded-2xl p-12 text-center shadow-sm">
            <CheckCircle size={56} className="text-brand-red mx-auto mb-4" />
            <h2 className="font-display text-4xl uppercase tracking-wide text-brand-black mb-3">
              Application Received!
            </h2>
            <p className="text-brand-gray mb-8">
              Thanks for applying, {form.firstName}! Our team will review your application
              and reach out within 3–5 business days.
            </p>
            <Button
              variant="outline"
              onClick={() => { setSubmitted(false); setForm(initialForm); setError(null) }}
            >
              Submit Another Application
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-brand-lightgray p-8 md:p-12 space-y-0">

            {/* Personal Information */}
            <h2 className={sectionHeadCls} style={{ marginTop: 0 }}>Personal Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className={labelCls}>First Name <span className="text-brand-red">*</span></label>
                  <input id="firstName" name="firstName" type="text" required value={form.firstName} onChange={handleChange} placeholder="Jane" className={inputCls} />
                </div>
                <div>
                  <label htmlFor="lastName" className={labelCls}>Last Name <span className="text-brand-red">*</span></label>
                  <input id="lastName" name="lastName" type="text" required value={form.lastName} onChange={handleChange} placeholder="Smith" className={inputCls} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className={labelCls}>Email Address <span className="text-brand-red">*</span></label>
                  <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="jane@example.com" className={inputCls} />
                </div>
                <div>
                  <label htmlFor="phone" className={labelCls}>Phone Number <span className="text-brand-red">*</span></label>
                  <input id="phone" name="phone" type="tel" required value={form.phone} onChange={handleChange} placeholder="(803) 555-0100" className={inputCls} />
                </div>
              </div>
              <div>
                <label htmlFor="address" className={labelCls}>Street Address</label>
                <input id="address" name="address" type="text" value={form.address} onChange={handleChange} placeholder="123 Main St" className={inputCls} />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="col-span-2">
                  <label htmlFor="city" className={labelCls}>City</label>
                  <input id="city" name="city" type="text" value={form.city} onChange={handleChange} placeholder="Cayce" className={inputCls} />
                </div>
                <div>
                  <label htmlFor="state" className={labelCls}>State</label>
                  <input id="state" name="state" type="text" value={form.state} onChange={handleChange} placeholder="SC" maxLength={2} className={inputCls} />
                </div>
                <div>
                  <label htmlFor="zip" className={labelCls}>ZIP</label>
                  <input id="zip" name="zip" type="text" value={form.zip} onChange={handleChange} placeholder="29033" maxLength={10} className={inputCls} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="birthdate" className={labelCls}>Date of Birth <span className="text-brand-red">*</span></label>
                  <input id="birthdate" name="birthdate" type="date" required value={form.birthdate} onChange={handleChange} className={inputCls} />
                </div>
              </div>
            </div>

            {/* Last Job */}
            <h2 className={sectionHeadCls}>Last Job</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="lastEmployer" className={labelCls}>Employer</label>
                  <input id="lastEmployer" name="lastEmployer" type="text" value={form.lastEmployer} onChange={handleChange} placeholder="Company Name" className={inputCls} />
                </div>
                <div>
                  <label htmlFor="lastJobTitle" className={labelCls}>Job Title</label>
                  <input id="lastJobTitle" name="lastJobTitle" type="text" value={form.lastJobTitle} onChange={handleChange} placeholder="e.g. Cook, Cashier" className={inputCls} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="lastJobFrom" className={labelCls}>From</label>
                  <input id="lastJobFrom" name="lastJobFrom" type="month" value={form.lastJobFrom} onChange={handleChange} className={inputCls} />
                </div>
                <div>
                  <label htmlFor="lastJobTo" className={labelCls}>To</label>
                  <input id="lastJobTo" name="lastJobTo" type="month" value={form.lastJobTo} onChange={handleChange} className={inputCls} />
                </div>
              </div>
              <div>
                <label htmlFor="lastJobReason" className={labelCls}>Reason for Leaving</label>
                <input id="lastJobReason" name="lastJobReason" type="text" value={form.lastJobReason} onChange={handleChange} placeholder="e.g. Seeking new opportunities" className={inputCls} />
              </div>
            </div>

            {/* Additional */}
            <h2 className={sectionHeadCls}>Additional Information</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="hearAbout" className={labelCls}>How did you hear about this opening?</label>
                <select id="hearAbout" name="hearAbout" value={form.hearAbout} onChange={handleChange} className={inputCls}>
                  <option value="">Select an option</option>
                  {hearAboutOptions.map((h) => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="additionalInfo" className={labelCls}>Tell us about yourself</label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  rows={5}
                  value={form.additionalInfo}
                  onChange={handleChange}
                  placeholder="Share any relevant skills, experience, or anything else you'd like us to know..."
                  className={`${inputCls} resize-none`}
                />
              </div>
            </div>

            <div className="pt-8">
              {error && (
                <p className="text-sm text-red-600 mb-3">{error}</p>
              )}
              <Button type="submit" variant="primary" className="w-full py-4 text-base" disabled={loading}>
                {loading ? 'Submitting…' : 'Submit Application'}
              </Button>
              <p className="text-xs text-brand-gray text-center mt-4">
                Fields marked <span className="text-brand-red">*</span> are required.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
