import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Pencil, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ImageUploader from "@/components/ImageUploader";
import type { RecipeData } from "@/lib/api";

interface RecipeConfirmProps {
  recipe: RecipeData;
  onConfirm: (recipe: RecipeData, imageFile?: File) => void;
  onCancel: () => void;
}

const RecipeConfirm = ({ recipe, onConfirm, onCancel }: RecipeConfirmProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState<RecipeData>({ ...recipe });
  const [imageFile, setImageFile] = useState<File | undefined>();

  const updateField = (field: keyof RecipeData, value: any) => {
    setEditedRecipe((prev) => ({ ...prev, [field]: value }));
  };

  const updateIngredient = (index: number, value: string) => {
    const updated = [...editedRecipe.ingredients];
    updated[index] = value;
    updateField("ingredients", updated);
  };

  const addIngredient = () => {
    updateField("ingredients", [...editedRecipe.ingredients, ""]);
  };

  const removeIngredient = (index: number) => {
    updateField("ingredients", editedRecipe.ingredients.filter((_, i) => i !== index));
  };

  const updateStep = (index: number, value: string) => {
    const updated = [...editedRecipe.steps];
    updated[index] = value;
    updateField("steps", updated);
  };

  const addStep = () => {
    updateField("steps", [...editedRecipe.steps, ""]);
  };

  const removeStep = (index: number) => {
    updateField("steps", editedRecipe.steps.filter((_, i) => i !== index));
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <Card className="border-border/50 bg-card/80 backdrop-blur">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="font-display text-xl">
            {isEditing ? "Edit Recipe" : "Confirm Recipe"}
          </CardTitle>
          <div className="flex gap-2">
            {!isEditing ? (
              <>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  <Pencil className="h-4 w-4 mr-1" /> Edit
                </Button>
                <Button size="sm" onClick={() => onConfirm(editedRecipe, imageFile)} className="glow-orange">
                  <Check className="h-4 w-4 mr-1" /> Confirm & Save
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => { setIsEditing(false); setEditedRecipe({ ...recipe }); }}>
                  Cancel
                </Button>
                <Button size="sm" onClick={() => setIsEditing(false)}>
                  <Save className="h-4 w-4 mr-1" /> Done Editing
                </Button>
              </>
            )}
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Image Upload */}
          <ImageUploader onImageSelect={setImageFile} onClear={() => setImageFile(undefined)} />

          {/* Title */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">Title</label>
            {isEditing ? (
              <Input value={editedRecipe.title} onChange={(e) => updateField("title", e.target.value)} />
            ) : (
              <p className="text-lg font-display font-semibold">{editedRecipe.title}</p>
            )}
          </div>

          {/* Meta row */}
          <div className="grid grid-cols-3 gap-4">
            {(["time", "servings", "region"] as const).map((field) => (
              <div key={field} className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground capitalize">{field}</label>
                {isEditing ? (
                  <Input value={editedRecipe[field]} onChange={(e) => updateField(field, e.target.value)} />
                ) : (
                  <p className="text-sm">{editedRecipe[field] || "—"}</p>
                )}
              </div>
            ))}
          </div>

          {/* Ingredients */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Ingredients</label>
            {editedRecipe.ingredients.map((item, i) => (
              <div key={i} className="flex gap-2">
                {isEditing ? (
                  <>
                    <Input value={item} onChange={(e) => updateIngredient(i, e.target.value)} className="flex-1" />
                    <Button variant="ghost" size="icon" onClick={() => removeIngredient(i)} className="shrink-0">
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <p className="text-sm flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    {item}
                  </p>
                )}
              </div>
            ))}
            {isEditing && (
              <Button variant="outline" size="sm" onClick={addIngredient}>+ Add Ingredient</Button>
            )}
          </div>

          {/* Steps */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Steps</label>
            {editedRecipe.steps.map((step, i) => (
              <div key={i} className="flex gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-bold shrink-0 mt-1">
                  {i + 1}
                </span>
                {isEditing ? (
                  <>
                    <Textarea value={step} onChange={(e) => updateStep(i, e.target.value)} className="flex-1 min-h-[60px]" />
                    <Button variant="ghost" size="icon" onClick={() => removeStep(i)} className="shrink-0">
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <p className="text-sm leading-relaxed pt-0.5">{step}</p>
                )}
              </div>
            ))}
            {isEditing && (
              <Button variant="outline" size="sm" onClick={addStep}>+ Add Step</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RecipeConfirm;
