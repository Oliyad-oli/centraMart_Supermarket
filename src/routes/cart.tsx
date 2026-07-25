import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useStore, discountRate } from "@/lib/store";
import { fmtETB } from "@/data/catalog";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Basket | Centra Mart & Cafe" },
      { name: "description", content: "Review your Centra Mart groceries and café order before checkout, with delivery estimates for Addis Ababa." },
      { property: "og:title", content: "Your Basket | Centra Mart & Cafe" },
      { property: "og:description", content: "Review your groceries and café order." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, setQty, remove, subtotal, coupon } = useStore();
  const rate = discountRate(coupon);
  const deliveryFee = subtotal > 1500 || subtotal === 0 ? 0 : 100;
  const total = subtotal - subtotal * rate + deliveryFee;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">Your basket</h1>

      {lines.length === 0 ? (
        <div className="mt-10 grid place-items-center rounded-3xl border border-dashed p-16 text-center">
          <p className="font-medium">Nothing here yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Add groceries or café items to get started.</p>
          <Button asChild className="mt-6 rounded-full"><Link to="/shop">Browse the supermarket</Link></Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <ul className="space-y-3">
            {lines.map((l) => (
              <li key={l.id} className="flex gap-4 rounded-3xl border bg-card p-4">
                <span className="grid size-20 shrink-0 place-items-center rounded-2xl bg-primary-soft text-3xl">{l.emoji}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{l.name}</p>
                  <p className="text-xs text-muted-foreground">{l.meta}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <Button variant="outline" size="icon" className="size-8" aria-label="Decrease" onClick={() => setQty(l.id, l.qty - 1)}><Minus className="size-3" /></Button>
                    <span className="w-6 text-center text-sm">{l.qty}</span>
                    <Button variant="outline" size="icon" className="size-8" aria-label="Increase" onClick={() => setQty(l.id, l.qty + 1)}><Plus className="size-3" /></Button>
                    <Button variant="ghost" size="icon" className="ml-2 size-8" aria-label="Remove" onClick={() => remove(l.id)}><Trash2 className="size-4" /></Button>
                  </div>
                </div>
                <span className="font-semibold text-primary">{fmtETB(l.price * l.qty)}</span>
              </li>
            ))}
          </ul>

          <aside className="h-fit rounded-3xl border bg-card p-6 lg:sticky lg:top-32">
            <h2 className="font-display text-lg font-semibold">Order summary</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{fmtETB(subtotal)}</span></div>
              {rate > 0 && <div className="flex justify-between text-primary"><span>Coupon {coupon}</span><span>−{fmtETB(subtotal * rate)}</span></div>}
              <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>{deliveryFee === 0 ? "Free" : fmtETB(deliveryFee)}</span></div>
              <Separator className="my-2" />
              <div className="flex justify-between text-base font-semibold"><span>Total</span><span>{fmtETB(total)}</span></div>
              <p className="pt-1 text-xs text-muted-foreground">Estimated delivery 45–90 minutes in Addis Ababa.</p>
            </div>
            <Button asChild size="lg" className="mt-5 w-full rounded-full"><Link to="/checkout">Proceed to checkout</Link></Button>
            <Button asChild variant="ghost" className="mt-2 w-full"><Link to="/shop">Continue shopping</Link></Button>
          </aside>
        </div>
      )}
    </div>
  );
}
