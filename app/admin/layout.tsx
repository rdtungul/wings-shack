import AdminShell from '@/components/admin/AdminShell'

export const metadata = { title: { default: 'Admin | Wing Shack', template: '%s | Wing Shack Admin' } }

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>
}
