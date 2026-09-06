'use client';

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
