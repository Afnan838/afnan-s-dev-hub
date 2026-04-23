// premium-db.ts - IndexedDB implementation for SaaS Dashboard

const DB_NAME = "ZestifyPremiumDB";
const DB_VERSION = 2;

export interface DBUser {
  email: string;
  name: string;
  created_at: string;
}

export interface DBFeedback {
  id?: number;
  user_email: string;
  rating: number;
  message: string;
  voice_record_id?: number; // link to voice record
  created_at: string;
}

export interface DBVoiceRecord {
  id?: number;
  user_email: string;
  blob: Blob;
  created_at: string;
}

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);

    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      if (!db.objectStoreNames.contains("users")) {
        db.createObjectStore("users", { keyPath: "email" });
      }
      
      if (!db.objectStoreNames.contains("feedbacks")) {
        const feedbackStore = db.createObjectStore("feedbacks", { keyPath: "id", autoIncrement: true });
        feedbackStore.createIndex("user_email", "user_email", { unique: false });
      }
      
      if (!db.objectStoreNames.contains("voice_records")) {
        db.createObjectStore("voice_records", { keyPath: "id", autoIncrement: true });
      }
      
      if (!db.objectStoreNames.contains("recipes")) {
        const recipeStore = db.createObjectStore("recipes", { keyPath: "id" });
        recipeStore.createIndex("status", "status", { unique: false });
      }
    };
  });
};

// --- Users ---
export const addDBUser = async (user: DBUser): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("users", "readwrite");
    const store = tx.objectStore("users");
    // Only add if not exists (put will overwrite, which is fine to update name/login date)
    const req = store.put(user);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
};

export const getAllDBUsers = async (): Promise<DBUser[]> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("users", "readonly");
    const req = tx.objectStore("users").getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
};

export const deleteDBUser = async (email: string): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("users", "readwrite");
    const req = tx.objectStore("users").delete(email);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
};

// --- Feedback ---
export const addDBFeedback = async (feedback: DBFeedback): Promise<number> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("feedbacks", "readwrite");
    const req = tx.objectStore("feedbacks").add(feedback);
    req.onsuccess = () => resolve(req.result as number);
    req.onerror = () => reject(req.error);
  });
};

export const getAllDBFeedback = async (): Promise<DBFeedback[]> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("feedbacks", "readonly");
    const req = tx.objectStore("feedbacks").getAll();
    req.onsuccess = () => resolve(req.result.reverse()); // newest first
    req.onerror = () => reject(req.error);
  });
};

export const deleteDBFeedback = async (id: number): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("feedbacks", "readwrite");
    const req = tx.objectStore("feedbacks").delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
};

// --- Voice Records ---
export const addDBVoiceRecord = async (record: DBVoiceRecord): Promise<number> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("voice_records", "readwrite");
    const req = tx.objectStore("voice_records").add(record);
    req.onsuccess = () => resolve(req.result as number);
    req.onerror = () => reject(req.error);
  });
};

export const getDBVoiceRecord = async (id: number): Promise<DBVoiceRecord | null> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("voice_records", "readonly");
    const req = tx.objectStore("voice_records").get(id);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
};

// --- Recipes ---
// We use the RecipeData interface from api.ts, so we'll just use any here to avoid circular deps
// or redefine it minimally.
export const addDBRecipe = async (recipe: any): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("recipes", "readwrite");
    const req = tx.objectStore("recipes").put(recipe);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
};

export const getAllDBRecipes = async (): Promise<any[]> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("recipes", "readonly");
    const req = tx.objectStore("recipes").getAll();
    req.onsuccess = () => resolve(req.result.reverse());
    req.onerror = () => reject(req.error);
  });
};

export const deleteDBRecipe = async (id: string): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("recipes", "readwrite");
    const req = tx.objectStore("recipes").delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
};

export const clearAllDBRecipes = async (): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("recipes", "readwrite");
    const req = tx.objectStore("recipes").clear();
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
};
