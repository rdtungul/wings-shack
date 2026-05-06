import { SignIn } from '@clerk/nextjs'

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-display text-5xl uppercase text-white tracking-wide">
            Wing <span className="text-brand-red">Shack</span>
          </h1>
          <p className="text-white/50 text-sm mt-2 uppercase tracking-widest">Admin Portal</p>
        </div>
        <SignIn
          routing="hash"
          appearance={{
            elements: {
              card: 'bg-white rounded-2xl shadow-2xl',
              headerTitle: 'hidden',
              headerSubtitle: 'hidden',
              socialButtonsBlockButton: 'hidden',
              dividerRow: 'hidden',
              footerAction: 'hidden',
            },
          }}
        />
      </div>
    </div>
  )
}
