import { uid } from "./helpers";

export const STORAGE_KEY = "recipe_book_pwa_v2";

export const SEED = [
  {
    id: uid(),
    title: "Gà chiên giòn",
    ingredients: ["ức gà", "bột chiên giòn", "trứng", "muối", "tiêu", "dầu ăn"],
    steps:
      "Ướp gà với muối, tiêu. Nhúng qua trứng → lăn bột → chiên trong dầu nóng đến khi vàng giòn.",
    tags: ["#fried", "#chicken"],
    image: "/ga-ran.jpg",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: uid(),
    title: "Gà chiên giòn",
    ingredients: ["ức gà", "bột chiên giòn", "trứng", "dầu ăn", "muối", "tiêu"],
    steps: "Ướp gà 15 phút. Nhúng trứng → áo bột → chiên vàng giòn.",
    tags: ["fried", "chicken"],
    image: "/ga-ran.jpg",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];
