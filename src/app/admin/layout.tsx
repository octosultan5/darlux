export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100 font-sans" dir="rtl">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-900 text-white flex flex-col">
          <div className="p-6 text-2xl font-black border-b border-slate-800 text-brand-accent">
            NoorUSB <span className="text-white text-sm font-normal block mt-1">لوحة التحكم</span>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <a href="/admin" className="flex items-center gap-3 px-4 py-3 bg-brand-primary rounded-xl text-white font-bold transition-all hover:bg-blue-800">
              <i className="fa-solid fa-cart-shopping"></i> الطلبات
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all">
              <i className="fa-solid fa-chart-pie"></i> الإحصائيات (قريباً)
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all">
              <i className="fa-solid fa-gear"></i> الإعدادات
            </a>
          </nav>
          <div className="p-4 border-t border-slate-800">
            <a href="/" className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-slate-300 transition-all">
              <i className="fa-solid fa-store"></i> العودة للمتجر
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
