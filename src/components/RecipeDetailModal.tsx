import { motion } from "framer-motion";
import { X, Clock, Users, MapPin, Utensils, ChefHat, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { RecipeData } from "@/lib/api";

interface RecipeDetailModalProps {
  recipe: RecipeData;
  onClose: () => void;
  onExportPdf?: (id: string) => void;
}

const RecipeDetailModal = ({ recipe, onClose, onExportPdf }: RecipeDetailModalProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl border border-border/50 bg-card shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      {recipe.image && (
        <div className="aspect-video overflow-hidden rounded-t-xl">
          <img src={recipe.image} alt={recipe.title} className="h-full w-full object-cover" />
        </div>
      )}
      <div className="p-6 space-y-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-display font-bold text-gradient-orange">{recipe.title}</h2>
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              {recipe.time && <span className="flex items-center gap-1"><Clock className="h-4 w-4 text-primary" />{recipe.time}</span>}
              {recipe.servings && <span className="flex items-center gap-1"><Users className="h-4 w-4 text-primary" />{recipe.servings}</span>}
              {recipe.region && <span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-primary" />{recipe.region}</span>}
            </div>
          </div>
          <div className="flex gap-2">
            {onExportPdf && recipe.id && (
              <Button variant="outline" size="icon" onClick={() => onExportPdf(recipe.id!)}>
                <Download className="h-4 w-4" />
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="flex items-center gap-2 text-lg font-display font-semibold">
            <Utensils className="h-5 w-5 text-primary" /> Ingredients
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {recipe.ingredients.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="flex items-center gap-2 text-lg font-display font-semibold">
            <ChefHat className="h-5 w-5 text-primary" /> Steps
          </h3>
          <ol className="space-y-3">
            {recipe.steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-bold shrink-0">
                  {i + 1}
                </span>
                <span className="leading-relaxed pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

export default RecipeDetailModal;
