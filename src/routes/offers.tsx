import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/site/ProductCard";
import { PRODUCTS } from "@/data/catalog";

export const Route = createFileRoute("/offers")({
  head: () => ({
    meta: [
      { title: "Today's Deals & Offers | Centra Mart & Cafe" },
      { name: "description", content: "Flash sales, weekend grocery deals, buy one get one offers and seasonal discounts at Centra Mart & Cafe, Ayat 49, Addis Ababa." },
      { property: "og:title", content: "Offers | Centra Mart & Cafe" },
      { property: "og:description", content: "Weekend deals and flash sales on groceries in Addis Ababa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Offers,
});

function useCountdown() {
  const [left, setLeft] = useState("00:00:00");
  useEffect(() => {
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    const tick = () => {
      const d = Math.max(0, end.getTime() - Date.now());
      const p = (n: number) => String(n).padStart(2, "0");
      setLeft(`${p(Math.floor(d / 3.6e6))}:${p(Math.floor((d % 3.6e6) / 6e4))}:${p(Math.floor((d % 6e4) / 1000))}`);
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);
  return left;
}

function Offers() {
  const left = useCountdown();
  const deals = PRODUCTS.filter((p) => p.oldPrice);
  const bogo = PRODUCTS.filter((p) => p.tags.includes("best-seller")).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="gradient-hero flex flex-col gap-4 rounded-[2rem] p-8 text-primary-foreground sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Badge className="gradient-gold text-gold-foreground">Flash sale</Badge>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Today's deals</h1>
          <p className="mt-2 text-sm opacity-90">Prices drop back at midnight. Free delivery above 1,500 ETB.</p>
        </div>
        <div className="rounded-3xl bg-primary-foreground/15 px-6 py-4 text-center backdrop-blur">
          <p className="font-display text-3xl font-bold tabular-nums">{left}</p>
          <p className="text-xs opacity-80">until the sale ends</p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">Discounted products</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {deals.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="mt-14 grid gap-4 sm:grid-cols-3">
        {[
          { t: "Buy one get one", d: "On selected bakery items every Saturday.", e: "🥐" },
          { t: "Family shopping package", d: "Rice, oil, sugar and lentils bundled at 12% off.", e: "👨‍👩‍👧" },
          { t: "Coffee & breakfast special", d: "20% off café breakfast before 10 AM.", e: "☕" },
        ].map((o) => (
          <div key={o.t} className="card-lift rounded-3xl border bg-card p-6">
            <span className="text-4xl">{o.e}</span>
            <h3 className="mt-3 font-display text-lg font-semibold">{o.t}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{o.d}</p>
          </div>
        ))}
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-bold">Weekend specials</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {bogo.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
