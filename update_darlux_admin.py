import os

ADMIN_DIR = "src/app/adminpage"

LAYOUT_TSX = """'use client'

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
"""

PAGE_TSX = """'use client';

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import * as XLSX from "xlsx";
import { format, isToday, isThisWeek, isThisMonth, parseISO } from "date-fns";
import Link from 'next/link';
import { ShoppingBag, PhoneCall, Users, BarChart3, TrendingUp, DollarSign, Package, LayoutDashboard } from 'lucide-react';

type Order = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  city: string;
  bundle_type: number;
  total_price: number;
  status: string;
  ip_address?: string;
};

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Auth Config
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput === "octo" && passwordInput === "123456") {
      setIsAuthenticated(true);
    } else {
      alert("معلومات الدخول غير صحيحة!");
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    if (data) setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) fetchOrders();
  }, [isAuthenticated]);

  const stats = useMemo(() => {
    let totalRevenue = 0, todayOrders = 0, todayRevenue = 0, newCount = 0;
    orders.forEach(o => {
      if (o.status !== "cancelled") totalRevenue += o.total_price;
      const date = parseISO(o.created_at);
      if (isToday(date)) {
        todayOrders++;
        if (o.status !== "cancelled") todayRevenue += o.total_price;
      }
      if (o.status === "new") newCount++;
    });
    return { totalOrders: orders.length, totalRevenue, todayOrders, todayRevenue, newCount };
  }, [orders]);

  if (!isAuthenticated) return (
    <div className="flex items-center justify-center min-h-[85vh]">
      <form onSubmit={handleLogin} className="bg-[#1c1f2e] p-10 rounded-2xl shadow-2xl w-full max-w-[400px] flex flex-col items-center border border-white/5 relative overflow-hidden">
        {/* Glow effect behind logo */}
        <div className="absolute top-0 w-full h-32 bg-[#fbbf24]/5 blur-3xl rounded-full"></div>
        
        <div className="relative z-10 w-12 h-12 bg-[#fbbf24] text-[#1c1f2e] flex items-center justify-center font-black text-xl rounded-lg mb-6 shadow-[0_0_15px_rgba(251,191,36,0.3)]">D</div>
        <h1 className="relative z-10 text-xl font-bold text-white mb-2">DarLux Dashboard</h1>
        <p className="relative z-10 text-xs text-slate-400 mb-10">Sign in with your admin credentials</p>
        
        <div className="relative z-10 w-full mb-5">
          <label className="text-[10px] font-bold text-white uppercase tracking-wider mb-2 block text-left w-full">Username</label>
          <input type="text" placeholder="Enter username..." value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} className="w-full bg-[#131522] border border-white/5 rounded-lg px-4 py-3.5 text-sm text-white text-left outline-none focus:border-[#fbbf24] transition-colors" dir="ltr" />
        </div>

        <div className="relative z-10 w-full mb-8">
          <label className="text-[10px] font-bold text-white uppercase tracking-wider mb-2 block text-left w-full">Password</label>
          <input type="password" placeholder="••••••••" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className="w-full bg-[#131522] border border-white/5 rounded-lg px-4 py-3.5 text-sm text-white text-left outline-none focus:border-[#fbbf24] transition-colors" dir="ltr" />
        </div>

        <button type="submit" className="relative z-10 w-full bg-[#fbbf24] text-[#1c1f2e] rounded-lg py-3.5 text-sm font-bold hover:bg-yellow-400 transition-all shadow-[0_0_15px_rgba(251,191,36,0.2)]">Sign In</button>
      </form>
    </div>
  );

  return (
    <div className="space-y-8 p-2">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-[#fbbf24]" /> لوحة القيادة
          </h1>
        </div>
        <button onClick={fetchOrders} className="bg-[#1c1f2e] border border-white/10 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-white/5 transition-all">تحديث البيانات</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-[#1c1f2e] p-6 rounded-2xl shadow-lg border border-white/5 flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-xs font-bold block mb-1">إجمالي الطلبات</span>
            <span className="text-3xl font-black text-white">{stats.totalOrders}</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center text-xl border border-blue-500/20">
            <Package className="w-5 h-5" />
          </div>
        </div>
        
        <div className="bg-[#1c1f2e] p-6 rounded-2xl shadow-lg border border-white/5 flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-xs font-bold block mb-1">إجمالي المبيعات</span>
            <span className="text-3xl font-black text-emerald-400">{stats.totalRevenue}</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xl border border-emerald-500/20">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#1c1f2e] p-6 rounded-2xl shadow-lg border border-white/5 flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-xs font-bold block mb-1">طلبات اليوم</span>
            <span className="text-3xl font-black text-white">{stats.todayOrders}</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#fbbf24]/10 text-[#fbbf24] flex items-center justify-center text-xl border border-[#fbbf24]/20">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#1c1f2e] p-6 rounded-2xl shadow-lg border border-white/5 flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-xs font-bold block mb-1">طلبات جديدة</span>
            <span className="text-3xl font-black text-red-400">{stats.newCount}</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center text-xl border border-red-500/20">
            <PhoneCall className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-[#1c1f2e] rounded-2xl shadow-lg border border-white/5 p-6">
           <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-white"><ShoppingBag className="w-5 h-5 text-[#fbbf24]" /> اختصارات سريعة</h2>
           <div className="grid grid-cols-2 gap-4">
              <Link href="/adminpage/call-center" className="bg-[#131522] hover:bg-[#25283b] border border-white/5 p-6 rounded-xl flex flex-col items-center justify-center text-center transition-all">
                <PhoneCall className="w-8 h-8 text-[#fbbf24] mb-3" />
                <span className="font-bold text-white text-sm">مركز الإتصال</span>
              </Link>
              <Link href="/adminpage/orders" className="bg-[#131522] hover:bg-[#25283b] border border-white/5 p-6 rounded-xl flex flex-col items-center justify-center text-center transition-all">
                <Package className="w-8 h-8 text-blue-400 mb-3" />
                <span className="font-bold text-white text-sm">الطلبيات</span>
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
}
"""

with open(f"{ADMIN_DIR}/layout.tsx", "w", encoding="utf-8") as f: f.write(LAYOUT_TSX)
with open(f"{ADMIN_DIR}/page.tsx", "w", encoding="utf-8") as f: f.write(PAGE_TSX)
