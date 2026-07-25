import { createFileRoute, Link } from "@tanstack/react-router";
import { CATEGORIES, PRODUCTS } from "@/data/catalog";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories | Centra Mart & Cafe Supermarket" },
      { name: "description", content: "Browse every Centra Mart category: produce, meat, seafood, dairy, bakery, spices, imported foods, frozen, household and personal care." },
      { property: "og:title", content: "Categories | Centra Mart & Cafe" },
      { property: "og:description", content: "All supermarket categories at Centra Mart, Ayat 49, Addis Ababa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Categories,
});

function Categories() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">Shop by category</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Fifteen departments, restocked daily at Ayat 49 and delivered across Addis Ababa.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((c) => {
          const count = c.slug === "special-offers"
            ? PRODUCTS.filter((p) => p.oldPrice).length
            : PRODUCTS.filter((p) => p.category === c.slug).length;
          return (
            <Link
              key={c.slug}
              to="/shop"
              search={{ category: c.slug }}
              className="card-lift flex items-center gap-4 rounded-3xl border bg-card p-6"
            >
              <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-primary-soft text-3xl">{c.emoji}</span>
              <span className="min-w-0">
                <span className="block font-display text-lg font-semibold">{c.name}</span>
                <span className="block text-sm text-muted-foreground">{c.nameAm}</span>
                <span className="block text-xs text-primary">{count} products</span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
