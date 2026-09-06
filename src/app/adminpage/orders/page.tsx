'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { format, parseISO } from "date-fns";
import { ShoppingBag, Search, Download, MessageSquare } from 'lucide-react';

type Order = { id: string; created_at: string; name: string; phone: string; city: string; bundle_type: number; total_price: number; status: string; };

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    if (data) setOrders(data);
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    const { error } = await supabase.from("orders").update({ status: newStatus }).eq("id", id);
    if (!error) {
      setOrders(orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));
    }
  };

  const exportCSV = () => {
    const headers = ["ID,Date,Name,Phone,City,Bundle,Total,Status\n"];
    const rows = orders.map(o => `${o.id},${o.created_at},"${o.name}",${o.phone},"${o.city}",${o.bundle_type},${o.total_price},${o.status}`).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `darlux_orders_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
  };

  const filteredOrders = orders
    .filter((o) => (filter === "ALL" ? true : o.status === filter))
    .filter((o) => 
      o.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      o.phone.includes(searchTerm) || 
      o.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="space-y-6 font-['Alexandria',sans-serif] text-slate-200">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-3">
            <ShoppingBag className="w-7 h-7 text-[#d4af37]" /> إدارة الطلبيات
          </h1>
          <p className="text-slate-400 text-xs mt-1">تتبع وتحديث جميع الطلبيات المسجلة في المتجر</p>
        </div>

        <button onClick={exportCSV} className="inline-flex items-center gap-2 bg-[#1c1f2e] border border-white/10 hover:border-white/20 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg transition-all">
          <Download className="w-4 h-4 text-[#d4af37]" /> تحميل Excel
        </button>
      </div>

      <div className="bg-[#1c1f2e] p-4 rounded-xl border border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3.5" />
          <input
            type="text"
            placeholder="بحث برقم الطلب، الاسم، أو الهاتف..."
            className="w-full bg-[#131522] border border-white/10 rounded-lg pr-10 pl-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#d4af37]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto custom-scrollbar pb-2 sm:pb-0">
          {["ALL", "new", "processing", "shipped", "delivered", "cancelled"].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                filter === st ? "bg-[#d4af37] text-[#1c1f2e]" : "bg-white/5 text-slate-400 hover:text-white"
              }`}
            >
              {st === "ALL" ? "الكل" : st.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#1c1f2e] rounded-2xl overflow-hidden border border-white/5 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse text-xs">
            <thead>
              <tr className="bg-[#131522] text-slate-400 border-b border-white/5">
                <th className="p-4 font-bold">رقم الطلب</th>
                <th className="p-4 font-bold">التاريخ</th>
                <th className="p-4 font-bold">الزبون</th>
                <th className="p-4 font-bold">الهاتف</th>
                <th className="p-4 font-bold">المدينة</th>
                <th className="p-4 font-bold">العرض</th>
                <th className="p-4 font-bold">المبلغ</th>
                <th className="p-4 font-bold">الحالة</th>
                <th className="p-4 font-bold text-center">واتساب</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {loading ? (
                <tr><td colSpan={9} className="p-8 text-center text-slate-500">جاري التحميل...</td></tr>
              ) : filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-mono font-bold text-[#d4af37]">DAR-{order.id.substring(0,6)}</td>
                  <td className="p-4 text-slate-400">{format(parseISO(order.created_at), "dd/MM/yyyy")}</td>
                  <td className="p-4 font-bold text-white">{order.name}</td>
                  <td className="p-4 font-mono text-slate-300" dir="ltr">{order.phone}</td>
                  <td className="p-4 text-slate-400">{order.city}</td>
                  <td className="p-4 font-bold text-blue-400">{order.bundle_type} قطع</td>
                  <td className="p-4 font-black text-white">{order.total_price} د.م</td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className={`px-3 py-1.5 rounded-full text-[10px] font-black bg-[#131522] border appearance-none cursor-pointer focus:outline-none ${
                        order.status === "new" ? "border-blue-500/50 text-blue-400" :
                        order.status === "processing" ? "border-[#d4af37]/50 text-[#d4af37]" :
                        order.status === "shipped" ? "border-purple-500/50 text-purple-400" :
                        order.status === "delivered" ? "border-emerald-500/50 text-emerald-400" :
                        "border-red-500/50 text-red-400"
                      }`}
                    >
                      <option value="new">NEW (جديد)</option>
                      <option value="processing">PROCESSING (قيد المعالجة)</option>
                      <option value="shipped">SHIPPED (مشحون)</option>
                      <option value="delivered">DELIVERED (تم التسليم)</option>
                      <option value="cancelled">CANCELLED (ملغى)</option>
                    </select>
                  </td>
                  <td className="p-4 text-center">
                    <a
                      href={`https://wa.me/212${order.phone.replace(/^0/, "")}?text=${encodeURIComponent(
                        `السلام عليكم ${order.name}، معاك متجر DarLux بخصوص طلبك الأخير.`
                      )}`}
                      target="_blank"
                      className="inline-flex items-center justify-center bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 w-8 h-8 rounded-lg transition-all"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
