import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories, fetchProducts, fetchAllProductImages, type ProductImage } from "@/lib/products";
import { ArrowRight, MessageCircle } from "lucide-react";
import { ChatWidget } from "@/components/ChatWidget";
import logoPrimary from "@/assets/logo-primary.png.asset.json";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Door Categories — G-Paublo Homes" },
      { name: "description", content: "Explore G-Paublo's full range of door categories — security, luxury entrance, Turkish, smart, fireproof, interior, wooden and customized doors." },
      { property: "og:title", content: "Door Categories — G-Paublo Homes" },
    ],
    links: [{ rel: "canonical", href: "/categories" }],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  const catsQ = useQuery({ queryKey: ["categories"], queryFn: fetchCategories });
  const prodsQ = useQuery({ queryKey: ["products"], queryFn: () => fetchProducts() });
  const imgsQ = useQuery({ queryKey: ["product_images"], queryFn: fetchAllProductImages });

  const firstImage = (productId: string) => {
    const list: ProductImage[] = imgsQ.data ?? [];
    return list.find((i) => i.product_id === productId)?.image_url;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="absolute top-0 left-0 right-0 z-30">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between text-white">
          <Link to="/" className="flex items-center p-2" aria-label="G-Paublo Homes">
            <img src={logoPrimary.url} alt="G-Paublo Homes" className="h-12 md:h-14 w-auto brightness-0 invert" />
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <Link to="/" className="hover:text-brand-light transition">Home</Link>
            <Link to="/products" className="hover:text-brand-light transition">All products</Link>
            <Link to="/categories" className="hover:text-brand-light transition">Categories</Link>
          </nav>
          <a href="https://wa.me/2348032272932" className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-brand-navy text-sm font-medium hover:bg-brand-light transition">
            <MessageCircle size={14} /> Get a quote
          </a>
        </div>
      </header>

      <section className="bg-brand-navy text-white pt-32 pb-16 md:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 grain opacity-20" />
        <div className="relative mx-auto max-w-7xl px-6">
          <span className="text-xs uppercase tracking-[0.3em] text-brand-light">Showroom</span>
          <h1 className="font-display text-4xl md:text-6xl mt-3 text-balance">
            Door <em className="italic text-brand-light">categories</em>.
          </h1>
          <p className="text-white/70 mt-5 max-w-2xl">Pick a category to explore curated door designs — every product is in stock or made-to-order.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 md:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(catsQ.data ?? []).map((c) => {
            const items = (prodsQ.data ?? []).filter((p) => p.category === c.name);
            const cover = items.map((p) => firstImage(p.id)).find(Boolean);
            return (
              <Link
                key={c.id}
                to="/products"
                search={{ category: c.name } as never}
                className="group block bg-card rounded-md overflow-hidden border border-border hover:border-brand-blue/40 hover:shadow-xl hover:shadow-brand-navy/5 transition-all"
              >
                <div className="aspect-[4/3] bg-secondary overflow-hidden">
                  {cover ? (
                    <img src={cover} alt={c.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-brand-navy/10 to-brand-light/40" />
                  )}
                </div>
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-2xl text-brand-navy">{c.name}</h2>
                    <div className="text-xs text-muted-foreground mt-1">{items.length} product{items.length === 1 ? "" : "s"}</div>
                  </div>
                  <ArrowRight className="text-brand-blue group-hover:translate-x-1 transition" size={18} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <ChatWidget />
    </div>
  );
}