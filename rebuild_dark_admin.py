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
          A
        </div>
        <span className="font-black text-white text-xl tracking-tight text-right w-full">أروى أدمن</span>
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
              <span className="text-white font-bold text-xs">AD</span>
            </div>
            <div className="text-right flex flex-col">
              <span className="text-xs font-bold text-white">admin@arwa.store</span>
              <span className="text-[10px] text-slate-500">Administrator</span>
            </div>
          </div>
          <div className="md:hidden font-black text-lg text-white">أروى أدمن</div>
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
  
  // Auth Config from Env
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "noor123";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === adminPassword) {
      setIsAuthenticated(true);
    } else {
      alert("كلمة المرور خاطئة!");
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
      <form onSubmit={handleLogin} className="bg-[#1c1f2e] p-10 rounded-2xl shadow-2xl w-full max-w-[400px] flex flex-col items-center border border-white/5">
        <div className="w-12 h-12 bg-[#fbbf24] text-[#1c1f2e] flex items-center justify-center font-black text-xl rounded-lg mb-6">A</div>
        <h1 className="text-xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-xs text-slate-400 mb-10">Sign in with your admin credentials</p>
        
        <div className="w-full mb-5">
          <label className="text-[10px] font-bold text-white uppercase tracking-wider mb-2 block text-left w-full">Username</label>
          <input type="text" value="admin" disabled className="w-full bg-[#131522] border border-white/5 rounded-lg px-4 py-3.5 text-sm text-slate-500 text-left outline-none" dir="ltr" />
        </div>

        <div className="w-full mb-8">
          <label className="text-[10px] font-bold text-white uppercase tracking-wider mb-2 block text-left w-full">Password</label>
          <input type="password" placeholder="••••••••" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className="w-full bg-[#131522] border border-white/5 rounded-lg px-4 py-3.5 text-sm text-white text-left outline-none focus:border-[#fbbf24]" dir="ltr" />
        </div>

        <button type="submit" className="w-full bg-[#fbbf24] text-[#1c1f2e] rounded-lg py-3.5 text-sm font-bold hover:bg-yellow-400 transition-all">Sign In</button>
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

ORDERS_TSX = """'use client';
import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import * as XLSX from "xlsx";
import { format, isToday, isThisWeek, isThisMonth, parseISO } from "date-fns";
import { Search, Download, Filter } from 'lucide-react';

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

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); 
  const [searchQuery, setSearchQuery] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    if (data) setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase.from("orders").update({ status: newStatus }).eq("id", id);
    if (!error) setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const duplicatePhones = useMemo(() => {
    const counts: Record<string, number> = {};
    orders.forEach(o => { counts[o.phone] = (counts[o.phone] || 0) + 1; });
    return new Set(Object.keys(counts).filter(k => counts[k] > 1));
  }, [orders]);

  const duplicateIPs = useMemo(() => {
    const counts: Record<string, number> = {};
    orders.forEach(o => {
      if (o.ip_address && o.ip_address !== "unknown" && o.ip_address !== "shadow-blocked") {
        counts[o.ip_address] = (counts[o.ip_address] || 0) + 1;
      }
    });
    return new Set(Object.keys(counts).filter(k => counts[k] > 1));
  }, [orders]);

  const isDuplicate = (order: Order) => {
    return duplicatePhones.has(order.phone) || (order.ip_address && order.ip_address !== "unknown" && order.ip_address !== "shadow-blocked" && duplicateIPs.has(order.ip_address));
  };

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = order.name.includes(searchQuery) || order.phone.includes(searchQuery) || order.city.includes(searchQuery);
      if (!matchesSearch) return false;
      const date = parseISO(order.created_at);
      if (filter === "today") return isToday(date);
      if (filter === "week") return isThisWeek(date);
      if (filter === "month") return isThisMonth(date);
      return true;
    });
  }, [orders, filter, searchQuery]);

  const exportToExcel = () => {
    const dataToExport = filteredOrders.map(o => ({
      "رقم الطلب": o.id,
      "التاريخ": format(parseISO(o.created_at), "yyyy-MM-dd HH:mm"),
      "العميل": o.name,
      "الهاتف": o.phone,
      "المدينة": o.city,
      "نوع العرض": `${o.bundle_type} فلاش`,
      "المبلغ (درهم)": o.total_price,
      "الحالة": o.status,
      "IP Address": o.ip_address || "N/A"
    }));
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    XLSX.writeFile(workbook, `Orders_${format(new Date(), "yyyy-MM-dd")}.xlsx`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">الطلبيات</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute right-3 top-3 text-slate-500" />
            <input 
              type="text" 
              placeholder="بحث (اسم، هاتف، مدينة).." 
              className="bg-[#1c1f2e] border border-white/5 text-white rounded-lg pr-10 pl-4 py-2 outline-none text-sm w-full md:w-64 focus:border-[#fbbf24]"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <select className="bg-[#1c1f2e] border border-white/5 text-white rounded-lg px-4 py-2 text-sm outline-none focus:border-[#fbbf24]" value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="all">كل الأوقات</option>
            <option value="today">اليوم</option>
            <option value="week">هذا الأسبوع</option>
            <option value="month">هذا الشهر</option>
          </select>
          <button onClick={exportToExcel} className="bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 text-emerald-400 transition px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
             <Download className="w-4 h-4" /> CSV
          </button>
        </div>
      </div>

      <div className="bg-[#1c1f2e] rounded-2xl shadow-lg border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-[#11131e] text-slate-400 border-b border-white/5">
              <tr>
                <th className="p-4 font-semibold">تحذير</th>
                <th className="p-4 font-semibold">التاريخ</th>
                <th className="p-4 font-semibold">العميل</th>
                <th className="p-4 font-semibold">الهاتف</th>
                <th className="p-4 font-semibold">المدينة</th>
                <th className="p-4 font-semibold">العرض</th>
                <th className="p-4 font-semibold">المبلغ</th>
                <th className="p-4 font-semibold">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? <tr><td colSpan={8} className="p-8 text-center text-slate-500">جاري التحميل...</td></tr> : 
                filteredOrders.map(order => {
                  const dup = isDuplicate(order);
                  return (
                  <tr key={order.id} className={`hover:bg-white/5 transition ${dup ? 'bg-red-500/5' : ''}`}>
                    <td className="p-4">
                      {dup && <span className="bg-red-500/20 text-red-400 border border-red-500/20 px-2 py-1 rounded text-xs font-bold">مكرر ⚠️</span>}
                    </td>
                    <td className="p-4 text-slate-400">{format(parseISO(order.created_at), "dd/MM/yyyy HH:mm")}</td>
                    <td className="p-4 font-bold text-white">{order.name}</td>
                    <td className="p-4 font-mono text-blue-400" dir="ltr">{order.phone}</td>
                    <td className="p-4 text-slate-300">{order.city}</td>
                    <td className="p-4 font-semibold text-slate-200">{order.bundle_type} فلاش</td>
                    <td className="p-4 font-black text-emerald-400">{order.total_price} د.م</td>
                    <td className="p-4">
                      <select className="bg-[#131522] border border-white/10 text-xs rounded-lg p-1.5 outline-none font-bold cursor-pointer text-slate-300 focus:border-[#fbbf24]" value={order.status} onChange={(e) => updateStatus(order.id, e.target.value)}>
                        <option value="new">جديد</option>
                        <option value="processing">معالجة</option>
                        <option value="shipped">شحن</option>
                        <option value="delivered">مُوصّل</option>
                        <option value="cancelled">ملغى</option>
                      </select>
                    </td>
                  </tr>
                )})}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
"""

CALL_CENTER_TSX = """'use client';
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { format, parseISO } from "date-fns";
import { PhoneCall, CheckCircle, XCircle, PhoneMissed } from 'lucide-react';

type Order = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  city: string;
  bundle_type: number;
  total_price: number;
  status: string;
};

export default function CallCenterPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNewOrders = async () => {
    setLoading(true);
    const { data } = await supabase.from("orders").select("*").eq("status", "new").order("created_at", { ascending: true });
    if (data) setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchNewOrders();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase.from("orders").update({ status: newStatus }).eq("id", id);
    if (!error) {
      setOrders(orders.filter(o => o.id !== id));
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center bg-[#1c1f2e] p-6 rounded-2xl shadow-lg border border-white/5">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-3">
            <PhoneCall className="text-[#fbbf24]" /> مركز الإتصال
          </h1>
          <p className="text-slate-400 text-sm mt-1">لديك <strong className="text-[#fbbf24]">{orders.length}</strong> طلب جديد في الانتظار.</p>
        </div>
        <button onClick={fetchNewOrders} className="bg-[#131522] border border-white/10 hover:bg-white/5 transition px-5 py-2.5 rounded-lg text-sm font-bold text-white">تحديث القائمة</button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center p-10 text-slate-500 font-bold">جاري التحميل...</div>
        ) : orders.length === 0 ? (
          <div className="text-center p-16 bg-[#1c1f2e] rounded-2xl border border-white/5">
            <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4 opacity-50" />
            <h2 className="text-xl font-bold text-white">لا توجد طلبات معلقة!</h2>
            <p className="text-slate-400 mt-2">عمل ممتاز، لقد تم تأكيد جميع الطلبات.</p>
          </div>
        ) : (
          orders.map((order, idx) => (
            <div key={order.id} className="bg-[#1c1f2e] rounded-2xl shadow-lg border border-white/5 p-6 flex flex-col md:flex-row gap-6 justify-between items-center transition-all hover:border-[#fbbf24]/50">
              
              <div className="flex gap-6 w-full md:w-auto">
                <div className="w-12 h-12 rounded-full bg-[#131522] border border-white/10 text-slate-400 flex items-center justify-center font-black text-xl shrink-0">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="text-xl font-black text-white mb-1">{order.name}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1 font-mono text-lg text-blue-400 font-bold" dir="ltr">{order.phone}</span>
                    <span className="flex items-center gap-1">• {order.city}</span>
                    <span className="flex items-center gap-1">• {format(parseISO(order.created_at), "dd/MM/yyyy HH:mm")}</span>
                  </div>
                  <div className="mt-3 inline-block bg-[#fbbf24]/10 text-[#fbbf24] px-3 py-1.5 rounded-lg text-xs font-bold border border-[#fbbf24]/20">
                    العرض: {order.bundle_type} فلاش | السعر: {order.total_price} د.م
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:flex sm:flex-row gap-3 w-full md:w-auto shrink-0">
                <button onClick={() => updateStatus(order.id, "processing")} className="bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 text-emerald-400 px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition">
                  <CheckCircle className="w-4 h-4" /> تأكيد
                </button>
                <button onClick={() => updateStatus(order.id, "cancelled")} className="bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition">
                  <XCircle className="w-4 h-4" /> إلغاء
                </button>
                <button onClick={() => updateStatus(order.id, "new")} className="bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition col-span-2 sm:col-span-1">
                  <PhoneMissed className="w-4 h-4" /> لا يجيب
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
"""

with open(f"{ADMIN_DIR}/layout.tsx", "w", encoding="utf-8") as f: f.write(LAYOUT_TSX)
with open(f"{ADMIN_DIR}/page.tsx", "w", encoding="utf-8") as f: f.write(PAGE_TSX)
with open(f"{ADMIN_DIR}/orders/page.tsx", "w", encoding="utf-8") as f: f.write(ORDERS_TSX)
with open(f"{ADMIN_DIR}/call-center/page.tsx", "w", encoding="utf-8") as f: f.write(CALL_CENTER_TSX)

print("Dark mode admin rewrite complete.")
