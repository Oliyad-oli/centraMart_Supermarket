import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Truck, Clock, Leaf, ShieldCheck, Coffee, Star } from "lucide-react";
import heroGrocery from "@/assets/hero-grocery.jpg";
import heroCafe from "@/assets/hero-cafe.jpg";
import delivery from "@/assets/delivery.jpg";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/site/Chrome";
import { ProductCard, Stars } from "@/components/site/ProductCard";
import { CATEGORIES, PRODUCTS, CAFE_MENU, TESTIMONIALS, GALLERY, fmtETB, BUSINESS } from "@/data/catalog";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Centra Mart & Cafe | Supermarket & Café Delivery in Addis Ababa" },
      {
        name: "description",
        content:
          "Shop fresh produce, meat, dairy, imported goods and Ethiopian staples from Centra Mart & Cafe at Ayat 49, Addis Ababa — plus a full café menu with same-day delivery.",
      },
      { property: "og:title", content: "Centra Mart & Cafe | Supermarket & Café in Addis Ababa" },
      {
        property: "og:description",
        content: "Premium groceries and café favourites delivered across Addis Ababa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / 1400, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <span>{n.toLocaleString()}{suffix}</span>;
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="gradient-hero absolute inset-0" />
      <div className="absolute -left-24 top-10 size-72 rounded-full bg-gold/20 blur-3xl float-soft" />
      <div className="absolute -right-16 bottom-0 size-80 rounded-full bg-accent/20 blur-3xl float-soft" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 text-primary-foreground sm:px-6 lg:grid-cols-2 lg:py-24">
        <div className="reveal">
          <Badge className="gradient-gold text-gold-foreground">Ayat 49 · Zemer Building (Bright Gym)</Badge>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
            Your supermarket <span className="text-gradient-gold">and café</span>, now one tap away.
          </h1>
          <p className="mt-5 max-w-xl text-base opacity-90">
            {BUSINESS.name} brings fresh produce, butchery, bakery, imported goods and Ethiopian
            staples together with a full café kitchen — delivered same day across Addis Ababa.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="gradient-gold rounded-full text-gold-foreground hover:opacity-90">
              <Link to="/shop">Shop now <ArrowRight className="size-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="rounded-full">
              <Link to="/cafe">Order coffee</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="rounded-full text-primary-foreground hover:bg-primary-foreground/15">
              <Link to="/categories">Explore products</Link>
            </Button>
          </div>
          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4">
            {[
              { k: "Products in store", v: 4200, s: "+" },
              { k: "Orders delivered", v: 18500, s: "+" },
              { k: "Satisfaction", v: 98, s: "%" },
            ].map((s) => (
              <div key={s.k}>
                <dt className="font-display text-2xl font-bold sm:text-3xl">
                  <Counter to={s.v} suffix={s.s} />
                </dt>
                <dd className="text-xs opacity-80">{s.k}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative grid gap-4 sm:grid-cols-2">
          <img
            src={heroGrocery}
            width={1600}
            height={1200}
            alt="Fresh produce aisle inside Centra Mart supermarket"
            className="h-64 w-full rounded-3xl object-cover shadow-lift sm:h-full sm:row-span-2"
          />
          <img
            src={heroCafe}
            width={1200}
            height={1200}
            loading="lazy"
            alt="Latte and Ethiopian coffee beans at the Centra café"
            className="h-40 w-full rounded-3xl object-cover shadow-lift sm:h-56"
          />
          <div className="glass float-soft rounded-3xl p-5 text-foreground">
            <Truck className="size-6 text-primary" />
            <p className="mt-2 font-display font-semibold">Same-day delivery</p>
            <p className="text-xs text-muted-foreground">Across Addis Ababa in 45–90 minutes, free above 1,500 ETB.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Countdown() {
  const [left, setLeft] = useState({ h: 0, m: 0, s: 0 });
  useEffect(() => {
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    const tick = () => {
      const d = Math.max(0, end.getTime() - Date.now());
      setLeft({
        h: Math.floor(d / 3.6e6),
        m: Math.floor((d % 3.6e6) / 6e4),
        s: Math.floor((d % 6e4) / 1000),
      });
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="flex gap-2">
      {[
        ["Hours", left.h],
        ["Min", left.m],
        ["Sec", left.s],
      ].map(([label, v]) => (
        <div key={label as string} className="rounded-2xl bg-card px-3 py-2 text-center shadow-soft">
          <p className="font-display text-xl font-bold text-primary">{String(v).padStart(2, "0")}</p>
          <p className="text-[10px] uppercase text-muted-foreground">{label}</p>
        </div>
      ))}
    </div>
  );
}

function Home() {
  const { recentlyViewed } = useStore();
  const deals = PRODUCTS.filter((p) => p.oldPrice).slice(0, 4);
  const bestSellers = PRODUCTS.filter((p) => p.tags.includes("best-seller")).slice(0, 8);
  const newArrivals = PRODUCTS.filter((p) => p.tags.includes("new")).slice(0, 4);

  return (
    <>
      <Hero />

      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {[
          { icon: Truck, t: "Same-day delivery", d: "Fast local delivery across Addis Ababa" },
          { icon: Leaf, t: "Fresh guaranteed", d: "Produce restocked every single morning" },
          { icon: Clock, t: "Scheduled & pickup", d: "Pick a window or collect in store" },
          { icon: ShieldCheck, t: "Quality checked", d: "Every order inspected before dispatch" },
        ].map((f) => (
          <div key={f.t} className="card-lift rounded-3xl border bg-card p-5">
            <f.icon className="size-6 text-primary" />
            <p className="mt-3 font-display font-semibold">{f.t}</p>
            <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
          </div>
        ))}
      </div>

      <Section
        eyebrow="Shop by category"
        title="Everything for the week, in one place"
        subtitle="From Rift Valley vegetables to imported chocolate and Ethiopian spices."
        action={
          <Button asChild variant="ghost" className="hidden shrink-0 sm:inline-flex">
            <Link to="/categories">All categories <ArrowRight className="size-4" /></Link>
          </Button>
        }
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to="/shop"
              search={{ category: c.slug }}
              className="card-lift group rounded-3xl border bg-card p-5 text-center"
            >
              <span className="block text-3xl transition-transform duration-300 group-hover:scale-125">{c.emoji}</span>
              <span className="mt-2 block text-sm font-medium">{c.name}</span>
              <span className="block text-[11px] text-muted-foreground">{c.nameAm}</span>
            </Link>
          ))}
        </div>
      </Section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-6 rounded-[2rem] border bg-secondary/60 p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <Badge className="bg-destructive text-destructive-foreground">Today's deals</Badge>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Flash sale ends at midnight</h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Weekend grocery deals on oil, rice, coffee and fresh produce. Buy more, save more.
            </p>
          </div>
          <Countdown />
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {deals.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <Section
        eyebrow="Best sellers"
        title="What Ayat is buying this week"
        action={
          <Button asChild variant="ghost" className="hidden shrink-0 sm:inline-flex">
            <Link to="/shop">Shop all <ArrowRight className="size-4" /></Link>
          </Button>
        }
      >
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {bestSellers.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </Section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="gradient-hero relative overflow-hidden rounded-[2rem] p-6 text-primary-foreground sm:p-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <Coffee className="size-8" />
              <h2 className="mt-4 text-2xl font-bold sm:text-3xl">The café at Centra Mart</h2>
              <p className="mt-2 max-w-lg text-sm opacity-90">
                Espresso from our own roastery, full breakfasts, pizza, burgers, traditional dishes and
                the Ethiopian coffee ceremony — dine in or delivered hot.
              </p>
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {CAFE_MENU.slice(0, 4).map((i) => (
                  <div key={i.id} className="glass flex items-center gap-3 rounded-2xl p-3 text-foreground">
                    <span className="text-2xl">{i.emoji}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">{i.name}</span>
                      <span className="block text-xs text-muted-foreground">{i.minutes} min · {i.calories} kcal</span>
                    </span>
                    <span className="text-sm font-semibold text-primary">{fmtETB(i.price)}</span>
                  </div>
                ))}
              </div>
              <Button asChild size="lg" className="gradient-gold mt-6 rounded-full text-gold-foreground">
                <Link to="/cafe">See the full café menu</Link>
              </Button>
            </div>
            <img
              src={heroCafe}
              width={1200}
              height={1200}
              loading="lazy"
              alt="Freshly poured latte at the Centra Mart café"
              className="h-64 w-full rounded-3xl object-cover shadow-lift lg:h-96"
            />
          </div>
        </div>
      </section>

      <Section eyebrow="New arrivals" title="Just landed on our shelves">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {newArrivals.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </Section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid overflow-hidden rounded-[2rem] border bg-card lg:grid-cols-2">
          <img
            src={delivery}
            width={1200}
            height={800}
            loading="lazy"
            alt="Centra Mart delivery rider on an Addis Ababa street"
            className="h-64 w-full object-cover lg:h-full"
          />
          <div className="p-6 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Delivery workflow</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">From our shelf to your kitchen</h2>
            <ol className="mt-6 space-y-5">
              {[
                ["Order placed", "Choose groceries and café items, pick a delivery window."],
                ["Picked & checked", "Our floor team hand-picks and quality checks every item."],
                ["Out for delivery", "A rider leaves Ayat 49 with your insulated order."],
                ["Delivered", "Pay on delivery or with Telebirr, CBE Birr or Chapa."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-medium">{t}</span>
                    <span className="block text-sm text-muted-foreground">{d}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {recentlyViewed.length > 0 && (
        <Section eyebrow="Recently viewed" title="Pick up where you left off">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {recentlyViewed
              .map((id) => PRODUCTS.find((p) => p.id === id))
              .filter((p): p is (typeof PRODUCTS)[number] => Boolean(p))
              .slice(0, 4)
              .map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </Section>
      )}

      <Section eyebrow="Testimonials" title="Trusted by families, cafés and hotels">
        <div className="grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.slice(0, 3).map((t) => (
            <figure key={t.name} className="card-lift rounded-3xl border bg-card p-6">
              <Stars rating={t.rating} />
              <blockquote className="mt-3 text-sm text-muted-foreground">"{t.quote}"</blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-primary-soft font-semibold text-primary">
                  {t.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-medium">{t.name}</span>
                  <span className="block text-xs text-muted-foreground">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/testimonials">Read all reviews <Star className="size-4" /></Link>
          </Button>
        </div>
      </Section>

      <Section eyebrow="Store gallery" title="Inside Centra Mart & Cafe" action={
        <Button asChild variant="ghost" className="hidden shrink-0 sm:inline-flex">
          <Link to="/gallery">Open gallery <ArrowRight className="size-4" /></Link>
        </Button>
      }>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {GALLERY.slice(0, 6).map((g) => (
            <div key={g.title} className="card-lift grid aspect-square place-items-center rounded-3xl bg-primary-soft text-4xl">
              <span aria-hidden>{g.emoji}</span>
              <span className="px-2 text-center text-[11px] text-muted-foreground">{g.title}</span>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
