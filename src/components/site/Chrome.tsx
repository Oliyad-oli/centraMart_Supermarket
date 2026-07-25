import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { BUSINESS } from "@/data/catalog";
import { cn } from "@/lib/utils";

export function LoadingScreen() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 1100);
    return () => clearTimeout(t);
  }, []);
  if (gone) return null;
  return (
    <div
      className={cn(
        "gradient-hero fixed inset-0 z-[100] grid place-items-center text-primary-foreground transition-opacity duration-500",
      )}
    >
      <div className="text-center">
        <div className="float-soft mx-auto grid size-20 place-items-center rounded-3xl bg-primary-foreground/15 text-3xl font-bold backdrop-blur">
          C
        </div>
        <p className="mt-5 font-display text-xl font-semibold">Centra Mart & Cafe</p>
        <p className="mt-1 text-sm opacity-80">Ayat 49 · Addis Ababa</p>
      </div>
    </div>
  );
}

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed bottom-20 right-4 z-40 flex flex-col gap-3 lg:bottom-6">
      {showTop && (
        <Button
          size="icon"
          variant="secondary"
          className="reveal size-11 rounded-full shadow-soft"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp className="size-5" />
        </Button>
      )}
      <a
        href={`https://wa.me/${BUSINESS.whatsapp.replace(/\D/g, "")}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="grid size-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-lift transition hover:scale-105"
      >
        <MessageCircle className="size-6" />
      </a>
    </div>
  );
}

export function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 9000);
    return () => clearTimeout(t);
  }, []);
  if (!open) return null;
  return (
    <div className="fixed bottom-24 left-4 z-40 w-[min(20rem,calc(100vw-2rem))] lg:bottom-6">
      <div className="glass reveal rounded-3xl p-5 shadow-lift">
        <button
          className="absolute right-3 top-3 text-muted-foreground"
          aria-label="Close newsletter"
          onClick={() => setOpen(false)}
        >
          <X className="size-4" />
        </button>
        <p className="font-display font-semibold">Get 10% off your first order</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Join the Centra list for weekly deals and café specials.
        </p>
        <form
          className="mt-3 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Welcome to Centra Mart", { description: "Use code CENTRA10 at checkout." });
            setOpen(false);
          }}
        >
          <Input required type="email" placeholder="Email address" aria-label="Email address" className="h-9" />
          <Button type="submit" size="sm">Get code</Button>
        </form>
      </div>
    </div>
  );
}

export function Section({
  eyebrow,
  title,
  subtitle,
  children,
  action,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
        <div className="min-w-0">
          {eyebrow && <p className="text-xs font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>}
          <h2 className="mt-1 text-2xl font-bold sm:text-3xl">{title}</h2>
          {subtitle && <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
