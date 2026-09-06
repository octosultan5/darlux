'use client';

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Headset, PhoneCall, MessageSquare, ExternalLink, CheckCircle2, Truck, AlertTriangle, Clock, TrendingUp, DollarSign, Package, UserCheck, XCircle, Search, Sparkles } from "lucide-react";
import { format, parseISO } from "date-fns";

type Order = { id: string; created_at: string; name: string; phone: string; city: string; bundle_type: number; total_price: number; status: string; };

export default function CallCenterPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [filter, setFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [scriptTab, setScriptTab] = useState<"confirm" | "upsell" | "objection">("confirm");
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    if (data) {
      setOrders(data);
      if (data.length > 0 && !activeOrder) setActiveOrder(data[0]);
    }
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    const { error } = await supabase.from("orders").update({ status: newStatus }).eq("id", id);
    if (!error) {
      const updated = orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o));
      setOrders(updated);
      if (activeOrder && activeOrder.id === id) setActiveOrder({ ...activeOrder, status: newStatus });
    }
  };

  const filteredOrders = orders
    .filter((o) => (filter === "ALL" ? true : o.status === filter))
    .filter((o) => 
      o.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      o.phone.includes(searchTerm) || 
      o.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== "cancelled" ? o.total_price : 0), 0);
  const confirmedCount = orders.filter((o) => o.status === "processing" || o.status === "shipped" || o.status === "delivered").length;
  const pendingCount = orders.filter((o) => o.status === "new").length;
  const confirmRate = orders.length > 0 ? Math.round((confirmedCount / orders.length) * 100) : 0;

  return (
    <div className="space-y-6 font-['Alexandria',sans-serif] text-white">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-white/5 gap-4">
        <div>
          <div className="flex items-center gap-3 text-xl font-black tracking-wide">
            <Headset className="w-6 h-6 text-[#d4af37]" />
            <span>مساحة عمل مركز الإتصال (Call Center)</span>
          </div>
          <p className="text-slate-400 text-xs mt-1">نظام إدارة التأكيد الهاتفي والمراسلة السريعة لمتجر DarLux</p>
        </div>
        <button onClick={fetchOrders} className="text-xs bg-[#1c1f2e] border border-white/10 px-4 py-2 rounded-lg hover:bg-white/5 font-bold transition">
          تحديث البيانات ⟳
        </button>
      </header>

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#1c1f2e] rounded-xl p-4 border-l-4 border-l-blue-500 border border-white/5">
          <div className="flex justify-between items-center text-slate-400 text-[10px] font-bold mb-1">
            <span>المداخيل الإجمالية</span><DollarSign className="w-3 h-3 text-blue-500" />
          </div>
          <div className="text-xl font-black text-white">{totalRevenue} <span className="text-[10px] font-normal text-slate-400">د.م</span></div>
        </div>
        <div className="bg-[#1c1f2e] rounded-xl p-4 border-l-4 border-l-[#d4af37] border border-white/5">
          <div className="flex justify-between items-center text-slate-400 text-[10px] font-bold mb-1">
            <span>في انتظار التأكيد</span><Clock className="w-3 h-3 text-[#d4af37]" />
          </div>
          <div className="text-xl font-black text-[#d4af37]">{pendingCount} <span className="text-[10px] font-normal text-slate-400">طلب</span></div>
        </div>
        <div className="bg-[#1c1f2e] rounded-xl p-4 border-l-4 border-l-emerald-400 border border-white/5">
          <div className="flex justify-between items-center text-slate-400 text-[10px] font-bold mb-1">
            <span>الطلبات المؤكدة</span><UserCheck className="w-3 h-3 text-emerald-400" />
          </div>
          <div className="text-xl font-black text-emerald-400">{confirmedCount} <span className="text-[10px] font-normal text-slate-400">طلب</span></div>
        </div>
        <div className="bg-[#1c1f2e] rounded-xl p-4 border-l-4 border-l-purple-400 border border-white/5">
          <div className="flex justify-between items-center text-slate-400 text-[10px] font-bold mb-1">
            <span>نسبة التأكيد</span><TrendingUp className="w-3 h-3 text-purple-400" />
          </div>
          <div className="text-xl font-black text-purple-400">{confirmRate}%</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Order List Queue (4 cols) */}
        <div className="lg:col-span-4 bg-[#1c1f2e] rounded-2xl p-4 border border-white/5 flex flex-col h-[600px]">
          <div className="space-y-3 mb-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
              <input type="text" placeholder="بحث بالاسم أو الرقم..." className="w-full bg-[#131522] border border-white/10 rounded-lg pr-9 pl-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#d4af37]" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <div className="flex gap-1 bg-[#131522] p-1 rounded-lg text-[10px] overflow-x-auto custom-scrollbar">
              {["ALL", "new", "processing", "cancelled"].map((st) => (
                <button key={st} onClick={() => setFilter(st)} className={`px-2 py-1.5 rounded-md font-bold transition-all whitespace-nowrap ${filter === st ? "bg-[#d4af37] text-[#131522]" : "text-slate-400 hover:text-white"}`}>
                  {st === "ALL" ? "الكل" : st.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {loading ? <div className="text-center text-xs text-slate-500 mt-10">جاري التحميل...</div> : filteredOrders.map((order) => (
              <div
                key={order.id}
                onClick={() => setActiveOrder(order)}
                className={`p-3 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${activeOrder?.id === order.id ? "border-[#d4af37] bg-[#d4af37]/10" : "border-white/5 bg-[#131522] hover:border-white/20"}`}
              >
                <div className="flex justify-between items-start mb-1.5">
                  <div>
                    <span className="font-bold text-white text-xs block truncate w-32">{order.name}</span>
                    <span className="text-[9px] text-slate-500 font-mono">DAR-{order.id.substring(0,6)}</span>
                  </div>
                  <span className={`text-[8px] font-black px-2 py-0.5 rounded-full border ${order.status === 'new' ? 'border-blue-500 text-blue-400 bg-blue-500/10' : order.status === 'processing' ? 'border-[#d4af37] text-[#d4af37] bg-[#d4af37]/10' : order.status === 'cancelled' ? 'border-red-500 text-red-400 bg-red-500/10' : 'border-emerald-500 text-emerald-400 bg-emerald-500/10'}`}>
                    {order.status.toUpperCase()}
                  </span>
                </div>
                <div className="text-[10px] flex justify-between items-center border-t border-white/5 pt-1.5 mt-1.5">
                  <span dir="ltr" className="font-mono text-slate-400">{order.phone}</span>
                  <span className="font-black text-[#d4af37]">{order.total_price} د.م</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Active Order Workspace (8 cols) */}
        <div className="lg:col-span-8 bg-[#1c1f2e] rounded-2xl p-5 border border-white/5 flex flex-col justify-between min-h-[600px]">
          {activeOrder ? (
            <div className="space-y-6">
              
              {/* Active Order Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-black text-white">{activeOrder.name}</h2>
                    <span className="text-[10px] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded font-mono">DAR-{activeOrder.id.substring(0,8)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span>📍 {activeOrder.city}</span>
                    <span>📦 {activeOrder.bundle_type} قطع (Réchaud RAF)</span>
                    <span className="font-bold text-emerald-400">💰 {activeOrder.total_price} د.م</span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/212${activeOrder.phone.replace(/^0/, "")}?text=${encodeURIComponent(`السلام عليكم للا/سيدي ${activeOrder.name} 👋 معاك فريق متجر DarLux بخصوص الطلب ديالك (Réchaud Électrique RAF) بمبلغ ${activeOrder.total_price} د.م. بغينا نأكدو معاك العنوان والتوصيل غدا إن شاء الله!`)}`}
                  target="_blank"
                  className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-[#131522] px-4 py-2.5 rounded-xl font-black text-xs shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  مراسلة عبر الواتساب فوراً
                </a>
              </div>

              {/* Call Script Workspace */}
              <div className="space-y-3 bg-[#131522] rounded-xl p-4 border border-white/5">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-2">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Headset className="w-4 h-4 text-[#d4af37]" /> سكريبت المكالمة المباشرة:
                  </span>
                  
                  <div className="flex gap-2 text-[10px]">
                    <button onClick={() => setScriptTab("confirm")} className={`px-3 py-1.5 rounded-lg font-bold border transition-all ${scriptTab === "confirm" ? "bg-[#d4af37] border-[#d4af37] text-[#131522]" : "border-white/10 text-slate-400 hover:text-white"}`}>
                      التأكيد الأساسي
                    </button>
                    <button onClick={() => setScriptTab("upsell")} className={`px-3 py-1.5 rounded-lg font-bold border transition-all ${scriptTab === "upsell" ? "bg-purple-500 border-purple-500 text-white" : "border-white/10 text-slate-400 hover:text-white"}`}>
                      عرض الـ Upsell 🔥
                    </button>
                    <button onClick={() => setScriptTab("objection")} className={`px-3 py-1.5 rounded-lg font-bold border transition-all ${scriptTab === "objection" ? "bg-blue-500 border-blue-500 text-white" : "border-white/10 text-slate-400 hover:text-white"}`}>
                      الرد على الإعتراضات
                    </button>
                  </div>
                </div>

                <div className="bg-[#1c1f2e] border border-[#d4af37]/20 p-4 rounded-xl text-xs sm:text-sm text-slate-300 leading-relaxed font-semibold">
                  {scriptTab === "confirm" && (
                    <p>"السلام عليكم لالة/سيدي <strong className="text-[#d4af37]">{activeOrder.name}</strong>، معاك خدمة الزبناء ديال متجر <strong className="text-white">DarLux</strong>. توصلنا بالطلب ديالك لـ (الفرن الكهربائي RAF). أردت فقط نأكد معاك العنوان فمدينة <strong className="text-[#d4af37]">{activeOrder.city}</strong> واش مناسب نسلموه ليك غداً مع الموزع؟"</p>
                  )}
                  {scriptTab === "upsell" && (
                    <p>"ممتاز أ سيدي! قبل ما نخرج ليك الطلب، بغيت ننصحك بباك التوفير (2 قطع) كنزيدوليك فيه قطعة ثانية بـ 130 درهم فقط بدل 169! بزاف ديال الزبناء كياخدوه لدار أخرى أو كهدية. واش نزيدوه ليك بنفس التوصيل المجاني؟"</p>
                  )}
                  {scriptTab === "objection" && (
                    <p>إذا قال ليك: <em className="text-[#d4af37]">«خفت المنتج مايكونش كيف الصورة أو مايخدمش مزيان»</em> <br/><br/> قولي ليه: «أ سيدي حقك كاملاً! التوصيل عندنا بالمعاينة قبل الدفع. الموزع غادي يجيب ليك الأمانة حتى لباب الدار، تحلها وتقلب المنتج ديالك وتشوف الجودة عاد تخلص، وعندك ضمان استبدال!»</p>
                  )}
                </div>
              </div>

              {/* Status Update Buttons */}
              <div className="pt-4 border-t border-white/5 space-y-3">
                <span className="text-xs font-bold text-slate-400 block">تحديث حالة الطلب فوراً:</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button onClick={() => handleStatusChange(activeOrder.id, "processing")} className="flex items-center justify-center gap-1.5 py-3 px-2 bg-[#d4af37]/10 border border-[#d4af37]/50 text-[#d4af37] font-bold text-xs rounded-xl hover:bg-[#d4af37] hover:text-[#131522] transition-all">
                    <CheckCircle2 className="w-4 h-4" /> تأكيد (Processing)
                  </button>
                  <button onClick={() => handleStatusChange(activeOrder.id, "shipped")} className="flex items-center justify-center gap-1.5 py-3 px-2 bg-blue-500/10 border border-blue-500/50 text-blue-400 font-bold text-xs rounded-xl hover:bg-blue-500 hover:text-white transition-all">
                    <Truck className="w-4 h-4" /> شحن (Shipped)
                  </button>
                  <button onClick={() => handleStatusChange(activeOrder.id, "new")} className="flex items-center justify-center gap-1.5 py-3 px-2 bg-slate-500/10 border border-slate-500/50 text-slate-300 font-bold text-xs rounded-xl hover:bg-slate-500 hover:text-white transition-all">
                    <Clock className="w-4 h-4" /> إعادة محاولة (No Answer)
                  </button>
                  <button onClick={() => handleStatusChange(activeOrder.id, "cancelled")} className="flex items-center justify-center gap-1.5 py-3 px-2 bg-red-500/10 border border-red-500/50 text-red-400 font-bold text-xs rounded-xl hover:bg-red-500 hover:text-white transition-all">
                    <XCircle className="w-4 h-4" /> إلغاء (Cancelled)
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-3">
               <Headset className="w-16 h-16 opacity-20" />
               <p className="text-sm font-bold">المرجو اختيار طلب من القائمة لعرض مساحة العمل</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
