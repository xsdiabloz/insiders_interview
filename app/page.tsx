import { Box } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-6xl mt-5 mx-auto space-y-10 animate-in fade-in duration-1000">
      <header className="space-y-2">
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 tracking-tight">
          Dashboard
        </h1>
        <p className="text-slate-500 font-medium">
          Добро пожаловать в систему.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: "Модуль 1", color: "from-blue-500 to-cyan-400" },
          { title: "Модуль 2", color: "from-purple-500 to-pink-400" },
          { title: "Модуль 3", color: "from-orange-400 to-amber-300" },
        ].map((item, i) => (
          <div
            key={i}
            className="group relative p-1 rounded-3xl bg-gradient-to-br from-white/50 to-white/10 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500"
          >
            <div className="relative p-8 bg-white rounded-[22px] border border-white">
              <div
                className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:rotate-6 transition-transform`}
              >
                <Box size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">
                Статистика {item.title}
              </h3>
              <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                Живой поток данных и аналитика в реальном времени.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
