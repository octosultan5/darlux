import os

ADMIN_DIR = "src/app/admin"

LAYOUT_TSX = """'use client'

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
"""

PAGE_TSX = """'use client';

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import * as XLSX from "xlsx";
import { format, isToday, isThisWeek, isThisMonth, parseISO } from "date-fns";
import Link from 'next/link';
import { ShoppingBag, PhoneCall, Users, BarChart3, TrendingUp, DollarSign, Package } from 'lucide-react';

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

  // Stats Calculations
  const stats = useMemo(() => {
    let totalRevenue = 0;
    let todayOrders = 0;
    let todayRevenue = 0;
    let newCount = 0;

    orders.forEach(o => {
      if (o.status !== "cancelled") {
        totalRevenue += o.total_price;
      }
      
      const date = parseISO(o.created_at);
      if (isToday(date)) {
        todayOrders++;
        if (o.status !== "cancelled") {
          todayRevenue += o.total_price;
        }
      }

      if (o.status === "new") newCount++;
    });

    return { totalOrders: orders.length, totalRevenue, todayOrders, todayRevenue, newCount };
  }, [orders]);

  if (!isAuthenticated) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-black text-slate-800 text-center mb-8">تسجيل الدخول للإدارة</h1>
        <input type="password" placeholder="كلمة المرور" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className="w-full bg-slate-50 border-2 rounded-xl px-5 py-4 mb-4 text-center outline-none focus:border-amber-500" dir="ltr" />
        <button type="submit" className="w-full bg-slate-900 text-white rounded-xl py-4 text-xl font-bold hover:bg-slate-800 transition">دخول</button>
      </form>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800">نظرة عامة (Overview)</h1>
          <p className="text-slate-500 text-sm mt-1">مرحباً بك في لوحة تحكم DarLux.</p>
        </div>
        <button onClick={fetchOrders} className="bg-white border text-slate-700 px-4 py-2 rounded-lg font-bold shadow-sm hover:bg-slate-50">تحديث البيانات</button>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-slate-500 text-sm font-medium block mb-1">إجمالي الطلبات</span>
            <span className="text-3xl font-black text-slate-800">{stats.totalOrders}</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
            <Package className="w-6 h-6" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-slate-500 text-sm font-medium block mb-1">إجمالي المبيعات</span>
            <span className="text-3xl font-black text-emerald-600">{stats.totalRevenue} د.م</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-slate-500 text-sm font-medium block mb-1">طلبات اليوم</span>
            <span className="text-3xl font-black text-slate-800">{stats.todayOrders}</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center text-xl">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-slate-500 text-sm font-medium block mb-1">طلبات جديدة للاتصال</span>
            <span className="text-3xl font-black text-amber-600">{stats.newCount}</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl">
            <PhoneCall className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
           <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><ShoppingBag className="w-5 h-5 text-slate-400" /> اختصارات سريعة</h2>
           <div className="grid grid-cols-2 gap-4">
              <Link href="/admin/call-center" className="bg-slate-50 hover:bg-slate-100 border border-slate-200 p-4 rounded-xl flex flex-col items-center justify-center text-center transition">
                <PhoneCall className="w-8 h-8 text-amber-500 mb-2" />
                <span className="font-bold text-slate-700">مركز الاتصال</span>
                <span className="text-xs text-slate-500 mt-1">تأكيد الطلبات الجديدة</span>
              </Link>
              <Link href="/admin/orders" className="bg-slate-50 hover:bg-slate-100 border border-slate-200 p-4 rounded-xl flex flex-col items-center justify-center text-center transition">
                <Package className="w-8 h-8 text-blue-500 mb-2" />
                <span className="font-bold text-slate-700">إدارة الطلبات</span>
                <span className="text-xs text-slate-500 mt-1">قائمة الطلبات الكاملة</span>
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
}
"""

ORDERS_PAGE_TSX = """'use client';
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
          <h1 className="text-2xl font-black text-slate-800">إدارة الطلبات</h1>
          <p className="text-slate-500 text-sm mt-1">عرض وإدارة جميع طلبات المتجر.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
            <input 
              type="text" 
              placeholder="بحث (اسم، هاتف، مدينة).." 
              className="border border-slate-200 rounded-lg pr-10 pl-4 py-2 outline-none text-sm w-full md:w-64"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <select className="border border-slate-200 rounded-lg px-4 py-2 text-sm bg-white outline-none" value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="all">كل الأوقات</option>
            <option value="today">اليوم</option>
            <option value="week">هذا الأسبوع</option>
            <option value="month">هذا الشهر</option>
          </select>
          <button onClick={exportToExcel} className="bg-emerald-600 hover:bg-emerald-700 transition text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
             <Download className="w-4 h-4" /> تصدير CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
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
            <tbody className="divide-y divide-slate-100">
              {loading ? <tr><td colSpan={8} className="p-8 text-center text-slate-400">جاري التحميل...</td></tr> : 
                filteredOrders.map(order => {
                  const dup = isDuplicate(order);
                  return (
                  <tr key={order.id} className={`hover:bg-slate-50 transition ${dup ? 'bg-red-50/30' : ''}`}>
                    <td className="p-4">
                      {dup && <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-bold">مكرر ⚠️</span>}
                    </td>
                    <td className="p-4 text-slate-500">{format(parseISO(order.created_at), "dd/MM/yyyy HH:mm")}</td>
                    <td className="p-4 font-bold text-slate-800">{order.name}</td>
                    <td className="p-4 font-mono text-blue-600" dir="ltr">{order.phone}</td>
                    <td className="p-4 text-slate-600">{order.city}</td>
                    <td className="p-4 font-semibold text-slate-700">{order.bundle_type} فلاش</td>
                    <td className="p-4 font-black text-emerald-600">{order.total_price} د.م</td>
                    <td className="p-4">
                      <select className="bg-slate-100 border border-slate-200 text-xs rounded-lg p-1.5 outline-none font-bold cursor-pointer text-slate-700" value={order.status} onChange={(e) => updateStatus(order.id, e.target.value)}>
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

CALL_CENTER_PAGE_TSX = """'use client';
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { format, parseISO } from "date-fns";
import { PhoneCall, CheckCircle, XCircle, PhoneMissed, Clock } from 'lucide-react';

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
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-3">
            <PhoneCall className="text-amber-500" /> مركز الاتصال (Call Center)
          </h1>
          <p className="text-slate-500 text-sm mt-1">قم بتأكيد الطلبات الجديدة بالترتيب. لديك <strong>{orders.length}</strong> طلب في الانتظار.</p>
        </div>
        <button onClick={fetchNewOrders} className="bg-slate-100 hover:bg-slate-200 transition px-4 py-2 rounded-lg text-sm font-bold">تحديث</button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center p-10 text-slate-400 font-bold">جاري تحميل الطلبات...</div>
        ) : orders.length === 0 ? (
          <div className="text-center p-16 bg-white rounded-2xl border border-slate-100">
            <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-700">عمل ممتاز!</h2>
            <p className="text-slate-500 mt-2">لا توجد طلبات جديدة معلقة للتأكيد.</p>
          </div>
        ) : (
          orders.map((order, idx) => (
            <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col md:flex-row gap-6 justify-between items-center transition-all hover:border-amber-200">
              
              <div className="flex gap-6 w-full md:w-auto">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-black text-xl shrink-0">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-800 mb-1">{order.name}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1 font-mono text-lg text-blue-600 font-bold" dir="ltr">{order.phone}</span>
                    <span className="flex items-center gap-1">• {order.city}</span>
                    <span className="flex items-center gap-1">• {format(parseISO(order.created_at), "dd/MM/yyyy HH:mm")}</span>
                  </div>
                  <div className="mt-3 inline-block bg-amber-50 text-amber-700 px-3 py-1 rounded-lg text-sm font-bold border border-amber-100">
                    العرض: {order.bundle_type} فلاش | السعر: {order.total_price} د.م
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:flex sm:flex-row gap-3 w-full md:w-auto shrink-0">
                <button onClick={() => updateStatus(order.id, "processing")} className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition">
                  <CheckCircle className="w-4 h-4" /> تأكيد
                </button>
                <button onClick={() => updateStatus(order.id, "cancelled")} className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition">
                  <XCircle className="w-4 h-4" /> إلغاء
                </button>
                <button onClick={() => updateStatus(order.id, "new")} className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition col-span-2 sm:col-span-1">
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

os.makedirs(f"{ADMIN_DIR}/orders", exist_ok=True)
os.makedirs(f"{ADMIN_DIR}/call-center", exist_ok=True)
os.makedirs(f"{ADMIN_DIR}/analytics", exist_ok=True)
os.makedirs(f"{ADMIN_DIR}/customers", exist_ok=True)
os.makedirs(f"{ADMIN_DIR}/settings", exist_ok=True)

with open(f"{ADMIN_DIR}/layout.tsx", "w", encoding="utf-8") as f:
    f.write(LAYOUT_TSX)
with open(f"{ADMIN_DIR}/page.tsx", "w", encoding="utf-8") as f:
    f.write(PAGE_TSX)
with open(f"{ADMIN_DIR}/orders/page.tsx", "w", encoding="utf-8") as f:
    f.write(ORDERS_PAGE_TSX)
with open(f"{ADMIN_DIR}/call-center/page.tsx", "w", encoding="utf-8") as f:
    f.write(CALL_CENTER_PAGE_TSX)

with open(f"{ADMIN_DIR}/analytics/page.tsx", "w", encoding="utf-8") as f:
    f.write('export default function Analytics() { return <div className="p-6 text-slate-500 font-bold text-xl">صفحة الإحصائيات (قيد التطوير)...</div>; }')
with open(f"{ADMIN_DIR}/customers/page.tsx", "w", encoding="utf-8") as f:
    f.write('export default function Customers() { return <div className="p-6 text-slate-500 font-bold text-xl">قاعدة بيانات العملاء (قيد التطوير)...</div>; }')
with open(f"{ADMIN_DIR}/settings/page.tsx", "w", encoding="utf-8") as f:
    f.write('export default function Settings() { return <div className="p-6 text-slate-500 font-bold text-xl">إعدادات المتجر (قيد التطوير)...</div>; }')

print("Admin dashboard fully restructured and built successfully.")
