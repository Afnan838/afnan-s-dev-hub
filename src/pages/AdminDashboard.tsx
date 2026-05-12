import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  LogOut, LayoutDashboard, FolderKanban, Zap, FileText, MessageSquare,
  Plus, Trash2, Edit2, X, Check, Loader2, Eye, EyeOff, ArrowLeft, Menu,
} from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Tab = "overview" | "projects" | "skills" | "blog" | "messages";

const AdminDashboard = () => {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    navigate("/login");
    return null;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="card-elevated p-8 text-center max-w-md">
          <h2 className="font-display text-xl font-bold text-foreground mb-2">Access Denied</h2>
          <p className="text-muted-foreground text-sm mb-6">You don't have admin privileges.</p>
          <Button variant="outline" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Portfolio
          </Button>
        </div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "projects", label: "Projects", icon: FolderKanban },
    { id: "skills", label: "Skills", icon: Zap },
    { id: "blog", label: "Blog", icon: FileText },
    { id: "messages", label: "Messages", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-40 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
            <LayoutDashboard className="w-4 h-4 text-primary" />
          </div>
          <span className="font-display font-bold text-foreground">Admin</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-foreground">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border p-6 flex flex-col z-50 transition-transform duration-300 ${
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4 text-primary" />
            </div>
            <span className="font-display font-bold text-foreground">Admin Panel</span>
          </div>
          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <nav className="space-y-1 flex-1 overflow-y-auto">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => { setActiveTab(id); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>

        <div className="space-y-2 pt-4 border-t border-border mt-auto">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> View Portfolio
          </button>
          <button
            onClick={signOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="md:ml-64 p-4 md:p-8 pt-20 md:pt-8 min-h-screen overflow-x-hidden">
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "projects" && <ProjectsTab />}
        {activeTab === "skills" && <SkillsTab />}
        {activeTab === "blog" && <BlogTab />}
        {activeTab === "messages" && <MessagesTab />}
      </div>
    </div>
  );
};

// Overview
const OverviewTab = () => {
  const { data: projects } = useQuery({ queryKey: ["admin-projects"], queryFn: async () => (await supabase.from("projects").select("*")).data });
  const { data: skills } = useQuery({ queryKey: ["admin-skills"], queryFn: async () => (await supabase.from("skills").select("*")).data });
  const { data: blogs } = useQuery({ queryKey: ["admin-blogs"], queryFn: async () => (await supabase.from("blog_posts").select("*")).data });
  const { data: messages } = useQuery({ queryKey: ["admin-messages"], queryFn: async () => (await supabase.from("contact_messages").select("*")).data });

  const stats = [
    { label: "Projects", count: projects?.length ?? 0, icon: FolderKanban },
    { label: "Skills", count: skills?.length ?? 0, icon: Zap },
    { label: "Blog Posts", count: blogs?.length ?? 0, icon: FileText },
    { label: "Messages", count: messages?.length ?? 0, icon: MessageSquare },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-foreground mb-8">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, count, icon: Icon }) => (
          <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-elevated p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{label}</span>
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div className="text-3xl font-display font-bold text-foreground">{count}</div>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 card-elevated p-6">
        <h2 className="font-display font-semibold text-lg text-foreground mb-2">Recent Messages</h2>
        {messages && messages.length > 0 ? (
          <div className="space-y-3">
            {messages.slice(0, 5).map((msg) => (
              <div key={msg.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <span className="text-sm font-medium text-foreground">{msg.name}</span>
                  <span className="text-xs text-muted-foreground ml-2">{msg.subject}</span>
                </div>
                <span className="text-xs text-muted-foreground">{new Date(msg.created_at).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No messages yet.</p>
        )}
      </div>
    </div>
  );
};

// Projects Tab
const ProjectsTab = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", category: "Full Stack", tags: "", live_url: "", github_url: "" });

  const { data: projects, isLoading } = useQuery({
    queryKey: ["admin-projects"],
    queryFn: async () => (await supabase.from("projects").select("*").order("display_order")).data,
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("projects").insert({
        title: form.title,
        description: form.description,
        category: form.category,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        live_url: form.live_url || null,
        github_url: form.github_url || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-projects"] });
      setShowForm(false);
      setForm({ title: "", description: "", category: "Full Stack", tags: "", live_url: "", github_url: "" });
      toast({ title: "Project added!" });
    },
    onError: (e: Error) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-projects"] });
      toast({ title: "Project deleted" });
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Projects</h1>
        <Button onClick={() => setShowForm(!showForm)} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" /> Add Project
        </Button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="card-elevated p-6 mb-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="bg-secondary border-border" />
            <Input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="bg-secondary border-border" />
          </div>
          <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="bg-secondary border-border" />
          <Input placeholder="Tags (comma separated)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="bg-secondary border-border" />
          <div className="grid sm:grid-cols-2 gap-4">
            <Input placeholder="Live URL" value={form.live_url} onChange={(e) => setForm({ ...form, live_url: e.target.value })} className="bg-secondary border-border" />
            <Input placeholder="GitHub URL" value={form.github_url} onChange={(e) => setForm({ ...form, github_url: e.target.value })} className="bg-secondary border-border" />
          </div>
          <div className="flex gap-2">
            <Button onClick={() => addMutation.mutate()} disabled={!form.title || addMutation.isPending} className="bg-primary text-primary-foreground">
              {addMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Check className="w-4 h-4 mr-1" /> Save</>}
            </Button>
            <Button variant="outline" onClick={() => setShowForm(false)}><X className="w-4 h-4 mr-1" /> Cancel</Button>
          </div>
        </motion.div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
      ) : (
        <div className="space-y-3">
          {projects?.map((p) => (
            <div key={p.id} className="card-elevated p-4 flex items-center justify-between">
              <div>
                <h3 className="font-display font-semibold text-foreground">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.category} · {(p.tags ?? []).join(", ")}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="text-destructive hover:bg-destructive/10" onClick={() => deleteMutation.mutate(p.id)}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
          {(!projects || projects.length === 0) && <p className="text-muted-foreground text-sm py-8 text-center">No projects yet. Add your first one!</p>}
        </div>
      )}
    </div>
  );
};

// Skills Tab
const SkillsTab = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", level: "80", category: "Frontend" });

  const { data: skills, isLoading } = useQuery({
    queryKey: ["admin-skills"],
    queryFn: async () => (await supabase.from("skills").select("*").order("category").order("display_order")).data,
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("skills").insert({ name: form.name, level: parseInt(form.level), category: form.category });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-skills"] });
      setShowForm(false);
      setForm({ name: "", level: "80", category: "Frontend" });
      toast({ title: "Skill added!" });
    },
    onError: (e: Error) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("skills").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-skills"] }),
  });

  const grouped = skills?.reduce((acc, s) => {
    (acc[s.category] = acc[s.category] || []).push(s);
    return acc;
  }, {} as Record<string, Tables<"skills">[]>);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Skills</h1>
        <Button onClick={() => setShowForm(!showForm)} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" /> Add Skill
        </Button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="card-elevated p-6 mb-6 space-y-4">
          <div className="grid sm:grid-cols-3 gap-4">
            <Input placeholder="Skill name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-secondary border-border" />
            <Input placeholder="Level (0-100)" type="number" min="0" max="100" value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} className="bg-secondary border-border" />
            <Input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="bg-secondary border-border" />
          </div>
          <div className="flex gap-2">
            <Button onClick={() => addMutation.mutate()} disabled={!form.name || addMutation.isPending} className="bg-primary text-primary-foreground">
              {addMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
            </Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </motion.div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
      ) : grouped ? (
        Object.entries(grouped).map(([cat, items]) => (
          <div key={cat} className="mb-6">
            <h3 className="font-display font-semibold text-foreground mb-3">{cat}</h3>
            <div className="space-y-2">
              {items.map((s) => (
                <div key={s.id} className="card-elevated p-3 flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <span className="text-sm text-foreground font-medium w-40">{s.name}</span>
                    <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${s.level}%`, backgroundImage: "var(--gradient-primary)" }} />
                    </div>
                    <span className="text-xs text-primary font-medium w-10 text-right">{s.level}%</span>
                  </div>
                  <Button size="sm" variant="ghost" className="text-destructive ml-3" onClick={() => deleteMutation.mutate(s.id)}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-muted-foreground text-sm py-8 text-center">No skills yet.</p>
      )}
    </div>
  );
};

// Blog Tab
const BlogTab = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", slug: "", content: "", excerpt: "" });

  const { data: posts, isLoading } = useQuery({
    queryKey: ["admin-blogs"],
    queryFn: async () => (await supabase.from("blog_posts").select("*").order("created_at", { ascending: false })).data,
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      const slug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const { error } = await supabase.from("blog_posts").insert({ title: form.title, slug, content: form.content, excerpt: form.excerpt });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-blogs"] });
      setShowForm(false);
      setForm({ title: "", slug: "", content: "", excerpt: "" });
      toast({ title: "Blog post created!" });
    },
    onError: (e: Error) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const togglePublish = useMutation({
    mutationFn: async ({ id, published }: { id: string; published: boolean }) => {
      const { error } = await supabase.from("blog_posts").update({
        published: !published,
        published_at: !published ? new Date().toISOString() : null,
      }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-blogs"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-blogs"] }),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Blog Posts</h1>
        <Button onClick={() => setShowForm(!showForm)} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" /> New Post
        </Button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="card-elevated p-6 mb-6 space-y-4">
          <Input placeholder="Post title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="bg-secondary border-border" />
          <Input placeholder="Slug (auto-generated if empty)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="bg-secondary border-border" />
          <Input placeholder="Excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="bg-secondary border-border" />
          <Textarea placeholder="Content (Markdown)" rows={10} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="bg-secondary border-border font-mono text-sm" />
          <div className="flex gap-2">
            <Button onClick={() => addMutation.mutate()} disabled={!form.title || addMutation.isPending} className="bg-primary text-primary-foreground">
              {addMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Draft"}
            </Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </motion.div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
      ) : (
        <div className="space-y-3">
          {posts?.map((post) => (
            <div key={post.id} className="card-elevated p-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-semibold text-foreground">{post.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${post.published ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"}`}>
                    {post.published ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">/{post.slug}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => togglePublish.mutate({ id: post.id, published: !!post.published })}>
                  {post.published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </Button>
                <Button size="sm" variant="outline" className="text-destructive" onClick={() => deleteMutation.mutate(post.id)}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
          {(!posts || posts.length === 0) && <p className="text-muted-foreground text-sm py-8 text-center">No blog posts yet.</p>}
        </div>
      )}
    </div>
  );
};

// Messages Tab
const MessagesTab = () => {
  const qc = useQueryClient();

  const { data: messages, isLoading } = useQuery({
    queryKey: ["admin-messages"],
    queryFn: async () => (await supabase.from("contact_messages").select("*").order("created_at", { ascending: false })).data,
  });

  const markRead = useMutation({
    mutationFn: async ({ id, read }: { id: string; read: boolean }) => {
      await supabase.from("contact_messages").update({ read: !read }).eq("id", id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-messages"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await supabase.from("contact_messages").delete().eq("id", id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-messages"] }),
  });

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-foreground mb-8">Messages</h1>
      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
      ) : (
        <div className="space-y-4">
          {messages?.map((msg) => (
            <div key={msg.id} className={`card-elevated p-5 ${!msg.read ? "border-l-2 border-l-primary" : ""}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-display font-semibold text-foreground">{msg.name}</h3>
                  <p className="text-xs text-muted-foreground">{msg.email} · {new Date(msg.created_at).toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => markRead.mutate({ id: msg.id, read: !!msg.read })}>
                    {msg.read ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </Button>
                  <Button size="sm" variant="outline" className="text-destructive" onClick={() => deleteMutation.mutate(msg.id)}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
              <p className="text-sm font-medium text-foreground mb-1">{msg.subject}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{msg.message}</p>
            </div>
          ))}
          {(!messages || messages.length === 0) && <p className="text-muted-foreground text-sm py-8 text-center">No messages yet.</p>}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
