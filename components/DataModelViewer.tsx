import React, { useState } from 'react';
import { Search, Key, Table as TableIcon, ChevronRight, Layout, Database } from 'lucide-react';
import { TableInfo, DatabaseInfo } from '../src/types';
import { DATA_MODEL_SCHEMA } from '../src/services/dataModelSchema';

const getDBTheme = (name: string) => {
  switch (name) {
    case 'Oncoclinical': return { color: 'blue', bg: 'bg-blue-600', text: 'text-blue-600', light: 'bg-blue-50', border: 'border-blue-100' };
    case 'OncoPharma': return { color: 'rose', bg: 'bg-rose-600', text: 'text-rose-600', light: 'bg-rose-50', border: 'border-rose-100' };
    case 'ClinicalTrials': return { color: 'amber', bg: 'bg-amber-500', text: 'text-amber-600', light: 'bg-amber-50', border: 'border-amber-100' };
    case 'Prescreening': return { color: 'emerald', bg: 'bg-emerald-600', text: 'text-emerald-600', light: 'bg-emerald-50', border: 'border-emerald-100' };
    default: return { color: 'slate', bg: 'bg-slate-600', text: 'text-slate-600', light: 'bg-slate-50', border: 'border-slate-100' };
  }
};

export const DataModelViewer: React.FC = () => {
  const [selectedDB, setSelectedDB] = useState<DatabaseInfo>(DATA_MODEL_SCHEMA[0]);
  const [selectedTable, setSelectedTable] = useState<TableInfo>(DATA_MODEL_SCHEMA[0].tables[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const dbTheme = getDBTheme(selectedDB.name);

  const filteredTables = selectedDB.tables.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
      {/* Header section */}
      <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[14px] font-black text-slate-800 uppercase tracking-[0.2em]">Data Model Browser</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                Relational structure overview for oncology research.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
              {DATA_MODEL_SCHEMA.map(db => {
                const theme = getDBTheme(db.name);
                const isActive = selectedDB.name === db.name;
                return (
                  <button
                    key={db.name}
                    onClick={() => {
                      setSelectedDB(db);
                      setSelectedTable(db.tables[0]);
                    }}
                    className={`px-4 py-2 rounded-lg text-[10px] font-black transition-all border uppercase tracking-tight
                      ${isActive 
                        ? `${theme.bg} border-transparent text-white shadow-md` 
                        : `bg-white border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50`}`}
                  >
                    {db.name}
                  </button>
                );
              })}
            </div>
            <div className="w-32 invisible"></div> {/* Spacer for balance */}
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 border-r border-slate-100 flex flex-col bg-slate-50/20">
          <div className="p-4 border-b border-slate-100">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search tables..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-slate-300"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            <div className="space-y-1.5">
              {filteredTables.map(table => (
                <button
                  key={table.name}
                  onClick={() => setSelectedTable(table)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all border group text-left
                    ${selectedTable.name === table.name 
                      ? `${dbTheme.light} ${dbTheme.border} ${dbTheme.text}` 
                      : 'bg-white border-transparent text-slate-500 hover:bg-slate-50'}`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all
                    ${selectedTable.name === table.name ? `${dbTheme.bg} text-white shadow-md` : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>
                    <TableIcon size={14} />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className={`text-[11px] font-black uppercase tracking-tight truncate ${selectedTable.name === table.name ? dbTheme.text : 'text-slate-700'}`}>
                      {table.name}
                    </p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                      {table.columns.length} columns
                    </p>
                  </div>
                  {selectedTable.name === table.name && <ChevronRight size={14} className="opacity-50" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white">
          {/* Database Strip */}
          <div className={`${dbTheme.bg} px-8 py-2.5 text-white flex items-center shadow-sm relative overflow-hidden`}>
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.2),transparent)]"></div>
            <div className="relative z-10 flex items-center gap-3">
              <Database size={12} strokeWidth={3} className="text-white ring-4 ring-white/10 rounded-full" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] font-mono">{selectedDB.name}</span>
            </div>
          </div>

          <div className="px-8 py-6 border-b border-slate-50 bg-white">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">{selectedTable.name}</h3>
                <p className="text-[11px] text-slate-400 font-medium leading-relaxed max-w-2xl italic">
                  {selectedTable.description}
                </p>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg shadow-sm">
                  <div className="w-5 h-5 bg-amber-500 rounded flex items-center justify-center text-white">
                    <Key size={10} />
                  </div>
                  <span className="text-[9px] font-black text-slate-600 uppercase tracking-tight">Primary Key</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg shadow-sm">
                  <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center text-white">
                    <Layout size={10} />
                  </div>
                  <span className="text-[9px] font-black text-blue-700 uppercase tracking-tight">Foreign Key</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left py-3 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Variable</th>
                  <th className="text-left py-3 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                  <th className="text-left py-3 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Keys</th>
                  <th className="text-left py-3 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</th>
                  <th className="text-right py-3 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Values</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {selectedTable.columns.length > 0 ? (
                  selectedTable.columns.map((col, idx) => (
                    <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-4">
                        <span className={`text-[11px] font-black text-slate-700 uppercase tracking-tight group-hover:${dbTheme.text} transition-colors`}>{col.name}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-1 bg-slate-100 rounded-md text-[9px] font-bold text-slate-500 font-mono border border-slate-200">
                          {col.type}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex justify-center gap-1">
                          {col.isPK && (
                            <div className="w-6 h-6 bg-amber-500 text-white rounded-md flex items-center justify-center shadow-sm" title="Primary Key">
                              <Key size={12} />
                            </div>
                          )}
                          {col.isFK && (
                            <div className="w-6 h-6 bg-blue-500 text-white rounded-md flex items-center justify-center shadow-sm" title="Foreign Key">
                              <Layout size={12} />
                            </div>
                          )}
                          {!col.isPK && !col.isFK && <span className="text-slate-300">-</span>}
                        </div>
                      </td>
                      <td className="py-4 px-4 flex-1">
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{col.description}</p>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="text-[10px] font-bold text-slate-300">-</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-300 gap-2">
                        <Layout size={32} strokeWidth={1} />
                        <p className="text-[10px] font-black uppercase tracking-widest">No columns documented yet</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
};
