import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  fetchProducts,
  fetchAllProductImages,
  PRODUCT_CATEGORIES,
  STOCK_OPTIONS,
  slugify,
  priceLabel,
  type Product,
  type ProductImage,
} from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, LogOut, Upload, Star, X, Loader2, ImagePlus, ShieldAlert } from "lucide-react";
import logoPrimary from "@/assets/logo-primary.png.asset.json";

export const Route = createFileRoute("/_authenticated/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin — G-Paublo Homes Catalog" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();

  const isAdminQ = useQuery({
    queryKey: ["is_admin"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return false;
      const { data, error } = await supabase
        .from("user_roles")
        .select("id")
        .eq("user_id", u.user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (error) throw error;
      return !!data;
    },
  });

  const productsQ = useQuery({ queryKey: ["products"], queryFn: fetchProducts });
  const imagesQ = useQuery({ queryKey: ["product_images"], queryFn: fetchAllProductImages });

  const [editing, setEditing] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);

  async function handleSignOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  const claimAdmin = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.rpc("claim_first_admin");
      if (error) throw error;
      return data as boolean;
    },
    onSuccess: (granted) => {
      if (granted) {
        toast.success("You are now the admin.");
        qc.invalidateQueries({ queryKey: ["is_admin"] });
      } else {
        toast.error("An admin already exists. Ask them to grant you access.");
      }
    },
    onError: (e: any) => toast.error(e.message ?? "Failed to claim admin"),
  });

  const deleteProduct = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Product deleted");
      qc.invalidateQueries({ queryKey: ["products"] });
      qc.invalidateQueries({ queryKey: ["product_images"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const toggleFeatured = useMutation({
    mutationFn: async (p: Product) => {
      const { error } = await supabase.from("products").update({ featured: !p.featured }).eq("id", p.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });

  const imagesByProduct = useMemo(() => {
    const m = new Map<string, ProductImage[]>();
    (imagesQ.data ?? []).forEach((img) => {
      const a = m.get(img.product_id) ?? [];
      a.push(img);
      m.set(img.product_id, a);
    });
    return m;
  }, [imagesQ.data]);

  if (isAdminQ.isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>;
  }

  if (!isAdminQ.data) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center px-6">
        <div className="max-w-md text-center bg-card border border-border rounded-lg p-10 shadow-sm">
          <ShieldAlert className="mx-auto text-brand-blue" size={32} />
          <h1 className="font-display text-3xl text-brand-navy mt-4">Admin access required</h1>
          <p className="text-sm text-muted-foreground mt-3">
            Your account is signed in but doesn't yet have admin permissions. If you're the first user, claim admin now.
          </p>
          <Button
            className="mt-6 bg-brand-navy hover:bg-brand-blue text-white"
            onClick={() => claimAdmin.mutate()}
            disabled={claimAdmin.isPending}
          >
            {claimAdmin.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Claim first admin
          </Button>
          <div className="mt-4">
            <button onClick={handleSignOut} className="text-xs text-muted-foreground hover:text-brand-navy">Sign out</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-brand-navy text-white">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logoPrimary.url} alt="G-Paublo Homes" className="h-10 w-auto brightness-0 invert" />
            <span className="hidden sm:inline text-sm text-brand-light/80">Admin Console</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/products" className="text-sm hover:text-brand-light">View catalog</Link>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10" onClick={handleSignOut}>
              <LogOut size={14} className="mr-1.5" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="font-display text-4xl text-brand-navy">Products</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {productsQ.data?.length ?? 0} total · manage your full catalog
            </p>
          </div>
          <Button onClick={() => setCreating(true)} className="bg-brand-navy hover:bg-brand-blue text-white">
            <Plus size={16} className="mr-1.5" /> Add product
          </Button>
        </div>

        {productsQ.isLoading ? (
          <p className="text-muted-foreground">Loading…</p>
        ) : (productsQ.data?.length ?? 0) === 0 ? (
          <div className="text-center py-20 bg-card rounded-md border border-dashed border-border">
            <ImagePlus className="mx-auto text-muted-foreground" size={32} />
            <h3 className="font-display text-2xl text-brand-navy mt-4">No products yet</h3>
            <p className="text-sm text-muted-foreground mt-2">Add your first product to start building your catalog.</p>
            <Button className="mt-6 bg-brand-navy hover:bg-brand-blue text-white" onClick={() => setCreating(true)}>
              <Plus size={16} className="mr-1.5" /> Add product
            </Button>
          </div>
        ) : (
          <div className="bg-card rounded-md border border-border overflow-hidden">
            {(productsQ.data ?? []).map((p) => {
              const cover = imagesByProduct.get(p.id)?.[0]?.image_url;
              return (
                <div key={p.id} className="flex items-center gap-4 p-4 border-b border-border last:border-0">
                  <div className="h-16 w-16 bg-secondary rounded overflow-hidden shrink-0">
                    {cover ? <img src={cover} alt="" className="w-full h-full object-cover" /> : null}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-brand-navy truncate">{p.name}</span>
                      {p.featured && <Badge className="bg-brand-light text-brand-navy border-0">Featured</Badge>}
                      {p.stock_status === "out_of_stock" && <Badge variant="destructive">Out</Badge>}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">{p.category} · {priceLabel(p)}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" title={p.featured ? "Unfeature" : "Feature"} onClick={() => toggleFeatured.mutate(p)}>
                      <Star size={16} className={p.featured ? "fill-brand-blue text-brand-blue" : ""} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setEditing(p)} title="Edit"><Pencil size={16} /></Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Delete"
                      onClick={() => {
                        if (confirm(`Delete "${p.name}"? This cannot be undone.`)) deleteProduct.mutate(p.id);
                      }}
                    >
                      <Trash2 size={16} className="text-destructive" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {(creating || editing) && (
        <ProductDialog
          product={editing}
          onClose={() => { setEditing(null); setCreating(false); }}
        />
      )}
    </div>
  );
}

function ProductDialog({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const qc = useQueryClient();
  const isEdit = !!product;

  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [category, setCategory] = useState(product?.category ?? PRODUCT_CATEGORIES[0]);
  const [description, setDescription] = useState(product?.description ?? "");
  const [features, setFeatures] = useState((product?.features ?? []).join("\n"));
  const [specs, setSpecs] = useState(
    Object.entries(product?.specifications ?? {}).map(([k, v]) => `${k}: ${v}`).join("\n"),
  );
  const [sizes, setSizes] = useState((product?.sizes ?? []).join(", "));
  const [colors, setColors] = useState((product?.colors ?? []).join(", "));
  const [price, setPrice] = useState<string>(product?.price?.toString() ?? "");
  const [priceMax, setPriceMax] = useState<string>(product?.price_max?.toString() ?? "");
  const [discount, setDiscount] = useState<string>(product?.discount_price?.toString() ?? "");
  const [stockStatus, setStockStatus] = useState(product?.stock_status ?? "in_stock");
  const [featured, setFeatured] = useState(product?.featured ?? false);
  const [saving, setSaving] = useState(false);

  const imagesQ = useQuery({
    queryKey: ["product_images_for", product?.id],
    queryFn: async () => {
      if (!product) return [];
      const { data, error } = await supabase
        .from("product_images")
        .select("*")
        .eq("product_id", product.id)
        .order("sort_order");
      if (error) throw error;
      return (data ?? []) as ProductImage[];
    },
    enabled: !!product,
  });

  function parseSpecs(text: string) {
    const out: Record<string, string> = {};
    text.split("\n").forEach((line) => {
      const idx = line.indexOf(":");
      if (idx > 0) {
        const k = line.slice(0, idx).trim();
        const v = line.slice(idx + 1).trim();
        if (k) out[k] = v;
      }
    });
    return out;
  }

  async function handleSave() {
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        name: name.trim(),
        slug: (slug.trim() || slugify(name)).toLowerCase(),
        category,
        description: description.trim() || null,
        features: features.split("\n").map((s) => s.trim()).filter(Boolean),
        specifications: parseSpecs(specs),
        sizes: sizes.split(",").map((s) => s.trim()).filter(Boolean),
        colors: colors.split(",").map((s) => s.trim()).filter(Boolean),
        price: price === "" ? null : Number(price),
        price_max: priceMax === "" ? null : Number(priceMax),
        discount_price: discount === "" ? null : Number(discount),
        stock_status: stockStatus,
        featured,
      };
      if (isEdit && product) {
        const { error } = await supabase.from("products").update(payload).eq("id", product.id);
        if (error) throw error;
        toast.success("Product updated");
      } else {
        const { error } = await supabase.from("products").insert(payload);
        if (error) throw error;
        toast.success("Product created");
      }
      qc.invalidateQueries({ queryKey: ["products"] });
      onClose();
    } catch (e: any) {
      toast.error(e.message ?? "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleUploadImage(file: File) {
    if (!product) {
      toast.error("Save the product first, then add images.");
      return;
    }
    try {
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${product.id}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error: upErr } = await supabase.storage.from("product-images").upload(path, file, {
        cacheControl: "31536000",
        upsert: false,
      });
      if (upErr) throw upErr;
      const { data: pub } = supabase.storage.from("product-images").getPublicUrl(path);
      const { error: insErr } = await supabase.from("product_images").insert({
        product_id: product.id,
        image_url: pub.publicUrl,
        sort_order: (imagesQ.data?.length ?? 0),
      });
      if (insErr) throw insErr;
      qc.invalidateQueries({ queryKey: ["product_images_for", product.id] });
      qc.invalidateQueries({ queryKey: ["product_images"] });
      toast.success("Image uploaded");
    } catch (e: any) {
      toast.error(e.message ?? "Upload failed");
    }
  }

  async function handleDeleteImage(img: ProductImage) {
    try {
      // best-effort delete from storage
      const url = new URL(img.image_url);
      const marker = "/product-images/";
      const idx = url.pathname.indexOf(marker);
      if (idx >= 0) {
        const objectPath = url.pathname.slice(idx + marker.length);
        await supabase.storage.from("product-images").remove([objectPath]);
      }
      const { error } = await supabase.from("product_images").delete().eq("id", img.id);
      if (error) throw error;
      qc.invalidateQueries({ queryKey: ["product_images_for", product?.id] });
      qc.invalidateQueries({ queryKey: ["product_images"] });
    } catch (e: any) {
      toast.error(e.message ?? "Delete failed");
    }
  }

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-brand-navy">
            {isEdit ? "Edit product" : "New product"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <div className="sm:col-span-2 space-y-1.5">
            <Label>Name</Label>
            <Input value={name} onChange={(e) => { setName(e.target.value); if (!isEdit) setSlug(slugify(e.target.value)); }} />
          </div>
          <div className="space-y-1.5">
            <Label>Slug</Label>
            <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="auto-generated" />
          </div>
          <div className="space-y-1.5">
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {PRODUCT_CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="sm:col-span-2 space-y-1.5">
            <Label>Description</Label>
            <Textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="sm:col-span-2 space-y-1.5">
            <Label>Features (one per line)</Label>
            <Textarea rows={4} value={features} onChange={(e) => setFeatures(e.target.value)} placeholder={"Reinforced steel core\nFingerprint + key access"} />
          </div>
          <div className="sm:col-span-2 space-y-1.5">
            <Label>Specifications (one per line, "key: value")</Label>
            <Textarea rows={4} value={specs} onChange={(e) => setSpecs(e.target.value)} placeholder={"Material: Galvanised steel\nThickness: 70mm"} />
          </div>
          <div className="space-y-1.5">
            <Label>Sizes (comma-separated)</Label>
            <Input value={sizes} onChange={(e) => setSizes(e.target.value)} placeholder="900x2100mm, 1200x2400mm" />
          </div>
          <div className="space-y-1.5">
            <Label>Colors (comma-separated)</Label>
            <Input value={colors} onChange={(e) => setColors(e.target.value)} placeholder="Matte black, Champagne" />
          </div>
          <div className="space-y-1.5">
            <Label>Price (₦)</Label>
            <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="450000" />
          </div>
          <div className="space-y-1.5">
            <Label>Max price (range, optional)</Label>
            <Input type="number" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} placeholder="800000" />
          </div>
          <div className="space-y-1.5">
            <Label>Discount price (optional)</Label>
            <Input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Stock status</Label>
            <Select value={stockStatus} onValueChange={setStockStatus}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {STOCK_OPTIONS.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="sm:col-span-2 flex items-center gap-3 mt-2">
            <Switch checked={featured} onCheckedChange={setFeatured} id="featured" />
            <Label htmlFor="featured" className="cursor-pointer">Mark as featured on catalog & homepage</Label>
          </div>
        </div>

        {isEdit && (
          <div className="mt-6 border-t border-border pt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-brand-navy">Images</h3>
              <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary hover:bg-brand-light text-brand-navy text-xs cursor-pointer transition">
                <Upload size={14} /> Upload
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files ?? []);
                    Promise.all(files.map(handleUploadImage)).then(() => { e.target.value = ""; });
                  }}
                />
              </label>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {(imagesQ.data ?? []).map((img) => (
                <div key={img.id} className="relative aspect-square rounded overflow-hidden bg-secondary group">
                  <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                  <button
                    onClick={() => handleDeleteImage(img)}
                    className="absolute top-1 right-1 bg-black/60 hover:bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                    title="Delete"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              {(imagesQ.data?.length ?? 0) === 0 && (
                <p className="col-span-full text-xs text-muted-foreground">No images yet — upload at least one.</p>
              )}
            </div>
          </div>
        )}

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button className="bg-brand-navy hover:bg-brand-blue text-white" onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            {isEdit ? "Save changes" : "Create product"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}