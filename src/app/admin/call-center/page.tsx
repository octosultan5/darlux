'use client';
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
