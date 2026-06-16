import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchProductBySlug,
  fetchProductImages,
  fetchProducts,
  whatsappQuoteUrl,
} from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MessageCircle, FileText, ArrowLeft, ChevronLeft, ChevronRight, ImageOff, CalendarClock } from "lucide-react";
import { ChatWidget } from "@/components/ChatWidget";
import logoPrimary from "@/assets/logo-primary.png.asset.json";

export const Route = createFileRoute("/products/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${decodeURIComponent(params.slug)} — G-Paublo Homes` },
      { name: "description", content: "Premium architectural door from G-Paublo Homes catalog." },
    ],
  }),
  component: ProductDetail,
});

function ProductDetail() {
  const { slug } = Route.useParams();
  const productQ = useQuery({
    queryKey: ["product", slug],
    queryFn: () => fetchProductBySlug(slug),
  });
  const imagesQ = useQuery({
    queryKey: ["product_images", productQ.data?.id],
    queryFn: () => fetchProductImages(productQ.data!.id),
    enabled: !!productQ.data?.id,
  });
  const relatedQ = useQuery({ queryKey: ["products"], queryFn: fetchProducts });

  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  if (productQ.isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>;
  }
  if (!productQ.data) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-display text-4xl text-brand-navy">Product not found</h1>
          <p className="text-muted-foreground mt-3">It may have been removed or renamed.</p>
          <Link to="/products" className="inline-block mt-6 text-brand-blue hover:underline">Back to catalog</Link>
        </div>
      </div>
    );
  }

  const p = productQ.data;
  const imgs = imagesQ.data ?? [];
  const cover = imgs[active]?.image_url;
  const wa = whatsappQuoteUrl(p);
  const related = (relatedQ.data ?? []).filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);
  const specs = Object.entries(p.specifications ?? {});

  return (
    <div className="min-h-screen bg-background text-foreground">
      <DetailNav />

      <div className="mx-auto max-w-7xl px-6 pt-28 pb-6">
        <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-brand-blue">
          <ArrowLeft size={14} /> Back to catalog
        </Link>
      </div>

      <section className="mx-auto max-w-7xl px-6 pb-16 grid lg:grid-cols-2 gap-12">
        <div>
          <div
            className="relative aspect-[4/5] bg-secondary rounded-md overflow-hidden cursor-zoom-in"
            onClick={() => cover && setLightbox(active)}
          >
            {cover ? (
              <img src={cover} alt={p.name} className="w-full h-full object-cover transition-transform hover:scale-105 duration-700" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground"><ImageOff /></div>
            )}
          </div>
          {imgs.length > 1 && (
            <div className="mt-4 grid grid-cols-5 gap-3">
              {imgs.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setActive(i)}
                  className={
                    "aspect-square rounded-sm overflow-hidden border-2 transition " +
                    (i === active ? "border-brand-blue" : "border-transparent hover:border-border")
                  }
                >
                  <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-brand-blue">{p.category}</div>
          <h1 className="font-display text-4xl md:text-5xl mt-2 text-brand-navy text-balance">{p.name}</h1>

          <div className="mt-6 flex items-center gap-3 flex-wrap">
            <StockBadge status={p.stock_status} />
            {p.featured && <Badge className="bg-brand-light text-brand-navy border-0">Featured</Badge>}
          </div>

          {p.description && (
            <p className="mt-6 text-foreground/80 leading-relaxed whitespace-pre-line">{p.description}</p>
          )}

          {p.features?.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xs uppercase tracking-widest text-muted-foreground">Features</h3>
              <ul className="mt-3 space-y-2">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3 text-foreground/85 text-sm">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-blue shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(p.sizes?.length > 0 || p.colors?.length > 0) && (
            <div className="mt-8 grid sm:grid-cols-2 gap-6">
              {p.sizes?.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-muted-foreground">Available sizes</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {p.sizes.map((s) => (
                      <span key={s} className="px-3 py-1 rounded-full bg-secondary text-sm">{s}</span>
                    ))}
                  </div>
                </div>
              )}
              {p.colors?.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-muted-foreground">Available colors</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {p.colors.map((c) => (
                      <span key={c} className="px-3 py-1 rounded-full bg-secondary text-sm">{c}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {specs.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xs uppercase tracking-widest text-muted-foreground">Technical specifications</h3>
              <dl className="mt-3 divide-y divide-border border-y border-border">
                {specs.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-2 py-3 text-sm">
                    <dt className="text-muted-foreground capitalize">{k.replace(/_/g, " ")}</dt>
                    <dd className="text-foreground/90">{String(v)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="mt-10 flex flex-wrap gap-3">
            <a href={wa} target="_blank" rel="noopener" className="inline-flex items-center gap-2 bg-brand-navy hover:bg-brand-blue text-white px-6 py-3.5 rounded-full font-medium transition">
              <FileText size={16} /> Request a Quote
            </a>
            <a href={wa} target="_blank" rel="noopener" className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebd5b] text-white px-6 py-3.5 rounded-full font-medium transition">
              <MessageCircle size={18} /> WhatsApp Inquiry
            </a>
            <a href={wa} target="_blank" rel="noopener" className="inline-flex items-center gap-2 border border-brand-navy/20 hover:border-brand-blue text-brand-navy px-6 py-3.5 rounded-full font-medium transition">
              <CalendarClock size={16} /> Speak to Consultant
            </a>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-secondary py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="font-display text-3xl text-brand-navy">Related products</h2>
              <Link to="/products" className="text-sm text-brand-blue hover:underline">View all</Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((r) => (
                <Link key={r.id} to="/products/$slug" params={{ slug: r.slug }} className="bg-card rounded-md overflow-hidden border border-border hover:border-brand-blue/40 transition">
                  <div className="aspect-square bg-muted" />
                  <div className="p-4">
                    <div className="text-[11px] uppercase tracking-widest text-brand-blue">{r.category}</div>
                    <div className="font-display text-lg mt-1 text-brand-navy">{r.name}</div>
                    <div className="mt-2 text-xs text-muted-foreground">Request Quote</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Dialog open={lightbox !== null} onOpenChange={(open) => !open && setLightbox(null)}>
        <DialogContent className="max-w-5xl bg-black border-0 p-0">
          {lightbox !== null && imgs[lightbox] && (
            <div className="relative">
              <img src={imgs[lightbox].image_url} alt={p.name} className="w-full h-auto max-h-[85vh] object-contain" />
              {imgs.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); setLightbox((l) => (l! - 1 + imgs.length) % imgs.length); }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2"
                  ><ChevronLeft /></button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setLightbox((l) => (l! + 1) % imgs.length); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2"
                  ><ChevronRight /></button>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <ChatWidget />
    </div>
  );
}

function StockBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    in_stock: { label: "In stock", cls: "bg-emerald-100 text-emerald-700" },
    low_stock: { label: "Low stock", cls: "bg-amber-100 text-amber-700" },
    out_of_stock: { label: "Out of stock", cls: "bg-red-100 text-red-700" },
    made_to_order: { label: "Made to order", cls: "bg-brand-light text-brand-navy" },
  };
  const v = map[status] ?? { label: status, cls: "bg-secondary text-foreground" };
  return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${v.cls}`}>{v.label}</span>;
}

function DetailNav() {
  return (
    <header className="absolute top-0 left-0 right-0 z-30">
      <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center p-2" aria-label="G-Paublo Homes">
          <img src={logoPrimary.url} alt="G-Paublo Homes" className="h-12 md:h-14 w-auto min-w-[120px]" />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-brand-navy">
          <Link to="/" className="hover:text-brand-blue transition">Home</Link>
          <Link to="/products" className="hover:text-brand-blue transition">Products</Link>
          <a href="https://wa.me/2348032272932" className="hover:text-brand-blue transition">WhatsApp</a>
        </nav>
      </div>
    </header>
  );
}