'use client';
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
