'use client';

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { format, isToday, isThisWeek, isThisMonth, parseISO } from "date-fns";
import Link from 'next/link';
import { ShoppingBag, PhoneCall, LayoutDashboard, Clock, TrendingUp, DollarSign, Package } from 'lucide-react';

type Order = { id: string; created_at: string; name: string; phone: string; city: string; bundle_type: number; total_price: number; status: string; };

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = usernameInput.toLowerCase();
    const isOcto = user === "octo" && passwordInput === "123456";
    const isAdmin = user === "admin" && passwordInput === "20262026";

    if (isOcto || isAdmin) {
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
    let lifetime = 0, month = 0, week = 0, today = 0;
    orders.forEach(o => {
      if (o.status === "cancelled" || o.status === "Canceled") return;
      lifetime++;
      const d = parseISO(o.created_at);
      if (isThisMonth(d)) month++;
      if (isThisWeek(d)) week++;
      if (isToday(d)) today++;
    });
    return { lifetime, month, week, today };
  }, [orders]);

  if (!isAuthenticated) return (
    <div className="flex items-center justify-center min-h-[85vh]">
      <form onSubmit={handleLogin} className="bg-[#1c1f2e] p-10 rounded-2xl shadow-2xl w-full max-w-[400px] flex flex-col items-center border border-white/5 relative overflow-hidden z-10">
        <div className="absolute top-0 w-full h-32 bg-[#d4af37]/5 blur-3xl rounded-full pointer-events-none z-0"></div>
        <div className="relative z-10 mb-6 w-full flex justify-center pointer-events-none">
           <img src="/darlux_logo_transparent.png" alt="DarLux" className="h-16 object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]" />
        </div>
        <h1 className="relative z-10 text-xl font-bold text-white mb-2">DarLux Admin</h1>
        <p className="relative z-10 text-xs text-slate-400 mb-10">Sign in with your admin credentials</p>
        <div className="relative z-20 w-full mb-5">
          <label className="text-[10px] font-bold text-white uppercase tracking-wider mb-2 block text-left w-full">Username</label>
          <input type="text" placeholder="Enter octo..." value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} className="w-full bg-[#131522] border border-white/10 rounded-lg px-4 py-3.5 text-sm text-white text-left outline-none focus:border-[#d4af37] transition-colors relative z-20" dir="ltr" />
        </div>
        <div className="relative z-20 w-full mb-8">
          <label className="text-[10px] font-bold text-white uppercase tracking-wider mb-2 block text-left w-full">Password</label>
          <input type="password" placeholder="••••••••" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className="w-full bg-[#131522] border border-white/10 rounded-lg px-4 py-3.5 text-sm text-white text-left outline-none focus:border-[#d4af37] transition-colors relative z-20" dir="ltr" />
        </div>
        <button type="submit" className="relative z-20 w-full bg-[#d4af37] text-[#1c1f2e] rounded-lg py-3.5 text-sm font-bold hover:bg-[#c5a059] transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)] cursor-pointer">Sign In</button>
      </form>
    </div>
  );

  return (
    <div className="space-y-8 p-2 font-['Alexandria',sans-serif]">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            نظرة عامة
          </h1>
          <p className="text-slate-400 text-xs mt-1">مرحباً بك مجدداً! إليك ملخص اليوم.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-[#1c1f2e] p-6 rounded-2xl shadow-lg border border-white/5 flex flex-col justify-between">
          <div className="flex justify-between w-full text-slate-400 mb-2">
            <span className="text-xs font-bold">إجمالي الطلبيات (All Time)</span>
            <Package className="w-4 h-4" />
          </div>
          <div className="text-3xl font-black text-white self-end">{stats.lifetime}</div>
          <div className="text-[10px] text-slate-500 font-bold self-end mt-1 text-emerald-500">Lifetime Volume</div>
        </div>
        
        <div className="bg-[#1c1f2e] p-6 rounded-2xl shadow-lg border border-white/5 flex flex-col justify-between">
          <div className="flex justify-between w-full text-slate-400 mb-2">
            <span className="text-xs font-bold">إجمالي الطلبيات (This Month)</span>
            <Clock className="w-4 h-4 text-yellow-500" />
          </div>
          <div className="text-3xl font-black text-white self-end">{stats.month}</div>
          <div className="text-[10px] text-slate-500 font-bold self-end mt-1 text-yellow-500">Last 30 Days</div>
        </div>

        <div className="bg-[#1c1f2e] p-6 rounded-2xl shadow-lg border border-white/5 flex flex-col justify-between">
          <div className="flex justify-between w-full text-slate-400 mb-2">
            <span className="text-xs font-bold">إجمالي الطلبيات (This Week)</span>
            <TrendingUp className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-3xl font-black text-white self-end">{stats.week}</div>
          <div className="text-[10px] text-slate-500 font-bold self-end mt-1 text-blue-500">Last 7 Days</div>
        </div>

        <div className="bg-[#1c1f2e] p-6 rounded-2xl shadow-[0_0_20px_rgba(212,175,55,0.05)] border border-[#d4af37]/30 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 blur-3xl rounded-full"></div>
          <div className="flex justify-between w-full text-slate-300 mb-2 relative z-10">
            <span className="text-xs font-bold">إجمالي الطلبيات (Today)</span>
            <ShoppingBag className="w-4 h-4 text-[#d4af37]" />
          </div>
          <div className="text-3xl font-black text-white self-end relative z-10">{stats.today}</div>
          <div className="text-[10px] font-bold self-end mt-1 text-[#d4af37] relative z-10">Most Important Metric</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
        <div className="lg:col-span-1 bg-[#1c1f2e] rounded-2xl shadow-lg border border-white/5 p-6">
           <h2 className="text-sm font-bold mb-6 text-white text-center">Quick Actions</h2>
           <Link href="/adminpage/call-center" className="bg-[#d4af37] hover:bg-[#c5a059] text-[#1c1f2e] py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-black transition-all shadow-lg w-full">
              <PhoneCall className="w-4 h-4" />
              مركز الإتصال
           </Link>
        </div>

        <div className="lg:col-span-3 bg-[#1c1f2e] rounded-2xl shadow-lg border border-white/5 overflow-hidden">
           <div className="p-4 border-b border-white/5 flex justify-between items-center">
             <h2 className="text-sm font-bold text-white">أحدث الطلبيات</h2>
             <button onClick={fetchOrders} className="text-xs font-bold text-[#d4af37] flex items-center gap-1 hover:underline">
                Refresh ⟳
             </button>
           </div>
           <div className="overflow-x-auto">
             <table className="w-full text-right text-xs">
               <thead className="bg-[#131522] text-slate-400">
                 <tr>
                   <th className="p-4 font-bold text-center">رقم الطلب</th>
                   <th className="p-4 font-bold text-center">الزبون</th>
                   <th className="p-4 font-bold text-center">المبلغ</th>
                   <th className="p-4 font-bold text-center">الحالة</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/5 text-slate-300">
                 {orders.slice(0, 5).map(o => (
                   <tr key={o.id} className="hover:bg-white/5">
                     <td className="p-4 text-center font-mono text-[#d4af37]">DAR-{o.id.substring(0,6)}</td>
                     <td className="p-4 text-center font-bold">{o.name}</td>
                     <td className="p-4 text-center">{o.total_price} د.م</td>
                     <td className="p-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black border ${o.status === 'new' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : o.status === 'processing' ? 'bg-[#d4af37]/10 text-[#d4af37] border-[#d4af37]/20' : o.status === 'cancelled' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
                          {o.status.toUpperCase()}
                        </span>
                     </td>
                   </tr>
                 ))}
                 {orders.length === 0 && !loading && (
                   <tr><td colSpan={4} className="p-8 text-center text-slate-500">لا توجد طلبيات بعد</td></tr>
                 )}
               </tbody>
             </table>
           </div>
        </div>
      </div>
    </div>
  );
}
