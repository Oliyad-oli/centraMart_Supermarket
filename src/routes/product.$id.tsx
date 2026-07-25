import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, Minus, Plus, Share2, Truck, ShieldCheck, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard, Stars } from "@/components/site/ProductCard";
import { PRODUCTS, categoryName, fmtETB } from "@/data/catalog";
import { useStore } from "@/lib/store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = PRODUCTS.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Product not found | Centra Mart & Cafe" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const p = loaderData.product;
    return {
      meta: [
        { title: `${p.name} — ${fmtETB(p.price)} | Centra Mart & Cafe` },
        { name: "description", content: p.description },
        { property: "og:title", content: `${p.name} | Centra Mart & Cafe` },
        { property: "og:description", content: p.description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-2xl font-bold">Product not found</h1>
      <p className="mt-2 text-sm text-muted-foreground">This item may have sold out or been renamed.</p>
      <Button asChild className="mt-6 rounded-full"><Link to="/shop">Back to the shop</Link></Button>
    </div>
  ),
  component: ProductDetail,
});

const REVIEWS = [
  { name: "Meron A.", rating: 5, text: "Arrived fresh and well packed. Exactly what I ordered." },
  { name: "Kalkidan T.", rating: 5, text: "Great value and the delivery rider was on time." },
  { name: "Samuel G.", rating: 4, text: "Good quality overall, I will order again next week." },
];

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { addProduct, wishlist, toggleWishlist, markViewed } = useStore();
  const [qty, setQty] = useState(1);
  const [zoom, setZoom] = useState(false);
  const saved = wishlist.includes(product.id);
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  useEffect(() => {
    markViewed(product.id);
    setQty(1);
  }, [product.id, markViewed]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <nav className="flex items-center gap-1 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="size-3" />
        <Link to="/shop" className="hover:text-primary">Shop</Link>
        <ChevronRight className="size-3" />
        <span className="truncate">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div>
          <div
            className="grid aspect-square place-items-center overflow-hidden rounded-[2rem] bg-primary-soft"
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => setZoom(false)}
          >
            <span className={cn("text-[10rem] transition-transform duration-500", zoom && "scale-125")} aria-hidden>
              {product.emoji}
            </span>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {[product.emoji, "📦", "🏷️", "🛵"].map((e, i) => (
              <div key={i} className="grid aspect-square place-items-center rounded-2xl border bg-card text-3xl">{e}</div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-primary">{categoryName(product.category)}</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{product.name}</h1>
          <p className="text-sm text-muted-foreground">{product.nameAm} · {product.brand}</p>

          <div className="mt-3 flex items-center gap-2">
            <Stars rating={product.rating} />
            <span className="text-sm text-muted-foreground">{product.rating} · {product.reviews} reviews</span>
          </div>

          <div className="mt-5 flex items-end gap-3">
            <span className="font-display text-3xl font-bold text-primary">{fmtETB(product.price)}</span>
            {product.oldPrice && (
              <>
                <span className="text-lg text-muted-foreground line-through">{fmtETB(product.oldPrice)}</span>
                <Badge className="bg-destructive text-destructive-foreground">
                  Save {fmtETB(product.oldPrice - product.price)}
                </Badge>
              </>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{product.unit}</p>

          <p className="mt-5 text-sm text-muted-foreground">{product.description}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-3 rounded-full border p-1">
              <Button variant="ghost" size="icon" className="size-9 rounded-full" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                <Minus className="size-4" />
              </Button>
              <span className="w-6 text-center font-medium">{qty}</span>
              <Button variant="ghost" size="icon" className="size-9 rounded-full" aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)}>
                <Plus className="size-4" />
              </Button>
            </div>
            <Button size="lg" className="rounded-full" disabled={product.stock === "out"} onClick={() => addProduct(product, qty)}>
              Add to cart · {fmtETB(product.price * qty)}
            </Button>
            <Button variant="outline" size="icon" className="size-11 rounded-full" aria-label="Wishlist" onClick={() => toggleWishlist(product.id)}>
              <Heart className={cn("size-5", saved && "fill-destructive text-destructive")} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-11 rounded-full"
              aria-label="Share"
              onClick={() => toast.success("Product link copied", { description: "Share it on Telegram or WhatsApp." })}
            >
              <Share2 className="size-5" />
            </Button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="flex gap-3 rounded-2xl border p-4">
              <Truck className="size-5 shrink-0 text-primary" />
              <p className="text-xs text-muted-foreground">Same-day delivery in Addis Ababa. Free above 1,500 ETB.</p>
            </div>
            <div className="flex gap-3 rounded-2xl border p-4">
              <ShieldCheck className="size-5 shrink-0 text-primary" />
              <p className="text-xs text-muted-foreground">Freshness guaranteed or we replace it, no questions asked.</p>
            </div>
          </div>

          <Tabs defaultValue="details" className="mt-8">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="pt-4 text-sm text-muted-foreground">
              <ul className="space-y-1">
                <li>Brand: {product.brand}</li>
                <li>Unit: {product.unit}</li>
                <li>Category: {categoryName(product.category)}</li>
                <li>Availability: {product.stock === "out" ? "Out of stock" : product.stock === "low" ? "Low stock" : "In stock"}</li>
                <li>Origin: Sourced for Centra Mart, Ayat 49, Addis Ababa</li>
              </ul>
            </TabsContent>
            <TabsContent value="nutrition" className="pt-4 text-sm text-muted-foreground">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[["Energy", "182 kcal"], ["Protein", "6 g"], ["Carbs", "21 g"], ["Fat", "7 g"]].map(([k, v]) => (
                  <div key={k} className="rounded-2xl border p-3 text-center">
                    <p className="font-display text-lg font-semibold text-foreground">{v}</p>
                    <p className="text-xs">{k}</p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs">Indicative values per 100 g. Demonstration data only.</p>
            </TabsContent>
            <TabsContent value="reviews" className="space-y-3 pt-4">
              {REVIEWS.map((r) => (
                <div key={r.name} className="rounded-2xl border p-4">
                  <div className="flex items-center gap-2">
                    <span className="grid size-8 place-items-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
                      {r.name.charAt(0)}
                    </span>
                    <span className="text-sm font-medium">{r.name}</span>
                    <Stars rating={r.rating} className="ml-auto" />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{r.text}</p>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold">You may also like</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
