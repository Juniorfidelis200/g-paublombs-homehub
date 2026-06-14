import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-building.jpg";
import interiorImg from "@/assets/project-interior.jpg";
import townhouseImg from "@/assets/project-townhouse.jpg";
import mixedUseImg from "@/assets/project-mixeduse.jpg";
import blueprintImg from "@/assets/blueprint.jpg";
import { Phone, MapPin, Clock, Building2, KeyRound, TrendingUp, ShieldCheck, ArrowRight, Instagram, ArrowUpRight, Award, Gem, HardHat, HeartHandshake, Quote, Star } from "lucide-react";
import { ChatWidget } from "@/components/ChatWidget";
import logoPrimary from "@/assets/logo-primary.png.asset.json";
import doorLuxuryBlack from "@/assets/door-luxury-black.jpg.asset.json";
import doorSecurityGrey from "@/assets/door-security-grey.jpg.asset.json";
import doorClassicalWhite from "@/assets/door-classical-white.jpg.asset.json";
import doorInteriorGlass from "@/assets/door-interior-glass.jpg.asset.json";
import doorWoodModern from "@/assets/door-wood-modern.jpg.asset.json";
import doorClassicBrown from "@/assets/door-classic-brown.jpg.asset.json";
import doorAluminumGlass from "@/assets/door-aluminum-glass.jpg.asset.json";
import doorEntranceArc from "@/assets/door-entrance-arc.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "G-Paublo Homes Ltd — Crafted Living, Built for Legacy" },
      { name: "description", content: "We design and develop residential and mixed-use spaces that elevate living standards and grow with your future. View current projects and invest with G-Paublo." },
      { property: "og:title", content: "G-Paublo Homes Ltd — Building Timeless Spaces" },
      { property: "og:description", content: "From blueprint to key handover, we deliver homes built to inspire, endure, and appreciate." },
      { property: "og:image", content: heroImg },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const PHONE = "0803 227 2932";
const TEL = "tel:+2348032272932";
const WHATSAPP = "https://wa.me/2348032272932";
const INSTAGRAM = "https://instagram.com/gpaublohomes";
const ADDRESS = "Block K Shop 40, STI Market, opposite Odu Ade Market, beside GTBank, Orile Iganmu, Lagos";

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Stats />
      <About />
      <Projects />
      <Catalog />
      <Process />
      <WhyChoose />
      <Invest />
      <Testimonials />
      <Visit />
      <CTA />
      <Footer />
      <ChatWidget />
    </div>
  );
}

function Nav() {
  return (
    <header className="absolute top-0 left-0 right-0 z-30">
      <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between text-white">
        <a href="#" className="flex items-center p-2" aria-label="G-Paublo Homes Ltd">
          <img
            src={logoPrimary.url}
            alt="G-Paublo Homes Ltd"
            className="h-12 md:h-14 w-auto min-w-[120px] brightness-0 invert"
          />
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <a href="#projects" className="hover:text-brand-light transition">Current Projects</a>
          <a href="#about" className="hover:text-brand-light transition">About Us</a>
          <a href="#invest" className="hover:text-brand-light transition">Invest</a>
          <a href="#visit" className="hover:text-brand-light transition">Contact</a>
        </nav>
        <a href="#invest" className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-brand-navy text-sm font-medium hover:bg-brand-light transition">
          Invest with us <ArrowUpRight size={14} />
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      <img src={heroImg} alt="G-Paublo Homes signature residential development" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/80 via-brand-navy/40 to-brand-navy/90" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-40 pb-24 min-h-[100svh] flex flex-col justify-end">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 text-white/80 text-xs uppercase tracking-[0.3em] mb-6">
            <span className="h-px w-8 bg-brand-light" /> Real estate developer · Lagos, Nigeria
          </span>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-white leading-[0.95] text-balance">
            Crafted Living, <em className="text-brand-light italic font-normal">Built</em> for Legacy.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/85 max-w-xl leading-relaxed font-display italic">
            Building Timeless Spaces. Creating Lasting Value.
          </p>
          <p className="mt-4 text-base md:text-lg text-white/70 max-w-xl leading-relaxed">
            From blueprint to key handover, we deliver homes built to inspire, endure, and appreciate.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#projects" className="group inline-flex items-center gap-3 bg-brand-blue hover:bg-brand-navy text-white px-7 py-4 rounded-full font-medium transition">
              Current Building Projects
              <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
            </a>
            <a href="#invest" className="inline-flex items-center gap-3 border border-white/30 hover:border-white text-white px-7 py-4 rounded-full font-medium transition">
              Invest with G-Paublo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const items = [
    { k: "12+", v: "Projects delivered" },
    { k: "₦2.5B", v: "Investor capital deployed" },
    { k: "100%", v: "On-schedule handover" },
    { k: "4.6★", v: "Client satisfaction" },
  ];
  return (
    <section className="bg-brand-navy text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
        {items.map((it) => (
          <div key={it.v} className="border-l-2 border-brand-light/40 pl-4">
            <div className="font-display text-4xl md:text-5xl text-brand-light">{it.k}</div>
            <div className="text-sm text-white/70 mt-2">{it.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <span className="text-xs uppercase tracking-[0.3em] text-brand-blue">About G-Paublo Homes</span>
          <h2 className="font-display text-4xl md:text-6xl mt-4 text-balance text-brand-navy">
            Building Timeless Spaces. <em className="italic text-brand-blue">Creating</em> Lasting Value.
          </h2>
          <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            At G-Paublo Homes Ltd, we design and develop residential and mixed-use spaces that elevate living standards and grow with your future. Our palette draws inspiration from real-world architectural materials — conveying strength, trust, and timeless design.
          </p>
          <div className="mt-10 grid sm:grid-cols-2 gap-6 max-w-xl">
            <div>
              <div className="font-display text-2xl text-brand-navy">Architectural integrity</div>
              <p className="text-sm text-muted-foreground mt-2">Every detail considered, every line drawn with purpose.</p>
            </div>
            <div>
              <div className="font-display text-2xl text-brand-navy">Investor-grade returns</div>
              <p className="text-sm text-muted-foreground mt-2">Developments structured to appreciate over time.</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
            <img src={interiorImg} alt="Refined modern interior in a G-Paublo development" loading="lazy" width={1600} height={2000} className="w-full h-full object-cover" />
            <div className="absolute -bottom-px left-0 right-0 p-6 bg-gradient-to-t from-brand-navy/90 to-transparent text-white">
              <div className="text-xs uppercase tracking-[0.2em] text-brand-light">Featured residence</div>
              <div className="font-display text-xl mt-1">The Paublo Penthouse Collection</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const projects = [
    { img: heroImg, type: "Residential Apartments", name: "Paublo Heights", loc: "Lekki Phase 1, Lagos", status: "Selling now", units: "24 units · 2–4 bed" },
    { img: townhouseImg, type: "Townhouse Estate", name: "Legacy Court", loc: "Orile Iganmu, Lagos", status: "Under construction", units: "16 units · 3–4 bed" },
    { img: mixedUseImg, type: "Mixed-Use Development", name: "Paublo Plaza", loc: "Lagos Mainland", status: "Pre-launch", units: "Retail + 40 residences" },
  ];
  return (
    <section id="projects" className="bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-brand-blue">Current building projects</span>
            <h2 className="font-display text-4xl md:text-5xl mt-3 max-w-2xl text-balance text-brand-navy">
              Where your next address takes shape.
            </h2>
          </div>
          <a href={WHATSAPP} className="text-sm font-medium text-brand-blue hover:text-brand-navy inline-flex items-center gap-2">
            Request project brochure <ArrowRight size={14} />
          </a>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <a key={p.name} href={WHATSAPP} className="group relative overflow-hidden rounded-sm bg-white border border-border flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={p.img} alt={p.name} loading="lazy" width={1600} height={1200} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.2em] bg-brand-navy text-white px-3 py-1 rounded-full">{p.status}</span>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="text-xs uppercase tracking-[0.2em] text-brand-blue">{p.type}</div>
                <h3 className="font-display text-2xl mt-2 text-brand-navy">{p.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                  <MapPin size={14} /> {p.loc}
                </div>
                <div className="text-sm text-foreground/70 mt-3">{p.units}</div>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-blue group-hover:gap-3 transition-all">
                  Enquire about availability <ArrowRight size={14} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
function Catalog() {
  const products = [
    { img: doorLuxuryBlack.url, name: "Imperial Black Series", cat: "Luxury Entrance · Security", tag: "Best seller" },
    { img: doorSecurityGrey.url, name: "Sentinel Twin Panel", cat: "Heavy-Duty Security Door", tag: "In stock" },
    { img: doorClassicalWhite.url, name: "Heritage White & Gold", cat: "Classical Entrance Suite", tag: "Bespoke" },
    { img: doorInteriorGlass.url, name: "Aurora Bath & Interior", cat: "Aluminum + Frosted Glass", tag: "Interior" },
    { img: doorWoodModern.url, name: "Walnut Slim-Frame", cat: "Modern Entrance · Walnut Veneer", tag: "New" },
    { img: doorClassicBrown.url, name: "Mahogany Double Wing", cat: "Classic Luxury Entrance", tag: "Available" },
    { img: doorAluminumGlass.url, name: "Pioneer Aluminum Glass", cat: "Tempered Glass · 2050×750mm", tag: "In stock" },
    { img: doorEntranceArc.url, name: "Arc Signature Entrance", cat: "Designer Entrance Door", tag: "Featured" },
  ];
  return (
    <section id="catalog" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.3em] text-brand-blue">Door collection & architectural finishes</span>
            <h2 className="font-display text-4xl md:text-5xl mt-3 text-balance text-brand-navy">
              Security doors, entrance suites & <em className="italic text-brand-blue">finishing</em> products.
            </h2>
            <p className="text-muted-foreground mt-5 leading-relaxed">
              Beyond developments, we supply premium security and entrance doors, aluminum & glass systems, and architectural finishing products — sourced and installed across Lagos and nationwide.
            </p>
          </div>
          <a href={WHATSAPP} className="text-sm font-medium text-brand-blue hover:text-brand-navy inline-flex items-center gap-2">
            Request full catalog & price list <ArrowRight size={14} />
          </a>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p) => (
            <a key={p.name} href={WHATSAPP} className="group bg-secondary rounded-sm overflow-hidden border border-border hover:border-brand-blue/40 hover:shadow-xl hover:shadow-brand-navy/5 transition flex flex-col">
              <div className="relative aspect-[3/4] overflow-hidden bg-brand-navy/5">
                <img src={p.img} alt={p.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                <span className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.18em] bg-brand-navy text-white px-2.5 py-1 rounded-full">{p.tag}</span>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="text-[11px] uppercase tracking-[0.2em] text-brand-blue">{p.cat}</div>
                <h3 className="font-display text-lg mt-1.5 text-brand-navy leading-tight">{p.name}</h3>
                <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-brand-blue group-hover:gap-2.5 transition-all">
                  Enquire & price <ArrowRight size={12} />
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className="mt-14 grid sm:grid-cols-3 gap-6 text-sm">
          {[
            { t: "Nationwide delivery", d: "Lagos pickup or shipped to your site anywhere in Nigeria." },
            { t: "Custom sizes & finishes", d: "Bespoke entrance suites to architectural specification." },
            { t: "Professional installation", d: "Trained crew, on-site fitting, snag-free finish guarantee." },
          ].map((f) => (
            <div key={f.t} className="border-l-2 border-brand-blue pl-5">
              <div className="font-display text-lg text-brand-navy">{f.t}</div>
              <p className="text-muted-foreground mt-1.5 leading-relaxed">{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { n: "01", icon: Building2, t: "Blueprint", d: "Architecture-led design and structural planning by experienced engineers." },
    { n: "02", icon: ShieldCheck, t: "Build", d: "Verified contractors, quality materials, regular site audits on every project." },
    { n: "03", icon: KeyRound, t: "Handover", d: "Snag-free key handover with documentation, warranties, and after-sales care." },
    { n: "04", icon: TrendingUp, t: "Appreciate", d: "Locations and finishes chosen to grow your asset value over time." },
  ];
  return (
    <section id="process" className="bg-brand-navy text-white py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 grain opacity-30" />
      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <span className="text-xs uppercase tracking-[0.3em] text-brand-light">Our process</span>
          <h2 className="font-display text-4xl md:text-5xl mt-4 text-balance">
            From blueprint to key handover.
          </h2>
          <p className="text-white/70 mt-6 leading-relaxed">
            A disciplined four-stage development cycle — so your home, or your investment, lands exactly as promised.
          </p>
        </div>
        <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="border border-white/10 p-7 rounded-sm hover:border-brand-light/50 transition">
              <div className="flex items-center justify-between">
                <s.icon className="text-brand-light" size={22} />
                <div className="text-brand-light/60 font-display text-2xl">{s.n}</div>
              </div>
              <h3 className="font-display text-2xl mt-5">{s.t}</h3>
              <p className="text-white/70 text-sm mt-3 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Invest() {
  return (
    <section id="invest" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-[5/4] rounded-sm overflow-hidden order-2 lg:order-1">
          <img src={blueprintImg} alt="G-Paublo development site review" loading="lazy" width={1600} height={1280} className="w-full h-full object-cover" />
        </div>
        <div className="order-1 lg:order-2">
          <span className="text-xs uppercase tracking-[0.3em] text-brand-blue">Invest with G-Paublo</span>
          <h2 className="font-display text-4xl md:text-5xl mt-3 text-balance text-brand-navy">
            Capital that builds. <em className="italic text-brand-blue">Returns</em> that endure.
          </h2>
          <p className="text-muted-foreground mt-6 leading-relaxed">
            Partner with us on residential and mixed-use developments across Lagos. Structured investment opportunities, transparent reporting, and asset-backed security from groundbreaking to handover.
          </p>
          <ul className="mt-8 space-y-4">
            {[
              "Project-backed equity & debt structures",
              "Quarterly investor reporting and site visits",
              "Exit strategies aligned with handover milestones",
              "Pre-launch unit allocation for early partners",
            ].map((b) => (
              <li key={b} className="flex items-start gap-3 text-foreground/80">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-blue shrink-0" />
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href={WHATSAPP} className="inline-flex items-center gap-3 bg-brand-navy hover:bg-brand-blue text-white px-7 py-4 rounded-full font-medium transition">
              Request investor pack <ArrowRight size={18} />
            </a>
            <a href={TEL} className="inline-flex items-center gap-3 border border-brand-navy/20 hover:border-brand-navy text-brand-navy px-7 py-4 rounded-full font-medium transition">
              <Phone size={16} /> Speak with our team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section id="visit" className="bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-brand-blue">Visit · Contact</span>
          <h2 className="font-display text-4xl md:text-5xl mt-3 text-balance text-brand-navy">
            Welcome home.
          </h2>
          <p className="text-muted-foreground mt-6 leading-relaxed">
            Visit our office, book a project walkthrough, or simply chat with our team about your next home or investment.
          </p>
          <dl className="mt-10 space-y-6">
            <div className="flex gap-4">
              <MapPin className="text-brand-blue shrink-0 mt-1" size={20} />
              <div>
                <dt className="font-medium text-brand-navy">Office</dt>
                <dd className="text-muted-foreground text-sm mt-1">{ADDRESS}</dd>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone className="text-brand-blue shrink-0 mt-1" size={20} />
              <div>
                <dt className="font-medium text-brand-navy">Phone & WhatsApp</dt>
                <dd className="text-muted-foreground text-sm mt-1"><a href={TEL} className="hover:text-brand-blue">{PHONE}</a></dd>
              </div>
            </div>
            <div className="flex gap-4">
              <Clock className="text-brand-blue shrink-0 mt-1" size={20} />
              <div>
                <dt className="font-medium text-brand-navy">Hours</dt>
                <dd className="text-muted-foreground text-sm mt-1">Monday – Saturday · 8:00 am – 6:00 pm</dd>
              </div>
            </div>
            <div className="flex gap-4">
              <Instagram className="text-brand-blue shrink-0 mt-1" size={20} />
              <div>
                <dt className="font-medium text-brand-navy">Follow</dt>
                <dd className="text-muted-foreground text-sm mt-1"><a href={INSTAGRAM} className="hover:text-brand-blue">@gpaublohomes</a></dd>
              </div>
            </div>
          </dl>
        </div>
        <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-border">
          <iframe
            title="G-Paublo Homes office location"
            src="https://www.google.com/maps?q=Orile+Iganmu+STI+Market+Lagos&output=embed"
            className="absolute inset-0 w-full h-full"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative bg-brand-navy text-white overflow-hidden">
      <div className="absolute inset-0 grain opacity-30" />
      <div className="relative mx-auto max-w-5xl px-6 py-24 md:py-32 text-center">
        <h2 className="font-display text-4xl md:text-6xl text-balance">
          Ready to write your <em className="italic text-brand-light">next chapter</em> at home?
        </h2>
        <p className="mt-6 text-white/80 max-w-xl mx-auto">
          Tour a current project, reserve a unit, or speak with our investment team. We'll handle every step from blueprint to key handover.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a href={WHATSAPP} className="inline-flex items-center gap-3 bg-white text-brand-navy px-7 py-4 rounded-full font-medium hover:bg-brand-light transition">
            Book a project tour <ArrowRight size={18} />
          </a>
          <a href={TEL} className="inline-flex items-center gap-3 border border-white/40 hover:border-white px-7 py-4 rounded-full font-medium transition">
            <Phone size={16} /> {PHONE}
          </a>
        </div>
      </div>
    </section>
  );
}

function WhyChoose() {
  const items = [
    { icon: Award, t: "Architectural Integrity", d: "Every line drawn with purpose. Premium materials and refined finishes that hold their value." },
    { icon: HardHat, t: "On-Time, On-Spec Delivery", d: "Disciplined construction management with regular site audits and 100% on-schedule handover." },
    { icon: Gem, t: "Investor-Grade Returns", d: "Locations and product mix engineered to appreciate, with transparent quarterly reporting." },
    { icon: HeartHandshake, t: "Lifetime Client Care", d: "After-sales support, snag resolution, and a relationship that endures beyond key handover." },
  ];
  return (
    <section id="why" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-[0.3em] text-brand-blue">Why choose G-Paublo</span>
        <h2 className="font-display text-4xl md:text-5xl mt-4 text-balance text-brand-navy">
          A standard set in <em className="italic text-brand-blue">stone</em>, steel, and trust.
        </h2>
        <p className="text-muted-foreground mt-6 leading-relaxed">
          Four principles guide every G-Paublo development — from the first sketch to the final keyhandover.
        </p>
      </div>
      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((it) => (
          <div key={it.t} className="group bg-secondary border border-border rounded-sm p-8 hover:border-brand-blue/40 hover:shadow-lg hover:shadow-brand-navy/5 transition">
            <div className="h-12 w-12 rounded-full bg-brand-light/60 text-brand-navy grid place-items-center group-hover:bg-brand-navy group-hover:text-white transition">
              <it.icon size={20} />
            </div>
            <h3 className="font-display text-xl mt-6 text-brand-navy">{it.t}</h3>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{it.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const quotes = [
    { q: "G-Paublo delivered our home on time and to spec. The finishing quality is honestly above what we expected at this price point in Lagos.", n: "Adaeze O.", r: "Homeowner · Paublo Heights" },
    { q: "Quarterly investor updates with site photos and milestone reports — finally a developer that treats capital with respect.", n: "Tunde A.", r: "Investor partner" },
    { q: "Customer service is excellent. They delivered the right materials on time, every time, throughout our redesign.", n: "Deborah O.", r: "Repeat client" },
  ];
  return (
    <section className="bg-brand-navy text-white py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 grain opacity-30" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.3em] text-brand-light">Client voices</span>
          <h2 className="font-display text-4xl md:text-5xl mt-3 text-balance">
            Trusted by homeowners and <em className="italic text-brand-light">investors</em> across Lagos.
          </h2>
        </div>
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {quotes.map((q) => (
            <figure key={q.n} className="border border-white/10 rounded-sm p-8 bg-white/[0.03] backdrop-blur">
              <Quote className="text-brand-light" size={28} />
              <blockquote className="mt-6 text-white/85 leading-relaxed">{q.q}</blockquote>
              <figcaption className="mt-8 pt-6 border-t border-white/10">
                <div className="font-display text-lg">{q.n}</div>
                <div className="text-xs text-white/60 mt-1">{q.r}</div>
                <div className="flex gap-0.5 mt-3 text-brand-light">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} fill="currentColor" />)}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-brand-navy text-white/70">
      <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-3 gap-10">
        <div>
          <img
            src={logoPrimary.url}
            alt="G-Paublo Homes Ltd"
            className="h-14 w-auto min-w-[120px] brightness-0 invert"
          />
          <p className="mt-6 text-sm leading-relaxed max-w-xs">
            G-Paublo Homes Ltd designs and develops residential and mixed-use spaces that elevate living standards and grow with your future.
          </p>
        </div>
        <div>
          <div className="text-white text-sm uppercase tracking-[0.2em]">Office</div>
          <p className="mt-4 text-sm leading-relaxed">{ADDRESS}</p>
        </div>
        <div>
          <div className="text-white text-sm uppercase tracking-[0.2em]">Contact</div>
          <a href={TEL} className="block mt-4 text-sm hover:text-brand-light">{PHONE}</a>
          <a href={WHATSAPP} className="block mt-2 text-sm hover:text-brand-light">WhatsApp us</a>
          <a href={INSTAGRAM} className="block mt-2 text-sm hover:text-brand-light">@gpaublohomes</a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 text-xs flex flex-wrap justify-between gap-3">
          <span>© {new Date().getFullYear()} G-Paublo Homes Ltd. All rights reserved.</span>
          <span>Crafted Living, Built for Legacy</span>
        </div>
      </div>
    </footer>
  );
}
