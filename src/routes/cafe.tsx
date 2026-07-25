import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Flame, Heart, Plus } from "lucide-react";
import heroCafe from "@/assets/hero-cafe.jpg";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/lib/store";
import { CAFE_MENU, CAFE_SECTIONS, fmtETB } from "@/data/catalog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cafe")({
  head: () => ({
    meta: [
      { title: "Café Menu | Centra Mart & Cafe, Ayat 49 Addis Ababa" },
      {
        name: "description",
        content:
          "Espresso, macchiato, breakfast, pizza, burgers, traditional Ethiopian dishes, juices and desserts at the Centra Mart café — dine in or delivered.",
      },
      { property: "og:title", content: "Café Menu | Centra Mart & Cafe" },
      { property: "og:description", content: "Coffee, breakfast, lunch and desserts at Ayat 49, Addis Ababa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Cafe,
});

function Cafe() {
  const { addCafeItem, wishlist, toggleWishlist } = useStore();
  const [section, setSection] = useState<string>("All");
  const items = section === "All" ? CAFE_MENU : CAFE_MENU.filter((i) => i.section === section);

  return (
    <div>
      <section className="relative overflow-hidden">
        <img src={heroCafe} width={1200} height={1200} alt="Café counter at Centra Mart" className="h-64 w-full object-cover sm:h-80" />
        <div className="absolute inset-0 bg-foreground/55" />
        <div className="absolute inset-0 mx-auto flex max-w-7xl flex-col justify-center px-4 text-background sm:px-6">
          <Badge className="gradient-gold w-fit text-gold-foreground">Café kitchen · 7:00 AM – 9:30 PM</Badge>
          <h1 className="mt-3 text-3xl font-bold text-primary-foreground sm:text-5xl">The Centra Café</h1>
          <p className="mt-2 max-w-xl text-sm text-primary-foreground/85">
            House-roasted Ethiopian coffee, full breakfasts, wood-fired pizza, traditional dishes and
            desserts — served in store or delivered hot.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap gap-2">
          {["All", ...CAFE_SECTIONS].map((s) => (
            <button
              key={s}
              onClick={() => setSection(s)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition",
                section === s ? "bg-primary text-primary-foreground" : "hover:bg-muted",
              )}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((i) => {
            const saved = wishlist.includes(`cafe-${i.id}`);
            return (
              <article key={i.id} className="card-lift flex gap-4 rounded-3xl border bg-card p-4">
                <div className="grid size-24 shrink-0 place-items-center rounded-2xl bg-primary-soft text-4xl">{i.emoji}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h2 className="truncate font-display font-semibold">{i.name}</h2>
                      <p className="truncate text-xs text-muted-foreground">{i.nameAm} · {i.section}</p>
                    </div>
                    <button aria-label="Save to favourites" onClick={() => toggleWishlist(`cafe-${i.id}`)}>
                      <Heart className={cn("size-5 transition-transform", saved && "scale-125 fill-destructive text-destructive")} />
                    </button>
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{i.ingredients}</p>
                  <div className="mt-2 flex flex-wrap gap-3 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="size-3" /> {i.minutes} min</span>
                    <span className="flex items-center gap-1"><Flame className="size-3" /> {i.calories} kcal</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span className="font-display text-lg font-bold text-primary">{fmtETB(i.price)}</span>
                    <Button size="sm" className="rounded-full" onClick={() => addCafeItem(i)}>
                      <Plus className="size-4" /> Order
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
