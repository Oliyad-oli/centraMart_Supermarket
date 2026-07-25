import { Link } from "@tanstack/react-router";
import { Heart, Eye, Plus, Star, Truck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useStore } from "@/lib/store";
import { categoryName, fmtETB, type Product } from "@/data/catalog";
import { cn } from "@/lib/utils";

export function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={cn("flex items-center gap-0.5", className)} aria-label={`Rated ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn("size-3.5", i <= Math.round(rating) ? "fill-gold text-gold" : "text-muted-foreground/40")}
        />
      ))}
    </span>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { addProduct, wishlist, toggleWishlist } = useStore();
  const [quick, setQuick] = useState(false);
  const saved = wishlist.includes(product.id);
  const off = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;

  return (
    <>
      <article className="card-lift group relative flex flex-col overflow-hidden rounded-3xl border bg-card">
        <div className="relative aspect-[4/3] overflow-hidden bg-primary-soft">
          <Link
            to="/product/$id"
            params={{ id: product.id }}
            className="grid h-full place-items-center text-6xl transition-transform duration-500 group-hover:scale-110"
          >
            <span aria-hidden>{product.emoji}</span>
            <span className="sr-only">{product.name}</span>
          </Link>
          <div className="absolute left-3 top-3 flex flex-col gap-1">
            {off > 0 && <Badge className="bg-destructive text-destructive-foreground">−{off}%</Badge>}
            {product.tags.includes("new") && <Badge className="gradient-gold text-gold-foreground">New</Badge>}
            {product.tags.includes("best-seller") && <Badge variant="secondary">Best seller</Badge>}
          </div>
          <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
            <Button
              size="icon"
              variant="secondary"
              className="size-9 rounded-full"
              aria-label="Add to wishlist"
              onClick={() => toggleWishlist(product.id)}
            >
              <Heart className={cn("size-4 transition-transform", saved && "scale-125 fill-destructive text-destructive")} />
            </Button>
            <Button size="icon" variant="secondary" className="size-9 rounded-full" aria-label="Quick view" onClick={() => setQuick(true)}>
              <Eye className="size-4" />
            </Button>
          </div>
          <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-card/85 px-2 py-1 text-[10px] font-medium backdrop-blur">
            <Truck className="size-3 text-primary" /> Delivery available
          </span>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{categoryName(product.category)}</p>
          <Link to="/product/$id" params={{ id: product.id }} className="mt-1 line-clamp-1 font-display font-semibold hover:text-primary">
            {product.name}
          </Link>
          <p className="line-clamp-1 text-xs text-muted-foreground">{product.nameAm}</p>
          <div className="mt-2 flex items-center gap-2">
            <Stars rating={product.rating} />
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>
          <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{product.description}</p>

          <div className="mt-3 flex items-end justify-between gap-2">
            <div className="min-w-0">
              <p className="font-display text-lg font-bold text-primary">{fmtETB(product.price)}</p>
              {product.oldPrice && (
                <p className="text-xs text-muted-foreground line-through">{fmtETB(product.oldPrice)}</p>
              )}
              <p className="text-[11px] text-muted-foreground">{product.unit}</p>
            </div>
            <Button
              size="icon"
              className="size-10 shrink-0 rounded-full"
              aria-label={`Add ${product.name} to cart`}
              disabled={product.stock === "out"}
              onClick={() => addProduct(product)}
            >
              <Plus className="size-5" />
            </Button>
          </div>
          <p className={cn("mt-2 text-[11px] font-medium", product.stock === "out" ? "text-destructive" : product.stock === "low" ? "text-accent" : "text-primary")}>
            {product.stock === "out" ? "Out of stock" : product.stock === "low" ? "Only a few left today" : "In stock"}
          </p>
        </div>
      </article>

      <Dialog open={quick} onOpenChange={setQuick}>
        <DialogContent className="max-w-lg rounded-3xl">
          <DialogTitle className="font-display text-xl">{product.name}</DialogTitle>
          <div className="grid gap-4 sm:grid-cols-[140px_1fr]">
            <div className="grid aspect-square place-items-center rounded-2xl bg-primary-soft text-6xl">{product.emoji}</div>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">{product.description}</p>
              <p><span className="text-muted-foreground">Brand:</span> {product.brand}</p>
              <p><span className="text-muted-foreground">Unit:</span> {product.unit}</p>
              <Stars rating={product.rating} />
              <p className="font-display text-xl font-bold text-primary">{fmtETB(product.price)}</p>
              <div className="flex gap-2 pt-1">
                <Button onClick={() => { addProduct(product); setQuick(false); }} disabled={product.stock === "out"}>
                  Add to cart
                </Button>
                <Button variant="outline" asChild onClick={() => setQuick(false)}>
                  <Link to="/product/$id" params={{ id: product.id }}>Full details</Link>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function ProductSkeleton() {
  return <div className="shimmer h-80 rounded-3xl" />;
}
