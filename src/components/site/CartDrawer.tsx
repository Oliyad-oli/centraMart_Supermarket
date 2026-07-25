import { Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, Truck, ShoppingBag, TicketPercent } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useStore, discountRate } from "@/lib/store";
import { fmtETB } from "@/data/catalog";

export function CartDrawer() {
  const { cartOpen, setCartOpen, lines, setQty, remove, subtotal, coupon, applyCoupon } = useStore();
  const [code, setCode] = useState("");
  const rate = discountRate(coupon);
  const delivery = subtotal > 1500 || subtotal === 0 ? 0 : 100;
  const total = subtotal - subtotal * rate + delivery;

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className="flex w-full max-w-md flex-col gap-0 p-0 sm:w-[26rem]">
        <div className="border-b p-5">
          <SheetTitle className="font-display text-lg">Your basket</SheetTitle>
          <p className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
            <Truck className="size-4 text-primary" /> Same-day delivery in Addis Ababa · 45–90 min
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {lines.length === 0 ? (
            <div className="grid place-items-center gap-3 py-20 text-center">
              <span className="grid size-16 place-items-center rounded-full bg-primary-soft">
                <ShoppingBag className="size-7 text-primary" />
              </span>
              <p className="font-medium">Your basket is empty</p>
              <p className="text-sm text-muted-foreground">Fresh produce, café orders and imported goods are a tap away.</p>
              <Button asChild onClick={() => setCartOpen(false)}>
                <Link to="/shop">Start shopping</Link>
              </Button>
            </div>
          ) : (
            <ul className="space-y-3">
              {lines.map((l) => (
                <li key={l.id} className="reveal flex gap-3 rounded-2xl border p-3">
                  <span className="grid size-14 shrink-0 place-items-center rounded-xl bg-primary-soft text-2xl">
                    {l.emoji}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{l.name}</p>
                    <p className="text-xs text-muted-foreground">{l.meta}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Button variant="outline" size="icon" className="size-7" aria-label="Decrease" onClick={() => setQty(l.id, l.qty - 1)}>
                        <Minus className="size-3" />
                      </Button>
                      <span className="w-6 text-center text-sm font-medium">{l.qty}</span>
                      <Button variant="outline" size="icon" className="size-7" aria-label="Increase" onClick={() => setQty(l.id, l.qty + 1)}>
                        <Plus className="size-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="ml-auto size-7 text-muted-foreground" aria-label="Remove" onClick={() => remove(l.id)}>
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-primary">{fmtETB(l.price * l.qty)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="space-y-3 border-t p-5">
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                applyCoupon(code);
              }}
            >
              <div className="relative flex-1">
                <TicketPercent className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Coupon (try CENTRA10)" className="pl-9" />
              </div>
              <Button type="submit" variant="secondary">Apply</Button>
            </form>
            <Separator />
            <div className="space-y-1 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{fmtETB(subtotal)}</span></div>
              {rate > 0 && (
                <div className="flex justify-between text-primary"><span>Coupon {coupon}</span><span>−{fmtETB(subtotal * rate)}</span></div>
              )}
              <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>{delivery === 0 ? "Free" : fmtETB(delivery)}</span></div>
              <div className="flex justify-between pt-1 text-base font-semibold"><span>Total</span><span>{fmtETB(total)}</span></div>
            </div>
            <Button asChild size="lg" className="w-full" onClick={() => setCartOpen(false)}>
              <Link to="/checkout">Checkout</Link>
            </Button>
            <Button variant="ghost" className="w-full" onClick={() => setCartOpen(false)}>Continue shopping</Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
