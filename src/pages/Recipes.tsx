import AppLayout from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

const Recipes = () => (
  <AppLayout>
    <div className="container py-12">
      <h1 className="text-4xl font-display font-bold text-gradient-orange mb-8">Recipe Library</h1>
      <Card className="border-border/50 bg-card/50">
        <CardContent className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <BookOpen className="h-16 w-16 mb-4 opacity-30" />
          <p className="text-lg font-medium">No recipes yet</p>
          <p className="text-sm mt-1">Record your first recipe using Voice Capture to get started.</p>
        </CardContent>
      </Card>
    </div>
  </AppLayout>
);

export default Recipes;
