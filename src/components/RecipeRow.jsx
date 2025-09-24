import React from "react";
import { Pencil, Trash2 } from "lucide-react";

export default function RecipeRow({ recipe, onEdit, onDelete }) {
  return (
    <div className="flex items-center gap-4 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition">
      <div className="w-24 h-24 shrink-0 rounded-xl bg-slate-100 overflow-hidden">
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full grid place-items-center text-slate-400 text-xs">
            (không ảnh)
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-slate-800 truncate">
          {recipe.title}
        </h3>
        <p className="text-sm text-slate-600 line-clamp-2 mt-1">
          {recipe.ingredients.join(", ")}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {recipe.tags?.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 rounded-full bg-sky-100 text-sky-700"
            >
              #{t}
            </span>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50"
          title="Sửa"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          onClick={onDelete}
          className="p-2 rounded-lg border border-slate-200 hover:bg-rose-50 text-rose-600"
          title="Xoá"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
