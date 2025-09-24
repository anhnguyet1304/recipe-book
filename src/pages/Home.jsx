import React, { useEffect, useMemo, useState } from "react";
import SearchBar from "../components/SearchBar";
import RecipeRow from "../components/RecipeRow";
import DrawerForm from "../components/DrawerForm";
import { load, save, tokenize } from "../utils/helpers";
import { STORAGE_KEY, SEED } from "../utils/constants";
import { Plus, Menu } from "lucide-react";

export default function Home() {
  const [recipes, setRecipes] = useState(load(STORAGE_KEY, SEED));
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    save(STORAGE_KEY, recipes);
  }, [recipes]);

  const tokens = useMemo(() => tokenize(query), [query]);
  const filtered = useMemo(() => {
    if (!tokens.length) return recipes;
    return recipes.filter((r) =>
      tokens.every(
        (t) =>
          r.title.toLowerCase().includes(t) ||
          r.ingredients.some((ing) => ing.toLowerCase().includes(t)) ||
          r.tags?.some((tag) => tag.includes(t))
      )
    );
  }, [recipes, tokens]);

  function handleCreate() {
    setEditing(null);
    setOpen(true);
  }
  function handleEdit(r) {
    setEditing(r);
    setOpen(true);
  }
  function handleDelete(id) {
    if (confirm("Xoá công thức này?"))
      setRecipes((prev) => prev.filter((r) => r.id !== id));
  }

  function upsertRecipe(data) {
    setRecipes((prev) => {
      const exists = prev.some((r) => r.id === data.id);
      if (exists)
        return prev.map((r) =>
          r.id === data.id ? { ...data, updatedAt: Date.now() } : r
        );
      return [
        { ...data, createdAt: Date.now(), updatedAt: Date.now() },
        ...prev,
      ];
    });
  }

  return (
    <div className="h-screen w-full flex bg-gradient-to-br from-sky-50 via-white to-indigo-50 text-slate-800">
      {/* Sidebar desktop */}
      <aside className="hidden md:flex md:w-64 flex-col border-r border-slate-200 bg-white/80 backdrop-blur">
        <div className="p-5 border-b">
          <h1 className="text-xl font-bold">🍳 Recipe Book</h1>
          <p className="text-sm text-slate-500 mt-1">
            Bộ sưu tập công thức nấu ăn
          </p>
        </div>
        <nav className="p-4 space-y-2">
          <div className="text-slate-600 text-sm">Danh sách</div>
          <button
            onClick={handleCreate}
            className="w-full text-left px-3 py-2 rounded-lg border hover:bg-slate-50"
          >
            + Thêm công thức
          </button>
        </nav>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="w-64 bg-white shadow-xl p-4 space-y-4">
            <h1 className="text-xl font-bold">🍳 Recipe Book</h1>
            <button
              onClick={handleCreate}
              className="block w-full text-left px-3 py-2 rounded-lg border hover:bg-slate-50"
            >
              + Thêm công thức
            </button>
            <button
              onClick={() => setSidebarOpen(false)}
              className="mt-4 text-sm text-slate-500"
            >
              Đóng
            </button>
          </div>
          <div
            className="flex-1 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          ></div>
        </div>
      )}

      {/* Content */}
      <main className="flex-1 flex flex-col">
        <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b">
          <div className="max-w-5xl mx-auto w-full p-4 flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg border hover:bg-slate-50"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="font-semibold md:hidden">🍳 Recipe Book</div>
            <SearchBar value={query} onChange={setQuery} className="flex-1" />
            <button
              onClick={handleCreate}
              className="hidden md:inline-flex items-center gap-2 rounded-full px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white shadow"
            >
              <Plus className="w-5 h-5" /> Thêm công thức
            </button>
          </div>
        </header>

        <div className="max-w-5xl mx-auto w-full p-4 space-y-3 overflow-y-auto">
          {filtered.map((r) => (
            <RecipeRow
              key={r.id}
              recipe={r}
              onEdit={() => handleEdit(r)}
              onDelete={() => handleDelete(r.id)}
            />
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-slate-500 mt-12">
              Không tìm thấy công thức nào. Thử các từ khoá như "gà", "tỏi",
              "sữa"…
            </p>
          )}
        </div>
      </main>

      <DrawerForm
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={upsertRecipe}
        initial={editing}
      />
    </div>
  );
}
