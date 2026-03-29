export interface RecipeData {
  id?: string;
  title: string;
  ingredients: string[];
  steps: string[];
  time: string;
  servings: string;
  region: string;
  image?: string;
  createdAt?: string;
  userId?: string;
}

export interface WebSocketMessage {
  type: "transcript" | "partial_recipe" | "final_recipe" | "tts_audio" | "error" | "status";
  data: any;
}

export const API_BASE_URL = "http://localhost:8000";
export const WS_AUDIO_URL = "ws://localhost:8000/ws/audio";

// API helpers
export async function saveRecipe(recipe: RecipeData, imageFile?: File): Promise<RecipeData> {
  const formData = new FormData();
  formData.append("recipe", JSON.stringify(recipe));
  if (imageFile) formData.append("image", imageFile);

  const res = await fetch(`${API_BASE_URL}/recipes/save`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to save recipe");
  return res.json();
}

export async function fetchRecipes(): Promise<RecipeData[]> {
  const res = await fetch(`${API_BASE_URL}/recipes`);
  if (!res.ok) throw new Error("Failed to fetch recipes");
  return res.json();
}

export async function deleteRecipe(id: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/recipes/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete recipe");
}

export async function exportRecipePdf(id: string): Promise<Blob> {
  const res = await fetch(`${API_BASE_URL}/recipes/export/pdf/${id}`);
  if (!res.ok) throw new Error("Failed to export PDF");
  return res.blob();
}

export async function exportRecipeBookPdf(ids: string[]): Promise<Blob> {
  const res = await fetch(`${API_BASE_URL}/recipes/export/book`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ recipe_ids: ids }),
  });
  if (!res.ok) throw new Error("Failed to export book");
  return res.blob();
}

export async function fetchAdminStats(): Promise<{
  totalRecipes: number;
  totalUsers: number;
  topRegions: { region: string; count: number }[];
  recentRecipes: RecipeData[];
}> {
  const res = await fetch(`${API_BASE_URL}/admin/stats`);
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}

// Local recipe store (used when backend is offline)
const STORAGE_KEY = "recipeai_recipes";

export function getLocalRecipes(): RecipeData[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveLocalRecipe(recipe: RecipeData): RecipeData {
  const recipes = getLocalRecipes();
  const newRecipe = {
    ...recipe,
    id: recipe.id || crypto.randomUUID(),
    createdAt: recipe.createdAt || new Date().toISOString(),
  };
  recipes.unshift(newRecipe);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  return newRecipe;
}

export function deleteLocalRecipe(id: string): void {
  const recipes = getLocalRecipes().filter((r) => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
}
