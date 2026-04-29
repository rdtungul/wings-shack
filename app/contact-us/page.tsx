'use client'

import { useState } from 'react'
import { locations, hours, corporate } from '@/data/locations'
import { MapPin, Phone, Mail, Clock, Share2 } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="bg-brand-offwhite">
      {/* Header */}
      <div className="bg-brand-black py-20 px-4 text-center">
        <h1 className="font-display text-7xl md:text-8xl uppercase text-white tracking-wide leading-none">
          Contact <span className="text-brand-red">Us</span>
        </h1>
        <p className="mt-4 text-white/70 text-lg max-w-xl mx-auto">
          Questions, catering inquiries, or just want to say hey — we&apos;re here.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Contact Form */}
          <div>
            <h2 className="font-display text-4xl uppercase tracking-wide text-brand-black mb-8">
              Send Us a Message
            </h2>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="font-bold text-xl text-green-800 mb-2">Message Sent!</h3>
                <p className="text-green-700">
                  Thanks for reaching out. We&apos;ll get back to you within 1 business day.
                </p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                >
                  Send Another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-brand-black mb-1.5">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                    className="w-full border border-brand-lightgray rounded-xl px-4 py-3 text-brand-black placeholder-brand-gray focus:outline-none focus:border-brand-red bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-brand-black mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    className="w-full border border-brand-lightgray rounded-xl px-4 py-3 text-brand-black placeholder-brand-gray focus:outline-none focus:border-brand-red bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-brand-black mb-1.5">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full border border-brand-lightgray rounded-xl px-4 py-3 text-brand-black focus:outline-none focus:border-brand-red bg-white"
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="catering">Catering / Party Pack</option>
                    <option value="feedback">Feedback</option>
                    <option value="careers">Careers</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-brand-black mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className="w-full border border-brand-lightgray rounded-xl px-4 py-3 text-brand-black placeholder-brand-gray focus:outline-none focus:border-brand-red bg-white resize-none"
                  />
                </div>
                <Button type="submit" variant="primary" className="w-full py-4 text-base">
                  Send Message
                </Button>
              </form>
            )}
          </div>

          {/* Location Info */}
          <div>
            <h2 className="font-display text-4xl uppercase tracking-wide text-brand-black mb-8">
              Our Locations
            </h2>

            <div className="space-y-6">
              {locations.map((loc) => (
                <div key={loc.name} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-display text-2xl uppercase tracking-wide text-brand-black">
                      {loc.name}
                    </h3>
                    {loc.status !== 'open' && (
                      <span className="text-xs font-bold uppercase tracking-wide text-brand-orange bg-brand-orange/10 px-3 py-1 rounded-full whitespace-nowrap">
                        {loc.status === 'coming-soon' ? 'Coming Soon' : 'Opening Soon'}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 text-sm text-brand-gray">
                    <div className="flex items-start gap-2">
                      <MapPin size={14} className="text-brand-red mt-0.5 shrink-0" />
                      {loc.address}
                    </div>
                    {loc.phone && (
                      <a href={`tel:${loc.phone}`} className="flex items-center gap-2 hover:text-brand-red transition-colors">
                        <Phone size={14} className="text-brand-red" /> {loc.phone}
                      </a>
                    )}
                    {loc.email && (
                      <a href={`mailto:${loc.email}`} className="flex items-center gap-2 hover:text-brand-red transition-colors">
                        <Mail size={14} className="text-brand-red" /> {loc.email}
                      </a>
                    )}
                    {loc.facebook && (
                      <div className="flex items-center gap-2">
                        <Share2 size={14} className="text-brand-red" />
                        <span>{loc.facebook}</span>
                      </div>
                    )}
                  </div>

                  {loc.status === 'open' && (
                    <div className="mt-4 pt-4 border-t border-brand-lightgray">
                      <div className="flex items-center gap-1 text-xs font-semibold text-brand-gray uppercase tracking-wide mb-2">
                        <Clock size={12} /> Hours
                      </div>
                      {Object.entries(hours).map(([day, time]) => (
                        <div key={day} className="flex justify-between text-xs text-brand-gray py-0.5">
                          <span>{day}</span>
                          <span>{time}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Corporate */}
            <div className="mt-6 bg-brand-red rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-3">Corporate</h3>
              <div className="space-y-2 text-sm text-white/80">
                <a href={`tel:${corporate.phone}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone size={14} /> {corporate.phone}
                </a>
                <a href={`mailto:${corporate.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail size={14} /> {corporate.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Google Maps embed placeholder */}
        <div className="mt-16">
          <h2 className="font-display text-4xl uppercase tracking-wide text-brand-black mb-6">
            Find Us on the Map
          </h2>
          <div className="rounded-2xl overflow-hidden shadow-sm">
            <iframe
              title="Wing Shack Cayce Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3311.2!2d-81.0!3d33.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f8b!2s1305+Knox+Abbott+Dr%2C+Cayce%2C+SC+29033!5e0!3m2!1sen!2sus!4v1"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
