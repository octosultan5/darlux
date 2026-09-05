"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import * as XLSX from "xlsx";
import { format, isToday, isThisWeek, isThisMonth, parseISO } from "date-fns";

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
  const [filter, setFilter] = useState("all"); // all, today, week, month
  const [searchQuery, setSearchQuery] = useState("");
  
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

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase.from("orders").update({ status: newStatus }).eq("id", id);
    if (!error) setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  // Stats Calculations
  const stats = useMemo(() => {
    let totalRevenue = 0;
    let todayOrders = 0;
    let todayRevenue = 0;
    let deliveredCount = 0;
    let shippedCount = 0;
    let processingCount = 0;
    let newCount = 0;
    let cancelledCount = 0;

    orders.forEach(o => {
      // Avoid counting cancelled orders in revenue statistics
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

      if (o.status === "delivered") deliveredCount++;
      else if (o.status === "shipped") shippedCount++;
      else if (o.status === "processing") processingCount++;
      else if (o.status === "new") newCount++;
      else if (o.status === "cancelled") cancelledCount++;
    });

    return {
      totalOrders: orders.length,
      totalRevenue,
      todayOrders,
      todayRevenue,
      deliveredCount,
      shippedCount,
      processingCount,
      newCount,
      cancelledCount
    };
  }, [orders]);

  // Optimize duplicate checks: compute sets in O(N) instead of checking inside mapping loops in O(N^2)
  const duplicatePhones = useMemo(() => {
    const counts: Record<string, number> = {};
    orders.forEach(o => {
      counts[o.phone] = (counts[o.phone] || 0) + 1;
    });
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
    const isDupPhone = duplicatePhones.has(order.phone);
    const isDupIP = order.ip_address && order.ip_address !== "unknown" && order.ip_address !== "shadow-blocked" && duplicateIPs.has(order.ip_address);
    return isDupPhone || isDupIP;
  };

  // Filter Logic
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      // 1. Search Query
      const matchesSearch = order.name.includes(searchQuery) || order.phone.includes(searchQuery) || order.city.includes(searchQuery);
      if (!matchesSearch) return false;
      
      // 2. Date Filter
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
      "IP Address": o.ip_address || "N/A",
      "مكرر؟": isDuplicate(o) ? "نعم" : "لا"
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    XLSX.writeFile(workbook, `Orders_Export_${format(new Date(), "yyyy-MM-dd")}.xlsx`);
  };

  const blockIP = async (ip: string) => {
    if (!ip || ip === "unknown" || ip === "shadow-blocked") {
      return alert("لا يمكن حظر IP مجهول أو محظور مسبقاً");
    }
    if (confirm(`هل أنت متأكد من حظر هذا الشخص نهائياً؟ IP: ${ip}`)) {
      try {
        const { error } = await supabase.from("blocked_ips").insert([{ ip_address: ip }]);
        if (error) {
          if (error.code === "23505") { // Unique violation
            alert("هذا الـ IP محظور بالفعل.");
          } else {
            console.error(error);
            alert(`فشل في حظر الـ IP: ${error.message}`);
          }
        } else {
          alert("تم الحظر بنجاح! سيتم رفض أي طلبات جديدة من هذا الجهاز.");
        }
      } catch (err) {
        console.error(err);
        alert("حدث خطأ غير متوقع.");
      }
    }
  };

  if (!isAuthenticated) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-black text-brand-primary text-center mb-8">لوحة الإدارة</h1>
        <input type="password" placeholder="كلمة المرور" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className="w-full bg-slate-50 border-2 rounded-xl px-5 py-4 mb-4 text-center" dir="ltr" />
        <button type="submit" className="w-full btn-primary py-4 text-xl">دخول</button>
      </form>
    </div>
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800">إدارة الطلبات المتقدمة</h1>
        </div>
        <div className="flex gap-3">
          <input 
            type="text" 
            placeholder="بحث (اسم، هاتف، مدينة).." 
            className="border-2 border-slate-200 rounded-lg px-4 py-2 outline-none"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <select className="border-2 border-slate-200 rounded-lg px-4 py-2" value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="all">كل الأوقات</option>
            <option value="today">اليوم</option>
            <option value="week">هذا الأسبوع</option>
            <option value="month">هذا الشهر</option>
          </select>
          <button onClick={fetchOrders} className="bg-white border text-slate-700 px-4 py-2 rounded-lg font-bold">تحديث</button>
          <button onClick={exportToExcel} className="bg-brand-green text-white px-4 py-2 rounded-lg font-bold shadow-md">تصدير (Excel)</button>
        </div>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-slate-500 text-sm font-medium block mb-1">إجمالي الطلبات</span>
            <span className="text-3xl font-black text-slate-800">{stats.totalOrders}</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
            <i className="fa-solid fa-cart-shopping"></i>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-slate-500 text-sm font-medium block mb-1">إجمالي المبيعات (النشطة)</span>
            <span className="text-3xl font-black text-brand-primary">{stats.totalRevenue} د.م</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">
            <i className="fa-solid fa-wallet"></i>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-slate-500 text-sm font-medium block mb-1">طلبات اليوم</span>
            <span className="text-3xl font-black text-slate-800">{stats.todayOrders}</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center text-xl">
            <i className="fa-solid fa-fire"></i>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-slate-500 text-sm font-medium block mb-1">مبيعات اليوم</span>
            <span className="text-3xl font-black text-brand-accent">{stats.todayRevenue} د.م</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl">
            <i className="fa-solid fa-money-bill-wave"></i>
          </div>
        </div>
      </div>

      {/* Status Breakdown Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-8 flex flex-wrap gap-4 items-center justify-between text-sm">
        <span className="font-bold text-slate-700">تفاصيل الحالات:</span>
        <div className="flex flex-wrap gap-4 text-xs">
          <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full font-bold">
            جديد: {stats.newCount}
          </span>
          <span className="bg-yellow-50 text-yellow-700 px-3 py-1.5 rounded-full font-bold">
            معالجة: {stats.processingCount}
          </span>
          <span className="bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full font-bold">
            شحن: {stats.shippedCount}
          </span>
          <span className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full font-bold">
            مُوصّل: {stats.deliveredCount}
          </span>
          <span className="bg-red-50 text-red-700 px-3 py-1.5 rounded-full font-bold">
            ملغى: {stats.cancelledCount}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
              <tr>
                <th className="p-4">تحذير</th>
                <th className="p-4">التاريخ</th>
                <th className="p-4">العميل</th>
                <th className="p-4">الهاتف</th>
                <th className="p-4">المدينة</th>
                <th className="p-4">العرض</th>
                <th className="p-4">المبلغ</th>
                <th className="p-4">الحالة</th>
                <th className="p-4 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? <tr><td colSpan={9} className="p-8 text-center">جاري التحميل...</td></tr> : 
                filteredOrders.map(order => {
                  const dup = isDuplicate(order);
                  return (
                  <tr key={order.id} className={`hover:bg-slate-50 ${dup ? 'bg-red-50/50' : ''}`}>
                    <td className="p-4">
                      {dup && <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-bold" title={`IP: ${order.ip_address}`}>مكرر ⚠️</span>}
                    </td>
                    <td className="p-4 text-sm">{format(parseISO(order.created_at), "dd/MM/yyyy HH:mm")}</td>
                    <td className="p-4 font-bold">{order.name}</td>
                    <td className="p-4 text-sm font-mono text-blue-600" dir="ltr">{order.phone}</td>
                    <td className="p-4">{order.city}</td>
                    <td className="p-4 text-xs font-bold">{order.bundle_type} فلاش</td>
                    <td className="p-4 font-black">{order.total_price} د.م</td>
                    <td className="p-4">
                      <select className="bg-slate-100 border-none text-sm rounded-lg p-1 outline-none font-medium cursor-pointer" value={order.status} onChange={(e) => updateStatus(order.id, e.target.value)}>
                        <option value="new">جديد</option>
                        <option value="processing">معالجة</option>
                        <option value="shipped">شحن</option>
                        <option value="delivered">مُوصّل</option>
                        <option value="cancelled">ملغى</option>
                      </select>
                    </td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => blockIP(order.ip_address || "")} 
                        disabled={!order.ip_address || order.ip_address === "unknown" || order.ip_address === "shadow-blocked"}
                        className="text-red-500 hover:text-red-700 text-xs font-bold underline disabled:opacity-30 disabled:no-underline"
                      >
                        حظر (Block)
                      </button>
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
