import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import ReactMarkdown from "react-markdown";

const BlogPage = () => {
  const navigate = useNavigate();
  const { data: posts, isLoading } = useQuery({
    queryKey: ["public-blogs"],
    queryFn: async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("published_at", { ascending: false });
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to portfolio
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-2">
            Blog
          </h1>
          <p className="text-muted-foreground mb-12">Thoughts, tutorials, and insights.</p>
        </motion.div>

        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : posts && posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => navigate(`/blog/${post.slug}`)}
                className="card-elevated p-6 cursor-pointer hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.published_at ? new Date(post.published_at).toLocaleDateString() : ""}
                </div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-2">{post.title}</h2>
                {post.excerpt && <p className="text-muted-foreground text-sm">{post.excerpt}</p>}
              </motion.article>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-12">No blog posts yet. Stay tuned!</p>
        )}
      </div>
    </div>
  );
};

// Blog post detail page
export const BlogPostPage = () => {
  const navigate = useNavigate();
  const slug = window.location.pathname.split("/blog/")[1];

  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();
      return data;
    },
    enabled: !!slug,
  });

  if (isLoading) return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">Loading...</div>;
  if (!post) return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">Post not found.</div>;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-16 max-w-3xl">
        <button
          onClick={() => navigate("/blog")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to blog
        </button>
        <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
            <Calendar className="w-3.5 h-3.5" />
            {post.published_at ? new Date(post.published_at).toLocaleDateString() : ""}
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">{post.title}</h1>
          <div className="prose prose-invert prose-sm max-w-none text-muted-foreground [&_h2]:text-foreground [&_h3]:text-foreground [&_strong]:text-foreground [&_a]:text-primary">
            <ReactMarkdown>{post.content || ""}</ReactMarkdown>
          </div>
        </motion.article>
      </div>
    </div>
  );
};

export default BlogPage;
