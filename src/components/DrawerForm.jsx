import React, { useEffect, useState } from "react";
import { X, ImagePlus } from "lucide-react";
import {
  fileToDataURL,
  parseIngredients,
  parseTags,
  formatTags,
  formatIngredients,
  uid,
} from "../utils/helpers";

export default function DrawerForm({ open, onClose, onSubmit, initial }) {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || "");
      setIngredients(formatIngredients(initial.ingredients));
      setSteps(initial.steps || "");
      setTags(formatTags(initial.tags));
      setImage(initial.image || "");
    } else {
      setTitle("");
      setIngredients("");
      setSteps("");
      setTags("");
      setImage("");
    }
  }, [initial, open]);

  async function onFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await fileToDataURL(file);
    setImage(dataUrl);
  }

  function handleSave(e) {
    e?.preventDefault?.();
    const data = {
      id: initial?.id || uid(),
      title: title.trim() || "Món chưa đặt tên",
      ingredients: parseIngredients(ingredients),
      steps: steps.trim(),
      tags: parseTags(tags),
      image,
      createdAt: initial?.createdAt || Date.now(),
      updatedAt: Date.now(),
    };
    onSubmit?.(data);
    // reset form
    setTitle("");
    setIngredients("");
    setSteps("");
    setTags("");
    setImage("");
  }

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/30 transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* drawer responsive: full width trên mobile */}
      <div
        className={`absolute top-0 right-0 h-full w-full md:max-w-md bg-white shadow-2xl border-l border-slate-200 transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* header */}
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white">
          <h2 className="font-semibold">
            {initial ? "Sửa công thức" : "Thêm công thức"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* form */}
        <form
          onSubmit={handleSave}
          className="p-4 grid gap-3 overflow-y-auto h-[calc(100%-56px)]"
        >
          <div className="flex items-center gap-3">
            <div className="w-24 h-24 rounded-xl bg-slate-100 overflow-hidden">
              {image ? (
                <img
                  src={image}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full grid place-items-center text-slate-400 text-xs">
                  (Ảnh)
                </div>
              )}
            </div>
            <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 cursor-pointer">
              <ImagePlus className="w-4 h-4" /> Chọn ảnh
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onFileChange}
              />
            </label>
          </div>

          <div>
            <label className="text-sm">Tên món</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="text-sm">
              Nguyên liệu (phân cách bằng dấu ,)
            </label>
            <input
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="text-sm">Cách làm</label>
            <textarea
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              rows={4}
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="text-sm">Tags (ví dụ: #healthy #quick)</label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
            />
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="submit"
              className="flex-1 rounded-xl bg-sky-500 hover:bg-sky-600 text-white py-2"
            >
              Lưu
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border px-4"
            >
              Đóng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
