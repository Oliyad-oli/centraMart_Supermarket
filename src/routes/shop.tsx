import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductCard } from "@/components/site/ProductCard";
import { CATEGORIES, PRODUCTS, categoryName } from "@/data/catalog";
import { cn } from "@/lib/utils";

type ShopSearch = { category?: string };

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    category: typeof search.category === "string" ? search.category : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Supermarket | Centra Mart & Cafe Addis Ababa" },
      {
        name: "description",
        content:
          "Browse the Centra Mart supermarket: fresh vegetables, fruits, meat, seafood, dairy, bakery, spices, imported foods and household essentials with ETB pricing.",
      },
      { property: "og:title", content: "Supermarket | Centra Mart & Cafe" },
      { property: "og:description", content: "Fresh groceries and imported goods delivered in Addis Ababa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});

const BRANDS = Array.from(new Set(PRODUCTS.map((p) => p.brand))).sort();

function Shop() {
  const { category } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [q, setQ] = useState("");
  const [maxPrice, setMaxPrice] = useState(1300);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [brands, setBrands] = useState<string[]>([]);
  const [sort, setSort] = useState("popular");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      if (category && category !== "special-offers" && p.category !== category) return false;
      if (category === "special-offers" && !p.oldPrice) return false;
      if (q && !(p.name + p.nameAm + p.brand + p.description).toLowerCase().includes(q.toLowerCase())) return false;
      if (p.price > maxPrice) return false;
      if (p.rating < minRating) return false;
      if (inStockOnly && p.stock === "out") return false;
      if (brands.length && !brands.includes(p.brand)) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "newest") return Number(b.tags.includes("new")) - Number(a.tags.includes("new"));
      if (sort === "discount") {
        const d = (p: (typeof PRODUCTS)[number]) => (p.oldPrice ? 1 - p.price / p.oldPrice : 0);
        return d(b) - d(a);
      }
      return b.reviews - a.reviews;
    });
    return list;
  }, [category, q, maxPrice, minRating, inStockOnly, brands, sort]);

  const setCategory = (slug?: string) =>
    navigate({ search: slug ? { category: slug } : {} });

  const filters = (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-semibold">Categories</p>
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => setCategory(undefined)}
              className={cn("w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-muted", !category && "bg-primary-soft font-medium text-primary")}
            >
              All products
            </button>
          </li>
          {CATEGORIES.map((c) => (
            <li key={c.slug}>
              <button
                onClick={() => setCategory(c.slug)}
                className={cn(
                  "w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-muted",
                  category === c.slug && "bg-primary-soft font-medium text-primary",
                )}
              >
                {c.emoji} {c.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="mb-3 text-sm font-semibold">Max price · {maxPrice} ETB</p>
        <Slider value={[maxPrice]} min={50} max={1300} step={10} onValueChange={(v) => setMaxPrice(v[0])} />
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold">Minimum rating</p>
        <div className="flex flex-wrap gap-2">
          {[0, 4, 4.5, 4.8].map((r) => (
            <Button key={r} size="sm" variant={minRating === r ? "default" : "outline"} className="rounded-full" onClick={() => setMinRating(r)}>
              {r === 0 ? "Any" : `${r}+`}
            </Button>
          ))}
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <Checkbox checked={inStockOnly} onCheckedChange={(v) => setInStockOnly(Boolean(v))} />
        In stock only
      </label>

      <div>
        <p className="mb-2 text-sm font-semibold">Brands</p>
        <div className="max-h-52 space-y-2 overflow-y-auto pr-1">
          {BRANDS.map((b) => (
            <label key={b} className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={brands.includes(b)}
                onCheckedChange={(v) =>
                  setBrands((prev) => (v ? [...prev, b] : prev.filter((x) => x !== b)))
                }
              />
              {b}
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">Supermarket</p>
        <h1 className="mt-1 text-3xl font-bold sm:text-4xl">
          {category ? categoryName(category) : "Shop everything"}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {results.length} products available today at Ayat 49 with same-day delivery across Addis Ababa.
        </p>
      </header>

      <div className="mb-6 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products…"
            aria-label="Search products"
            className="h-12 rounded-full pl-11 transition focus-visible:shadow-soft"
          />
        </div>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="h-12 rounded-full sm:w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Most popular</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="discount">Biggest discount</SelectItem>
            <SelectItem value="price-asc">Price: low to high</SelectItem>
            <SelectItem value="price-desc">Price: high to low</SelectItem>
            <SelectItem value="rating">Top rated</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="h-12 rounded-full lg:hidden" onClick={() => setFiltersOpen((v) => !v)}>
          <SlidersHorizontal className="size-4" /> Filters
        </Button>
      </div>

      {category && (
        <Badge variant="secondary" className="mb-4 cursor-pointer" onClick={() => setCategory(undefined)}>
          {categoryName(category)} ✕
        </Badge>
      )}

      <div className="grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <aside className={cn("rounded-3xl border bg-card p-5 lg:sticky lg:top-32 lg:block lg:h-fit", filtersOpen ? "block" : "hidden")}>
          {filters}
        </aside>

        <div>
          {results.length === 0 ? (
            <div className="grid place-items-center rounded-3xl border border-dashed p-16 text-center">
              <p className="font-medium">No products match these filters</p>
              <p className="mt-1 text-sm text-muted-foreground">Try widening the price range or clearing brands.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
              {results.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
