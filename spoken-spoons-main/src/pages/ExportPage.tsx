import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Download, FileText, ChefHat, MapPin, Check, FileJson, FileType, BookOpen } from "lucide-react";
import SidebarLayout from "@/components/SidebarLayout";
import { Button } from "@/components/ui/button";
import { getLocalRecipes, type RecipeData } from "@/lib/api";
import { exportRecipeBookPdf, exportSingleRecipePdf } from "@/lib/pdfExport";

type ExportFormat = "pdf-book" | "pdf-single" | "json" | "text";

const FORMAT_OPTIONS: { id: ExportFormat; label: string; desc: string; icon: typeof FileText }[] = [
  { id: "pdf-book", label: "PDF Recipe Book", desc: "Full book with cover & table of contents", icon: BookOpen },
  { id: "pdf-single", label: "PDF Per Recipe", desc: "Individual detailed PDF for each recipe", icon: FileText },
  { id: "json", label: "JSON Data", desc: "Structured data for developers", icon: FileJson },
  { id: "text", label: "Plain Text", desc: "Simple readable text format", icon: FileType },
];

function exportAsText(recipes: RecipeData[]) {
  const text = recipes.map((r) => {
    let out = `═══════════════════════════════════\n${r.title.toUpperCase()}\n═══════════════════════════════════\n`;
    if (r.region) out += `Region: ${r.region}\n`;
    if (r.time) out += `Time: ${r.time}\n`;
    if (r.servings) out += `Servings: ${r.servings}\n`;
    if (r.description) out += `\n${r.description}\n`;
    out += `\n── Ingredients ──\n`;
    r.ingredients.forEach((ing, i) => { out += `  ${i + 1}. ${ing}\n`; });
    out += `\n── Steps ──\n`;
    r.steps.forEach((s, i) => { out += `  Step ${i + 1}: ${s}\n`; });
    return out;
  }).join("\n\n");

  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Indian_Recipes.txt";
  a.click();
  URL.revokeObjectURL(url);
}

function exportAsJson(recipes: RecipeData[]) {
  const data = recipes.map(({ id, title, description, ingredients, steps, time, servings, region }) => ({
    id, title, description, ingredients, steps, time, servings, region,
  }));
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Indian_Recipes.json";
  a.click();
  URL.revokeObjectURL(url);
}

const ExportPage = () => {
  const [recipes] = useState(getLocalRecipes());
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [addCover, setAddCover] = useState(true);
  const [includeRegional, setIncludeRegional] = useState(true);
  const [format, setFormat] = useState<ExportFormat>("pdf-book");

  const toggleRecipe = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectAll = () => setSelectedIds(new Set(recipes.map((r) => r.id)));
  const deselectAll = () => setSelectedIds(new Set());

  const handleExport = useCallback(async () => {
    if (selectedIds.size === 0) { toast.error("Select at least one recipe"); return; }
    const selected = recipes.filter((r) => selectedIds.has(r.id));

    switch (format) {
      case "pdf-book":
        await exportRecipeBookPdf(selected, { addCover });
        break;
      case "pdf-single":
        for (const recipe of selected) {
          await exportSingleRecipePdf(recipe);
        }
        break;
      case "json":
        exportAsJson(selected);
        break;
      case "text":
        exportAsText(selected);
        break;
    }
    toast.success(`Exported ${selected.length} recipes as ${format.toUpperCase()}!`);
  }, [selectedIds, recipes, addCover, format]);

  return (
    <SidebarLayout>
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="section-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-semibold text-lg">Select Recipes</h2>
            <div className="flex gap-3">
              <button onClick={selectAll} className="text-sm text-primary font-medium hover:underline">Select All</button>
              <button onClick={deselectAll} className="text-sm text-muted-foreground font-medium hover:underline">Deselect All</button>
            </div>
          </div>

          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
            {recipes.map((recipe) => {
              const isSelected = selectedIds.has(recipe.id);
              return (
                <motion.div
                  key={recipe.id}
                  layout
                  onClick={() => toggleRecipe(recipe.id)}
                  className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected ? "border-primary bg-primary/5" : "border-border hover:border-border/80"
                  }`}
                >
                  <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
                    isSelected ? "border-primary bg-primary" : "border-muted-foreground"
                  }`}>
                    {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                  </div>
                  {recipe.image ? (
                    <img src={recipe.image} alt={recipe.title} className="h-14 w-14 rounded-lg object-cover" />
                  ) : (
                    <div className="h-14 w-14 rounded-lg bg-secondary flex items-center justify-center">
                      <ChefHat className="h-5 w-5 text-muted-foreground" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-sm">{recipe.title}</p>
                    {recipe.region && (
                      <p className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <MapPin className="h-3 w-3" /> {recipe.region}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="section-card space-y-5">
            <h2 className="font-display font-semibold text-lg">Export Format</h2>

            <div className="space-y-2">
              {FORMAT_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const isActive = format === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setFormat(opt.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                      isActive ? "border-primary bg-primary/5" : "border-border hover:border-border/60"
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                    <div>
                      <p className={`text-sm font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>{opt.label}</p>
                      <p className="text-xs text-muted-foreground">{opt.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {format === "pdf-book" && (
              <div className="space-y-3 pt-2 border-t border-border">
                <label className="flex items-center gap-3 text-sm cursor-pointer">
                  <input type="checkbox" checked={addCover} onChange={(e) => setAddCover(e.target.checked)} className="h-4 w-4 rounded accent-primary" />
                  Add cover page & table of contents
                </label>
                <label className="flex items-center gap-3 text-sm cursor-pointer">
                  <input type="checkbox" checked={includeRegional} onChange={(e) => setIncludeRegional(e.target.checked)} className="h-4 w-4 rounded accent-primary" />
                  Include regional info
                </label>
              </div>
            )}

            <div className="rounded-lg bg-primary/10 p-3">
              <p className="text-sm text-primary font-medium">{selectedIds.size} recipes selected</p>
            </div>

            <Button onClick={handleExport} className="w-full glow-orange" disabled={selectedIds.size === 0}>
              <Download className="h-4 w-4 mr-2" /> Export as {FORMAT_OPTIONS.find(f => f.id === format)?.label}
            </Button>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default ExportPage;
