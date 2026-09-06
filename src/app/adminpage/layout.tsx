'use client'

import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, ShoppingBag, PhoneCall, Users, BarChart3, Settings, LogOut } from 'lucide-react'

function SidebarContent() {
  const router = useRouter()
  const pathname = usePathname()
  
  const handleSignOut = () => {
    window.location.reload()
  }

  return (
    <aside className="w-64 bg-[#11131e] border-l border-white/5 hidden md:flex flex-col shrink-0 text-slate-300">
      <div className="p-6 border-b border-white/5 flex items-center justify-start gap-3 flex-row-reverse">
        <div className="w-8 h-8 bg-[#fbbf24] rounded-lg flex items-center justify-center text-[#11131e] font-black text-lg shrink-0">
          D
        </div>
        <span className="font-black text-white text-xl tracking-tight text-right w-full">DarLux Admin</span>
      </div>

      <nav className="flex-1 p-4 space-y-2 mt-4 text-sm font-medium">
        <NavLink href="/adminpage" icon={<LayoutDashboard className="w-5 h-5" />} label="لوحة القيادة" active={pathname === '/adminpage'} />
        <NavLink href="/adminpage/orders" icon={<ShoppingBag className="w-5 h-5" />} label="الطلبيات" active={pathname?.includes('/adminpage/orders')} />
        <NavLink href="/adminpage/call-center" icon={<PhoneCall className="w-5 h-5" />} label="مركز الإتصال" active={pathname?.includes('/adminpage/call-center')} />
        <NavLink href="/adminpage/customers" icon={<Users className="w-5 h-5" />} label="الزبائن" active={pathname?.includes('/adminpage/customers')} />
        <NavLink href="/adminpage/analytics" icon={<BarChart3 className="w-5 h-5" />} label="الإحصائيات" active={pathname?.includes('/adminpage/analytics')} />
        <NavLink href="/adminpage/settings" icon={<Settings className="w-5 h-5" />} label="الإعدادات" active={pathname?.includes('/adminpage/settings')} />
      </nav>

      <div className="p-4 border-t border-white/5 space-y-2">
        <button onClick={handleSignOut} className="flex items-center justify-end flex-row-reverse gap-3 px-4 py-2 w-full text-slate-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors font-bold">
          <LogOut className="w-5 h-5" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  )
}

function NavLink({ href, icon, label, active }: { href: string, icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <Link href={href} className={`flex items-center justify-end flex-row-reverse gap-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-white/5 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
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
    <div className="min-h-screen bg-[#161824] flex text-slate-200 font-sans" dir="rtl">
      <SidebarContent />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-[#11131e] border-b border-white/5 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-3 flex-row-reverse">
            <div className="w-10 h-10 bg-[#1c1f2e] rounded-full border border-white/10 flex items-center justify-center">
              <span className="text-white font-bold text-xs">DX</span>
            </div>
            <div className="text-right flex flex-col">
              <span className="text-xs font-bold text-white">octo@darlux.ma</span>
              <span className="text-[10px] text-slate-500">Administrator</span>
            </div>
          </div>
          <div className="md:hidden font-black text-lg text-white">DarLux Admin</div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  )
}
