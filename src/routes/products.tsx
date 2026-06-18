import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  PRODUCT_CATEGORIES,
  fetchProducts,
  fetchAllProductImages,
  priceLabel,
  whatsappQuoteUrl,
  STOCK_OPTIONS,
  type Product,
  type ProductImage,
} from "@/lib/products";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, MessageCircle, ArrowRight, Filter, ImageOff } from "lucide-react";
import { ChatWidget } from "@/components/ChatWidget";
import logoPrimary from "@/assets/logo-primary.png.asset.json";

export const Route = createFileRoute("/products")({
  validateSearch: (s: Record<string, unknown>) => ({
    category: typeof s.category === "string" ? s.category : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Products — Security & Luxury Doors | G-Paublo Homes" },
      { name: "description", content: "Browse G-Paublo's catalog of premium security doors, luxury entrance doors, smart doors and architectural finishes. Request a WhatsApp quote in seconds." },
      { property: "og:title", content: "Products — G-Paublo Homes" },
      { property: "og:description", content: "Premium security doors, entrance suites, smart locks and architectural finishes." },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const urlSearch = Route.useSearch();
  const productsQ = useQuery({ queryKey: ["products"], queryFn: fetchProducts });
  const imagesQ = useQuery({ queryKey: ["product_images"], queryFn: fetchAllProductImages });

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>(urlSearch.category ?? "all");
  const [stock, setStock] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  const imagesByProduct = useMemo(() => {
    const m = new Map<string, ProductImage[]>();
    (imagesQ.data ?? []).forEach((img) => {
      const arr = m.get(img.product_id) ?? [];
      arr.push(img);
      m.set(img.product_id, arr);
    });
    return m;
  }, [imagesQ.data]);

  const filtered = useMemo(() => {
    const list = productsQ.data ?? [];
    const q = search.trim().toLowerCase();
    return list.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (stock !== "all" && p.stock_status !== stock) return false;
      if (maxPrice !== "" && p.price != null && p.price > Number(maxPrice)) return false;
      if (!q) return true;
      const hay = [p.name, p.category, p.description ?? "", ...(p.features ?? [])].join(" ").toLowerCase();
      return hay.includes(q);
    });
  }, [productsQ.data, search, category, stock, maxPrice]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CatalogNav />

      <section className="bg-brand-navy text-white pt-32 pb-16 md:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 grain opacity-20" />
        <div className="relative mx-auto max-w-7xl px-6">
          <span className="text-xs uppercase tracking-[0.3em] text-brand-light">Catalog</span>
          <h1 className="font-display text-4xl md:text-6xl mt-3 text-balance">
            Premium doors & <em className="italic text-brand-light">architectural finishes</em>.
          </h1>
          <p className="text-white/70 mt-5 max-w-2xl leading-relaxed">
            Engineered for security, designed for status. Browse our full catalog and request a WhatsApp quote in seconds.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 md:py-14">
        <div className="grid lg:grid-cols-[260px_1fr] gap-10">
          <aside className="space-y-8 lg:sticky lg:top-24 self-start">
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2"><Search size={12} /> Search</label>
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Door name, feature…"
                className="mt-2"
              />
            </div>
            <FilterGroup label="Category">
              <FilterPill active={category === "all"} onClick={() => setCategory("all")}>All</FilterPill>
              {PRODUCT_CATEGORIES.map((c) => (
                <FilterPill key={c} active={category === c} onClick={() => setCategory(c)}>
                  {c}
                </FilterPill>
              ))}
            </FilterGroup>
            <FilterGroup label="Availability">
              <FilterPill active={stock === "all"} onClick={() => setStock("all")}>All</FilterPill>
              {STOCK_OPTIONS.map((s) => (
                <FilterPill key={s.value} active={stock === s.value} onClick={() => setStock(s.value)}>
                  {s.label}
                </FilterPill>
              ))}
            </FilterGroup>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2"><Filter size={12} /> Max price (₦)</label>
              <Input
                type="number"
                inputMode="numeric"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
                placeholder="e.g. 800000"
                className="mt-2"
              />
            </div>
          </aside>

          <div>
            <div className="flex items-baseline justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                {productsQ.isLoading ? "Loading…" : `${filtered.length} product${filtered.length === 1 ? "" : "s"}`}
              </p>
            </div>

            {productsQ.isLoading ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="aspect-[4/5] rounded-md bg-secondary animate-pulse" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} images={imagesByProduct.get(p.id) ?? []} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <ChatWidget />
    </div>
  );
}

function CatalogNav() {
  return (
    <header className="absolute top-0 left-0 right-0 z-30">
      <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between text-white">
        <Link to="/" className="flex items-center p-2" aria-label="G-Paublo Homes">
          <img src={logoPrimary.url} alt="G-Paublo Homes" className="h-12 md:h-14 w-auto min-w-[120px] brightness-0 invert" />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link to="/" className="hover:text-brand-light transition">Home</Link>
          <Link to="/products" className="hover:text-brand-light transition">Products</Link>
          <a href="https://wa.me/2348032272932" className="hover:text-brand-light transition">WhatsApp</a>
        </nav>
        <a href="https://wa.me/2348032272932" className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-brand-navy text-sm font-medium hover:bg-brand-light transition">
          <MessageCircle size={14} /> Get a quote
        </a>
      </div>
    </header>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-3 flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function FilterPill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={
        "px-3 py-1.5 rounded-full text-xs border transition " +
        (active
          ? "bg-brand-navy text-white border-brand-navy"
          : "bg-background text-foreground/70 border-border hover:border-brand-blue hover:text-brand-blue")
      }
    >
      {children}
    </button>
  );
}

function ProductCard({ product, images }: { product: Product; images: ProductImage[] }) {
  const cover = images[0]?.image_url;
  return (
    <Link
      to="/products/$slug"
      params={{ slug: product.slug }}
      className="group block bg-card rounded-md overflow-hidden border border-border hover:border-brand-blue/40 hover:shadow-xl hover:shadow-brand-navy/5 transition-all"
    >
      <div className="aspect-[4/5] bg-secondary overflow-hidden relative">
        {cover ? (
          <img
            src={cover}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <ImageOff size={32} />
          </div>
        )}
        {product.featured && (
          <Badge className="absolute top-3 left-3 bg-brand-navy text-white border-0">Featured</Badge>
        )}
        {product.stock_status === "out_of_stock" && (
          <Badge variant="destructive" className="absolute top-3 right-3">Out of stock</Badge>
        )}
      </div>
      <div className="p-5">
        <div className="text-[11px] uppercase tracking-widest text-brand-blue">{product.category}</div>
        <h3 className="font-display text-xl mt-1 text-brand-navy">{product.name}</h3>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">{priceLabel(product)}</span>
          <span className="text-xs text-brand-blue inline-flex items-center gap-1 group-hover:gap-2 transition-all">
            View <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-24 border border-dashed border-border rounded-md">
      <ImageOff className="mx-auto text-muted-foreground" size={32} />
      <h3 className="font-display text-2xl text-brand-navy mt-4">No products match your filters</h3>
      <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">
        Try clearing your search or pick a different category. Or message us on WhatsApp — we'll source it for you.
      </p>
      <a href="https://wa.me/2348032272932" className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-brand-navy text-white rounded-full text-sm hover:bg-brand-blue transition">
        <MessageCircle size={14} /> Chat on WhatsApp
      </a>
    </div>
  );
}