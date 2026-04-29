import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Data Privacy Policy',
  description: 'Wing Shack Data Privacy Policy',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-brand-offwhite">
      <div className="bg-brand-black py-20 px-4 text-center">
        <h1 className="font-display text-6xl md:text-7xl uppercase text-white tracking-wide leading-none">
          Privacy <span className="text-brand-red">Policy</span>
        </h1>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16 prose prose-slate">
        <p className="text-brand-gray text-sm">Last updated: {new Date().getFullYear()}</p>

        <h2 className="font-display text-3xl uppercase tracking-wide text-brand-black mt-8 mb-3">Information We Collect</h2>
        <p className="text-brand-gray leading-relaxed">
          Wing Shack collects information you voluntarily provide, such as your name, email address,
          and phone number when you fill out a contact or catering inquiry form. We do not collect
          payment information directly on this site.
        </p>

        <h2 className="font-display text-3xl uppercase tracking-wide text-brand-black mt-8 mb-3">How We Use Your Information</h2>
        <p className="text-brand-gray leading-relaxed">
          We use the information you provide solely to respond to inquiries, process catering requests,
          and improve our services. We do not sell, trade, or otherwise transfer your personal data to
          outside parties.
        </p>

        <h2 className="font-display text-3xl uppercase tracking-wide text-brand-black mt-8 mb-3">Cookies</h2>
        <p className="text-brand-gray leading-relaxed">
          This website may use basic cookies to improve user experience. You may disable cookies in
          your browser settings at any time. Disabling cookies may affect some functionality of this site.
        </p>

        <h2 className="font-display text-3xl uppercase tracking-wide text-brand-black mt-8 mb-3">Third-Party Links</h2>
        <p className="text-brand-gray leading-relaxed">
          Our site may contain links to third-party websites (such as Facebook or Google Maps).
          We are not responsible for the privacy practices of those sites and encourage you to review
          their policies separately.
        </p>

        <h2 className="font-display text-3xl uppercase tracking-wide text-brand-black mt-8 mb-3">Contact</h2>
        <p className="text-brand-gray leading-relaxed">
          For privacy-related questions, please contact us at{' '}
          <a href="mailto:corporate@wings-shack.com" className="text-brand-red hover:underline">
            corporate@wings-shack.com
          </a>
          .
        </p>
      </div>
    </div>
  )
}
