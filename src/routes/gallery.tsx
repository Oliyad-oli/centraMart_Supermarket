import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import storeFront from "@/assets/store-front.jpg";
import heroGrocery from "@/assets/hero-grocery.jpg";
import heroCafe from "@/assets/hero-cafe.jpg";
import delivery from "@/assets/delivery.jpg";
import { GALLERY } from "@/data/catalog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | Inside Centra Mart & Cafe, Addis Ababa" },
      { name: "description", content: "Photos of the Centra Mart supermarket floor, café, bakery, butchery, delivery team and events at Ayat 49, Addis Ababa." },
      { property: "og:title", content: "Gallery | Centra Mart & Cafe" },
      { property: "og:description", content: "Inside our supermarket and café at Ayat 49." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Gallery,
});

const TAGS = ["All", "Store", "Café", "Products", "Events", "Delivery", "Team"];

function Gallery() {
  const [tag, setTag] = useState("All");
  const items = tag === "All" ? GALLERY : GALLERY.filter((g) => g.tag === tag);
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">Gallery</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[[storeFront, "Storefront at dusk"], [heroGrocery, "Produce aisle"], [heroCafe, "Café counter"], [delivery, "Delivery rider"]].map(([src, alt]) => (
          <img key={alt as string} src={src as string} loading="lazy" alt={alt as string} className="card-lift h-48 w-full rounded-3xl object-cover" />
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-2">
        {TAGS.map((t) => (
          <button
            key={t}
            onClick={() => setTag(t)}
            className={cn("rounded-full border px-4 py-2 text-sm", tag === t ? "bg-primary text-primary-foreground" : "hover:bg-muted")}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {items.map((g) => (
          <figure key={g.title} className="card-lift grid aspect-[4/3] place-items-center rounded-3xl border bg-primary-soft">
            <span className="text-5xl" aria-hidden>{g.emoji}</span>
            <figcaption className="px-3 text-center text-xs text-muted-foreground">{g.title} · {g.tag}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
