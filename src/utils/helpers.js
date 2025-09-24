export function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function load(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function tokenize(q) {
  return (q || "")
    .toLowerCase()
    .replace(/[\n,]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

export function parseIngredients(s) {
  return (s || "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}

export function parseTags(s) {
  // hỗn hợp #tag và dấu phẩy
  return (s || "")
    .replace(/#/g, " ")
    .split(/[,\s]+/)
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);
}

export function formatTags(arr) {
  return (arr || []).map((t) => `#${t}`).join(" ");
}

export function formatIngredients(arr) {
  return (arr || []).join(", ");
}

export function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
