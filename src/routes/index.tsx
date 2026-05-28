import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-tiles.jpg";
import showcaseImg from "@/assets/showcase-tiles.jpg";
import doorsImg from "@/assets/doors.jpg";
import marbleImg from "@/assets/marble.jpg";
import bathroomImg from "@/assets/bathroom.jpg";
import { Phone, MapPin, Clock, Truck, ShieldCheck, Sparkles, Star, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "G-Paublombs & Co — Premium Tiles & Building Materials in Lagos" },
      { name: "description", content: "Lagos' trusted supplier of Italian, Spanish & Nigerian tiles, doors and building materials. Nationwide delivery. Call 0803 227 2932." },
      { property: "og:title", content: "G-Paublombs & Co — Premium Tiles & Building Materials" },
      { property: "og:description", content: "Italian, Spanish & Nigerian tiles delivered anywhere in Nigeria. 4.6★ rated supplier in Orile Iganmu, Lagos." },
      { property: "og:image", content: heroImg },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const PHONE = "0803 227 2932";
const TEL = "tel:+2348032272932";
const WHATSAPP = "https://wa.me/2348032272932";
const ADDRESS = "Block K Shop 40, STI Market, opposite Odu Ade Market, beside GTBank, Orile Iganmu, Lagos";

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <TrustBar />
      <Categories />
      <WhyUs />
      <Gallery />
      <Reviews />
      <Visit />
      <CTA />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="absolute top-0 left-0 right-0 z-30">
      <div className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between text-cream">
        <a href="#" className="flex items-center gap-2">
          <span className="font-display text-2xl font-semibold tracking-tight">G‑Paublombs</span>
          <span className="hidden sm:inline text-xs uppercase tracking-[0.2em] opacity-70 border-l border-cream/30 pl-2">& Co</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <a href="#categories" className="hover:text-gold transition">Products</a>
          <a href="#why" className="hover:text-gold transition">Why us</a>
          <a href="#gallery" className="hover:text-gold transition">Gallery</a>
          <a href="#visit" className="hover:text-gold transition">Visit</a>
        </nav>
        <a href={TEL} className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-cream text-ink text-sm font-medium hover:bg-gold transition">
          <Phone size={14} /> {PHONE}
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      <img src={heroImg} alt="Luxury marble interior with premium tiles" className="absolute inset-0 w-full h-full object-cover" width={1600} height={1200} />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/50 to-ink/80" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-40 pb-24 min-h-[100svh] flex flex-col justify-end">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 text-cream/80 text-xs uppercase tracking-[0.3em] mb-6">
            <span className="h-px w-8 bg-gold" /> Est. supplier · Orile Iganmu, Lagos
          </span>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-cream leading-[0.95] text-balance">
            Floors worth <em className="text-gold italic font-normal">walking</em> home to.
          </h1>
          <p className="mt-8 text-lg md:text-xl text-cream/80 max-w-xl leading-relaxed">
            Premium Italian, Spanish and Nigerian tiles — handpicked, fairly priced, and delivered to your doorstep anywhere in Nigeria.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href={WHATSAPP} className="group inline-flex items-center gap-3 bg-clay hover:bg-clay-deep text-cream px-7 py-4 rounded-sm font-medium transition">
              Get a Quote on WhatsApp
              <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
            </a>
            <a href={TEL} className="inline-flex items-center gap-3 border border-cream/30 hover:border-cream text-cream px-7 py-4 rounded-sm font-medium transition">
              <Phone size={16} /> Call {PHONE}
            </a>
          </div>
          <div className="mt-10 flex items-center gap-6 text-cream/70 text-sm">
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-gold text-gold" />)}
            </div>
            <span>4.6 / 5 · 34 Google reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const items = [
    { icon: Truck, title: "Nationwide delivery", sub: "Anywhere in Nigeria" },
    { icon: ShieldCheck, title: "Verified quality", sub: "Italian · Spanish · Nigerian" },
    { icon: Sparkles, title: "Installation support", sub: "Structuring & fitting" },
    { icon: Clock, title: "On‑time supply", sub: "Open Mon–Sat · 8am–6pm" },
  ];
  return (
    <section className="border-y border-border bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {items.map((it) => (
          <div key={it.title} className="flex items-start gap-4">
            <it.icon className="text-clay shrink-0 mt-1" size={22} />
            <div>
              <div className="font-medium text-ink">{it.title}</div>
              <div className="text-sm text-muted-foreground">{it.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Categories() {
  const cats = [
    { img: marbleImg, name: "Italian & Spanish Tiles", desc: "Polished porcelain, marble looks, large format." },
    { img: showcaseImg, name: "Nigerian Tiles", desc: "Hard‑wearing, affordable, vast pattern library." },
    { img: doorsImg, name: "Doors & Fittings", desc: "Interior, security & decorative door systems." },
    { img: bathroomImg, name: "Bathroom & Wall", desc: "Wet‑area tiles, mosaics and feature walls." },
  ];
  return (
    <section id="categories" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-clay">What we supply</span>
          <h2 className="font-display text-4xl md:text-5xl mt-3 max-w-2xl text-balance">
            A material library built for Nigerian homes.
          </h2>
        </div>
        <a href={WHATSAPP} className="text-sm font-medium text-clay hover:text-clay-deep inline-flex items-center gap-2">
          Request full catalogue <ArrowRight size={14} />
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cats.map((c, i) => (
          <a key={c.name} href={WHATSAPP} className={`group relative overflow-hidden rounded-sm bg-card ${i % 3 === 0 ? "md:row-span-2" : ""}`}>
            <div className={`relative ${i % 3 === 0 ? "aspect-[4/5]" : "aspect-[16/10]"} overflow-hidden`}>
              <img src={c.img} alt={c.name} loading="lazy" width={1200} height={900} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8 text-cream">
                <h3 className="font-display text-2xl md:text-3xl">{c.name}</h3>
                <p className="text-cream/80 text-sm mt-2 max-w-sm">{c.desc}</p>
                <span className="inline-flex items-center gap-2 text-gold text-sm mt-4 group-hover:gap-3 transition-all">
                  Enquire <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function WhyUs() {
  const points = [
    { n: "01", t: "Curated quality", d: "We hand‑select every shipment — only tiles and materials we'd lay in our own homes make it to your site." },
    { n: "02", t: "Honest pricing", d: "Direct relationships with mills in Italy, Spain and Nigeria mean fair prices, no middlemen markups." },
    { n: "03", t: "Delivered nationwide", d: "From Lagos to Abuja, Port Harcourt to Kano — we ship safely and on schedule." },
    { n: "04", t: "End‑to‑end support", d: "Need help with structuring or fitting? Our team handles installation too." },
  ];
  return (
    <section id="why" className="bg-ink text-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <span className="text-xs uppercase tracking-[0.3em] text-gold">Why G‑Paublombs</span>
          <h2 className="font-display text-4xl md:text-5xl mt-4 text-balance">
            Building trust, one delivery at a time.
          </h2>
          <p className="text-cream/70 mt-6 leading-relaxed">
            For years we've supplied homes, hotels and offices across Nigeria with the materials that make a space feel finished. Our customers come back — and bring their friends.
          </p>
        </div>
        <div className="lg:col-span-8 grid sm:grid-cols-2 gap-px bg-cream/10">
          {points.map(p => (
            <div key={p.n} className="bg-ink p-8">
              <div className="text-gold font-display text-3xl">{p.n}</div>
              <h3 className="font-display text-xl mt-4">{p.t}</h3>
              <p className="text-cream/70 text-sm mt-3 leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="grid lg:grid-cols-12 gap-10 items-end mb-12">
        <div className="lg:col-span-7">
          <span className="text-xs uppercase tracking-[0.3em] text-clay">Recent installations</span>
          <h2 className="font-display text-4xl md:text-5xl mt-3 text-balance">
            Spaces transformed with our materials.
          </h2>
        </div>
        <p className="lg:col-span-5 text-muted-foreground">
          A glimpse into homes and projects across Lagos that chose us for floors, walls and doors that last.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[heroImg, marbleImg, showcaseImg, bathroomImg, doorsImg, marbleImg, bathroomImg, heroImg].map((src, i) => (
          <div key={i} className={`overflow-hidden rounded-sm ${i % 5 === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"}`}>
            <img src={src} alt="" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition duration-700" />
          </div>
        ))}
      </div>
    </section>
  );
}

function Reviews() {
  const reviews = [
    { n: "Kenneth Osborn", t: "At first I was skeptical — losing money these days feels like losing a life. But after my first experience with G‑Paublombs, I'm satisfied and looking forward to patronising them more.", r: 5 },
    { n: "Emmanuel Ezenwa", t: "G‑Paublombs group is ever satisfiable when it comes to building materials, structuring and fitting. They deliver on time and deliver the correct ware.", r: 5 },
    { n: "Deborah Owokola", t: "Great customer service. Used them during the redesigning of our home and it was a job well done. Their tiles and products are of good quality — highly recommend.", r: 5 },
  ];
  return (
    <section className="bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-clay">Customer voices</span>
            <h2 className="font-display text-4xl md:text-5xl mt-3 max-w-xl text-balance">
              4.6 stars. 34 reviews. Years of trust.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex">{[1,2,3,4,5].map(i => <Star key={i} size={18} className="fill-gold text-gold" />)}</div>
            <span className="text-sm text-muted-foreground">Verified on Google</span>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div key={r.n} className="bg-cream p-8 rounded-sm border border-border flex flex-col">
              <div className="flex gap-1 mb-5">
                {Array.from({length: r.r}).map((_, i) => <Star key={i} size={14} className="fill-gold text-gold" />)}
              </div>
              <p className="text-ink/80 leading-relaxed flex-1">"{r.t}"</p>
              <div className="mt-6 pt-6 border-t border-border">
                <div className="font-medium text-ink">{r.n}</div>
                <div className="text-xs text-muted-foreground mt-1">Google review</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section id="visit" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-clay">Visit the showroom</span>
          <h2 className="font-display text-4xl md:text-5xl mt-3 text-balance">
            See, touch, choose — in person.
          </h2>
          <p className="text-muted-foreground mt-6 leading-relaxed">
            Step into our Orile Iganmu showroom to handle samples, compare finishes and get expert advice from our team. Walk‑ins welcome.
          </p>
          <dl className="mt-10 space-y-6">
            <div className="flex gap-4">
              <MapPin className="text-clay shrink-0 mt-1" size={20} />
              <div>
                <dt className="font-medium">Address</dt>
                <dd className="text-muted-foreground text-sm mt-1">{ADDRESS}</dd>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone className="text-clay shrink-0 mt-1" size={20} />
              <div>
                <dt className="font-medium">Phone</dt>
                <dd className="text-muted-foreground text-sm mt-1"><a href={TEL} className="hover:text-clay">{PHONE}</a></dd>
              </div>
            </div>
            <div className="flex gap-4">
              <Clock className="text-clay shrink-0 mt-1" size={20} />
              <div>
                <dt className="font-medium">Hours</dt>
                <dd className="text-muted-foreground text-sm mt-1">Monday – Saturday · 8:00 am – 6:00 pm</dd>
              </div>
            </div>
          </dl>
        </div>
        <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
          <iframe
            title="G-Paublombs showroom location"
            src="https://www.google.com/maps?q=Orile+Iganmu+STI+Market+Lagos&output=embed"
            className="absolute inset-0 w-full h-full grayscale-[20%]"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative bg-clay text-cream overflow-hidden">
      <div className="absolute inset-0 grain opacity-30" />
      <div className="relative mx-auto max-w-5xl px-6 py-24 md:py-32 text-center">
        <h2 className="font-display text-4xl md:text-6xl text-balance">
          Ready to source materials that <em className="italic text-gold">last</em>?
        </h2>
        <p className="mt-6 text-cream/80 max-w-xl mx-auto">
          Tell us your project, get a fast quote, and we'll handle the rest — from selection to delivery anywhere in Nigeria.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a href={WHATSAPP} className="inline-flex items-center gap-3 bg-cream text-ink px-7 py-4 rounded-sm font-medium hover:bg-gold transition">
            Chat on WhatsApp <ArrowRight size={18} />
          </a>
          <a href={TEL} className="inline-flex items-center gap-3 border border-cream/40 hover:border-cream px-7 py-4 rounded-sm font-medium transition">
            <Phone size={16} /> {PHONE}
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-cream/70">
      <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-3 gap-10">
        <div>
          <div className="font-display text-2xl text-cream">G‑Paublombs & Co</div>
          <p className="mt-4 text-sm leading-relaxed">
            Premium tiles, doors and building materials supplier serving homes and projects across Nigeria since inception.
          </p>
        </div>
        <div>
          <div className="text-cream text-sm uppercase tracking-[0.2em]">Visit</div>
          <p className="mt-4 text-sm leading-relaxed">{ADDRESS}</p>
        </div>
        <div>
          <div className="text-cream text-sm uppercase tracking-[0.2em]">Contact</div>
          <a href={TEL} className="block mt-4 text-sm hover:text-gold">{PHONE}</a>
          <a href={WHATSAPP} className="block mt-2 text-sm hover:text-gold">WhatsApp us</a>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-7xl px-6 py-6 text-xs flex flex-wrap justify-between gap-3">
          <span>© {new Date().getFullYear()} G‑Paublombs & Co. All rights reserved.</span>
          <span>Orile Iganmu · Lagos · Nigeria</span>
        </div>
      </div>
    </footer>
  );
}
