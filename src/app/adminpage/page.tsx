'use client';

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
