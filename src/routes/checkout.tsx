import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, MapPin, CircleDot, Truck, PackageCheck, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useStore, discountRate } from "@/lib/store";
import { fmtETB, BUSINESS } from "@/data/catalog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | Centra Mart & Cafe" },
      { name: "description", content: "Prototype checkout for Centra Mart & Cafe with delivery scheduling and Telebirr, CBE Birr, Chapa and cash on delivery options." },
      { property: "og:title", content: "Checkout | Centra Mart & Cafe" },
      { property: "og:description", content: "Demo checkout flow with Ethiopian payment options." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Checkout,
});

const PAYMENTS = [
  { id: "telebirr", label: "Telebirr", note: "Mobile money" },
  { id: "cbe", label: "CBE Birr", note: "Bank wallet" },
  { id: "chapa", label: "Chapa", note: "Card & wallet gateway" },
  { id: "cod", label: "Cash on Delivery", note: "Pay the rider" },
];

const STEPS = [
  { t: "Order confirmed", d: "We received your order at Ayat 49", icon: CheckCircle2 },
  { t: "Picking & packing", d: "Fresh items selected and quality checked", icon: PackageCheck },
  { t: "Out for delivery", d: "Rider on the way across Addis Ababa", icon: Truck },
  { t: "Delivered", d: "Enjoy — thank you for shopping with us", icon: Home },
];

function Checkout() {
  const { lines, subtotal, coupon, clear } = useStore();
  const [payment, setPayment] = useState("telebirr");
  const [placed, setPlaced] = useState(false);
  const rate = discountRate(coupon);
  const deliveryFee = subtotal > 1500 || subtotal === 0 ? 0 : 100;
  const total = subtotal - subtotal * rate + deliveryFee;

  if (placed) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <div className="reveal grid place-items-center">
          <span className="grid size-20 place-items-center rounded-full bg-primary-soft">
            <CheckCircle2 className="size-10 text-primary" />
          </span>
          <h1 className="mt-5 text-3xl font-bold">Order placed 🎉</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Order #CM-{Math.floor(Math.random() * 90000 + 10000)} · paid with {PAYMENTS.find((p) => p.id === payment)?.label}.
            This is a prototype, so no payment was processed.
          </p>
        </div>

        <ol className="mt-10 space-y-5 text-left">
          {STEPS.map((s, i) => (
            <li key={s.t} className="flex gap-4">
              <span className={cn("grid size-10 shrink-0 place-items-center rounded-full", i < 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                <s.icon className="size-5" />
              </span>
              <span>
                <span className="block font-medium">{s.t}</span>
                <span className="block text-sm text-muted-foreground">{s.d}</span>
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex justify-center gap-3">
          <Button asChild className="rounded-full"><Link to="/shop">Continue shopping</Link></Button>
          <Button asChild variant="outline" className="rounded-full"><Link to="/">Back home</Link></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">Checkout</h1>
      <p className="mt-2 text-sm text-muted-foreground">Prototype only — no payment is processed.</p>

      <form
        className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]"
        onSubmit={(e) => {
          e.preventDefault();
          setPlaced(true);
          clear();
          window.scrollTo({ top: 0 });
        }}
      >
        <div className="space-y-6">
          <section className="rounded-3xl border bg-card p-6">
            <h2 className="font-display text-lg font-semibold">Customer information</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div><Label htmlFor="name">Full name</Label><Input id="name" required placeholder="Abebe Kebede" className="mt-1.5" /></div>
              <div><Label htmlFor="phone">Phone number</Label><Input id="phone" required type="tel" placeholder="+251 9…" className="mt-1.5" /></div>
              <div className="sm:col-span-2"><Label htmlFor="email">Email (optional)</Label><Input id="email" type="email" placeholder="you@email.com" className="mt-1.5" /></div>
            </div>
          </section>

          <section className="rounded-3xl border bg-card p-6">
            <h2 className="font-display text-lg font-semibold">Delivery address</h2>
            <div className="mt-4 grid gap-4">
              <div><Label htmlFor="addr">Address</Label><Textarea id="addr" required placeholder="Sub-city, woreda, building, landmark" className="mt-1.5" /></div>
              <div className="grid h-40 place-items-center rounded-2xl border border-dashed bg-muted text-center text-sm text-muted-foreground">
                <span><MapPin className="mx-auto mb-1 size-5 text-primary" />Map placeholder — pin your location<br />
                  <span className="text-xs">Store: {BUSINESS.shortAddress}</span>
                </span>
              </div>
              <div>
                <Label>Delivery time</Label>
                <RadioGroup defaultValue="asap" className="mt-2 grid gap-2 sm:grid-cols-3">
                  {[["asap", "As soon as possible"], ["evening", "Today, 5–8 PM"], ["tomorrow", "Tomorrow morning"]].map(([v, l]) => (
                    <label key={v} className="flex cursor-pointer items-center gap-2 rounded-2xl border p-3 text-sm">
                      <RadioGroupItem value={v} /> {l}
                    </label>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border bg-card p-6">
            <h2 className="font-display text-lg font-semibold">Payment method</h2>
            <RadioGroup value={payment} onValueChange={setPayment} className="mt-4 grid gap-3 sm:grid-cols-2">
              {PAYMENTS.map((p) => (
                <label
                  key={p.id}
                  className={cn("flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition", payment === p.id && "border-primary bg-primary-soft")}
                >
                  <RadioGroupItem value={p.id} />
                  <span>
                    <span className="block text-sm font-medium">{p.label}</span>
                    <span className="block text-xs text-muted-foreground">{p.note}</span>
                  </span>
                </label>
              ))}
            </RadioGroup>
          </section>
        </div>

        <aside className="h-fit rounded-3xl border bg-card p-6 lg:sticky lg:top-32">
          <h2 className="font-display text-lg font-semibold">Order summary</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {lines.length === 0 && <li className="text-muted-foreground">Your basket is empty — this demo will still place a sample order.</li>}
            {lines.map((l) => (
              <li key={l.id} className="flex justify-between gap-2">
                <span className="min-w-0 truncate text-muted-foreground">{l.emoji} {l.name} × {l.qty}</span>
                <span>{fmtETB(l.price * l.qty)}</span>
              </li>
            ))}
          </ul>
          <Separator className="my-4" />
          <div className="space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{fmtETB(subtotal)}</span></div>
            {rate > 0 && <div className="flex justify-between text-primary"><span>Coupon {coupon}</span><span>−{fmtETB(subtotal * rate)}</span></div>}
            <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>{deliveryFee === 0 ? "Free" : fmtETB(deliveryFee)}</span></div>
            <div className="flex justify-between pt-1 text-base font-semibold"><span>Total</span><span>{fmtETB(total)}</span></div>
          </div>
          <Button type="submit" size="lg" className="mt-5 w-full rounded-full">Place order</Button>
          <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <CircleDot className="size-3 text-primary" /> Demo checkout — nothing is charged.
          </p>
        </aside>
      </form>
    </div>
  );
}
