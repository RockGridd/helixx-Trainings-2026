import React, { useState, useEffect } from 'react';
import { Clock, ChevronRight, CheckCircle, Search, Filter } from 'lucide-react';
import { trainingsData, teams } from './constants';
import { TrainingItem } from './types';

export default function App() {
  const [selectedTeam, setSelectedTeam] = useState<string>("Todos");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<TrainingItem[]>(trainingsData);

  useEffect(() => {
    const filtered = trainingsData.filter(item => {
      const matchesTeam = selectedTeam === "Todos" || item.team === selectedTeam;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.mainDesc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTeam && matchesSearch;
    });
    setFilteredData(filtered);
  }, [selectedTeam, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 text-slate-600 font-sans selection:bg-[#4A7C79] selection:text-white">
      {/* Grid Background Effect */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#4A7C79 1px, transparent 1px), linear-gradient(90deg, #4A7C79 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Top Protocol Bar */}
      <header className="sticky top-0 z-50 bg-gray-50/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-sm font-bold tracking-[0.2em] text-[#4A7C79] uppercase">
              Protocolo de Capacitación
            </h1>
            <p className="text-[10px] tracking-widest text-gray-400 mt-1">
              MANUAL INTEGRAL // SYS_ID: 2026
            </p>
          </div>
          <div className="hidden md:block text-right">
             <p className="text-[10px] text-gray-400 tracking-widest">/// PROTOCOLO_TRAINING_V2.0</p>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        
        {/* Header Section */}
        <div className="mb-12 border-l-4 border-[#4A7C79] pl-6 py-2">
          <h2 className="text-3xl md:text-4xl font-light text-slate-800 tracking-tight mb-2">
            Catálogo de Entrenamientos
          </h2>
          <p className="text-slate-500 max-w-2xl">
            Selección estratégica de recursos para potenciar habilidades críticas, gestión del tiempo y liderazgo organizacional.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-6 mb-10 items-start md:items-end justify-between bg-white p-6 border border-gray-100 shadow-sm rounded-sm">
          {/* Team Filter */}
          <div className="w-full md:w-auto">
            <label className="block text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-3">
              Filtrar por Equipo
            </label>
            <div className="flex flex-wrap gap-2">
              {teams.map(team => (
                <button
                  key={team}
                  onClick={() => setSelectedTeam(team)}
                  className={`px-4 py-2 text-xs font-semibold tracking-wide uppercase transition-all duration-300 border ${
                    selectedTeam === team
                      ? "bg-[#4A7C79] text-white border-[#4A7C79]"
                      : "bg-transparent text-gray-500 border-gray-200 hover:border-[#4A7C79] hover:text-[#4A7C79]"
                  }`}
                >
                  {team}
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="w-full md:w-80">
            <div className="relative group">
              <input
                type="text"
                placeholder="BUSCAR ENTRENAMIENTO..."
                className="w-full bg-gray-50 border border-gray-200 text-slate-700 text-xs px-4 py-3 pl-10 focus:outline-none focus:border-[#4A7C79] focus:bg-white transition-all uppercase placeholder:text-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3 group-focus-within:text-[#4A7C79] transition-colors" />
            </div>
          </div>
        </div>

        {/* Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredData.map((item) => (
            <div 
              key={item.id} 
              className="bg-white border border-gray-100 hover:shadow-lg transition-all duration-500 group relative overflow-hidden flex flex-col"
            >
              {/* Image Header */}
              <div className="h-48 overflow-hidden relative border-b border-gray-100">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-[#4A7C79]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-multiply"></div>
                
                {/* ID Tag on Image */}
                <div className="absolute bottom-0 left-0 bg-white/95 backdrop-blur-sm px-3 py-1.5 border-t-2 border-r-2 border-[#4A7C79]">
                   <span className="text-[10px] font-bold tracking-widest uppercase text-[#4A7C79]">
                    SEC: {item.id.toString().padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-8 flex flex-col flex-grow">
                {/* Title Section */}
                <div className="mb-6">
                  <span className="inline-block text-gray-400 text-[10px] font-bold tracking-widest uppercase mb-2">
                    // {item.team.toUpperCase()}
                  </span>
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-[#4A7C79] transition-colors leading-snug">
                    {item.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="flex-grow">
                  <p className="text-sm text-slate-500 leading-relaxed mb-6 border-l-2 border-gray-100 pl-4">
                    {item.mainDesc}
                  </p>

                  <div className="space-y-3 mb-8">
                    {item.points.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-[#4A7C79]/60 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-slate-600 leading-relaxed">
                          <span className="font-semibold text-slate-700">
                            {point.split(':')[0]}:
                          </span>
                          {point.split(':')[1]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer / Action */}
                <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <Clock className="w-3 h-3" />
                    <span>Online Course</span>
                  </div>
                  
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#4A7C79] uppercase tracking-widest hover:text-slate-800 transition-colors group/btn"
                  >
                    Acceder
                    <ChevronRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="text-center py-20 bg-white border border-dashed border-gray-200">
            <Filter className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-slate-800 font-medium">No se encontraron resultados</h3>
            <p className="text-slate-500 text-sm mt-2">Intenta ajustar los filtros de búsqueda.</p>
          </div>
        )}

      </main>

      {/* Footer Protocol */}
      <footer className="bg-white border-t border-gray-200 mt-20 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center opacity-60">
          <p className="text-[10px] text-gray-400 tracking-widest uppercase">
            © 2026 Helixx Corporate Training
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
             <p className="text-[10px] text-gray-400 tracking-widest uppercase">LOC: MTY</p>
             <p className="text-[10px] text-gray-400 tracking-widest uppercase">SYS: ONLINE</p>
          </div>
        </div>
      </footer>
    </div>
  );
}