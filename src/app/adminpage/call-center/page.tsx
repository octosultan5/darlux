'use client';
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
