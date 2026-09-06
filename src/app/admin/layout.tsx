'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, ShoppingBag, PhoneCall, Users, BarChart3, Settings, LogOut } from 'lucide-react'

function SidebarContent() {
  const router = useRouter()
  
  const handleSignOut = () => {
    window.location.reload()
  }

  return (
    <aside className="w-64 bg-slate-900 border-l border-slate-800 hidden md:flex flex-col shrink-0 text-slate-300">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
            <span className="text-slate-900 font-black text-lg">D</span>
          </div>
          <span className="font-black text-white text-xl tracking-tight">DarLux Admin</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <NavLink href="/admin" icon={<LayoutDashboard className="w-5 h-5" />} label="لوحة القيادة" />
        <NavLink href="/admin/orders" icon={<ShoppingBag className="w-5 h-5" />} label="إدارة الطلبات" />
        <NavLink href="/admin/call-center" icon={<PhoneCall className="w-5 h-5" />} label="مركز الاتصال" />
        <NavLink href="/admin/customers" icon={<Users className="w-5 h-5" />} label="العملاء" />
        <NavLink href="/admin/analytics" icon={<BarChart3 className="w-5 h-5" />} label="الإحصائيات" />
        <NavLink href="/admin/settings" icon={<Settings className="w-5 h-5" />} label="الإعدادات" />
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-2">
        <button onClick={handleSignOut} className="flex items-center gap-3 px-4 py-2 w-full text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors font-medium">
          <LogOut className="w-5 h-5" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  )
}

function NavLink({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all font-bold">
      {icon}
      <span>{label}</span>
    </Link>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex" dir="rtl">
      <SidebarContent />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <div className="md:hidden font-black text-lg text-slate-800">DarLux Admin</div>
          <div className="hidden md:block"></div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-bold text-slate-900">admin@darlux.ma</div>
              <div className="text-xs text-slate-500">Administrator</div>
            </div>
            <div className="w-10 h-10 bg-slate-100 rounded-full border border-slate-200 flex items-center justify-center">
              <span className="text-slate-600 font-bold">AD</span>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
