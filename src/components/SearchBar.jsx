import React from "react";
import { Search } from "lucide-react";

export default function SearchBar({ value, onChange, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Tìm theo nguyên liệu hoặc tên món…"
        className="w-full rounded-xl bg-white/90 backdrop-blur border border-slate-200 pl-10 pr-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
      />
      <Search className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
    </div>
  );
}
