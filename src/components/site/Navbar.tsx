import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Menu,
  Search,
  ShoppingBag,
  Heart,
  Moon,
  Sun,
  Languages,
  Home,
  Store,
  Coffee,
  Tag,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/lib/store";
import { CATEGORIES, PRODUCTS, fmtETB } from "@/data/catalog";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home", labelAm: "መነሻ" },
  { to: "/shop", label: "Shop", labelAm: "ገበያ" },
  { to: "/cafe", label: "Cafe", labelAm: "ካፌ" },
  { to: "/categories", label: "Categories", labelAm: "ምድቦች" },
  { to: "/offers", label: "Offers", labelAm: "ቅናሽ" },
  { to: "/gallery", label: "Gallery", labelAm: "ጋለሪ" },
  { to: "/about", label: "About", labelAm: "ስለ እኛ" },
  { to: "/contact", label: "Contact", labelAm: "አግኙን" },
] as const;

const ANNOUNCEMENTS = [
  "🚚 Free delivery on orders above 1,500 ETB across Addis Ababa",
  "🥬 Fresh produce restocked every morning at Ayat 49",
  "☕ Coffee & breakfast special — 20% off before 10 AM",
  "🎉 Weekend grocery deals live now",
];

export function AnnouncementBar() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % ANNOUNCEMENTS.length), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="gradient-hero text-primary-foreground">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-center overflow-hidden px-4 text-center text-xs sm:text-sm">
        <span key={i} className="reveal truncate">{ANNOUNCEMENTS[i]}</span>
      </div>
    </div>
  );
}

function SearchPanel({ onDone }: { onDone?: () => void }) {
  const [q, setQ] = useState("");
  const results = q.trim()
    ? PRODUCTS.filter((p) =>
        (p.name + p.nameAm + p.brand + p.category).toLowerCase().includes(q.toLowerCase()),
      ).slice(0, 6)
    : [];
  return (
    <div className="w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products, brands, categories…"
          className="h-12 rounded-full pl-10 pr-4"
          aria-label="Search products"
        />
      </div>
      {q.trim() && (
        <ul className="mt-3 space-y-1">
          {results.length === 0 && (
            <li className="rounded-xl bg-muted p-4 text-sm text-muted-foreground">
              No products match "{q}".
            </li>
          )}
          {results.map((p) => (
            <li key={p.id} className="reveal">
              <Link
                to="/product/$id"
                params={{ id: p.id }}
                onClick={onDone}
                className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-muted"
              >
                <span className="grid size-10 place-items-center rounded-lg bg-primary-soft text-xl">
                  {p.emoji}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{p.name}</span>
                  <span className="block truncate text-xs text-muted-foreground">{p.nameAm}</span>
                </span>
                <span className="shrink-0 text-sm font-semibold text-primary">{fmtETB(p.price)}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Navbar() {
  const { count, setCartOpen, dark, toggleDark, lang, toggleLang, wishlist } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <AnnouncementBar />
      <div className={cn("border-b transition-all", scrolled ? "glass shadow-soft" : "bg-background")}>
        <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 sm:px-6">
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <span className="gradient-hero grid size-10 shrink-0 place-items-center rounded-2xl text-lg font-bold text-primary-foreground">
              C
            </span>
            <span className="min-w-0">
              <span className="block truncate font-display text-base font-bold leading-tight sm:text-lg">
                Centra Mart <span className="text-gradient-gold">& Cafe</span>
              </span>
              <span className="hidden text-[11px] text-muted-foreground sm:block">Ayat 49 · Addis Ababa</span>
            </span>
          </Link>

          <nav className="hidden items-center justify-center gap-1 lg:flex">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-primary-soft hover:text-primary"
                activeProps={{ className: "bg-primary-soft text-primary" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {lang === "en" ? n.label : n.labelAm}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" aria-label="Search" onClick={() => setSearchOpen((v) => !v)}>
              {searchOpen ? <X className="size-5" /> : <Search className="size-5" />}
            </Button>
            <Button variant="ghost" size="icon" aria-label="Language" onClick={toggleLang} className="hidden sm:inline-flex">
              <Languages className="size-5" />
              <span className="sr-only">Toggle language</span>
            </Button>
            <span className="hidden text-xs font-semibold text-muted-foreground sm:inline">
              {lang.toUpperCase()}
            </span>
            <Button variant="ghost" size="icon" aria-label="Toggle dark mode" onClick={toggleDark}>
              {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </Button>
            <Link to="/offers" className="hidden sm:block">
              <Button variant="ghost" size="icon" aria-label="Wishlist" className="relative">
                <Heart className="size-5" />
                {wishlist.length > 0 && (
                  <Badge className="absolute -right-1 -top-1 size-5 justify-center rounded-full p-0 text-[10px]">
                    {wishlist.length}
                  </Badge>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open cart"
              className="relative"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag className={cn("size-5", count > 0 && "text-primary")} />
              {count > 0 && (
                <Badge className="absolute -right-1 -top-1 size-5 animate-in zoom-in justify-center rounded-full p-0 text-[10px]">
                  {count}
                </Badge>
              )}
            </Button>

            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu" className="lg:hidden">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[86vw] max-w-sm overflow-y-auto p-6">
                <SheetTitle className="font-display text-lg">Menu</SheetTitle>
                <nav className="mt-4 flex flex-col">
                  {NAV.map((n) => (
                    <Link
                      key={n.to}
                      to={n.to}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-xl px-3 py-3 text-base font-medium transition hover:bg-muted"
                      activeProps={{ className: "bg-primary-soft text-primary" }}
                      activeOptions={{ exact: n.to === "/" }}
                    >
                      {lang === "en" ? n.label : n.labelAm}
                    </Link>
                  ))}
                  <Link to="/faq" onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-3 text-base font-medium hover:bg-muted">FAQ</Link>
                  <Link to="/testimonials" onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-3 text-base font-medium hover:bg-muted">Testimonials</Link>
                </nav>
                <div className="mt-6">
                  <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Popular categories</p>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.slice(0, 8).map((c) => (
                      <Link
                        key={c.slug}
                        to="/shop"
                        search={{ category: c.slug }}
                        onClick={() => setMenuOpen(false)}
                        className="rounded-full border px-3 py-1.5 text-xs"
                      >
                        {c.emoji} {c.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <Button className="mt-6 w-full" onClick={() => { setMenuOpen(false); toggleLang(); }}>
                  <Languages className="size-4" /> {lang === "en" ? "አማርኛ" : "English"}
                </Button>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t bg-background">
            <div className="reveal mx-auto max-w-3xl px-4 py-4 sm:px-6">
              <SearchPanel onDone={() => setSearchOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export function MobileTabBar() {
  const { count, setCartOpen } = useStore();
  const items = [
    { to: "/", label: "Home", icon: Home },
    { to: "/shop", label: "Shop", icon: Store },
    { to: "/cafe", label: "Cafe", icon: Coffee },
    { to: "/offers", label: "Offers", icon: Tag },
  ] as const;
  return (
    <nav className="glass fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t px-2 pb-[env(safe-area-inset-bottom)] pt-2 lg:hidden">
      {items.map((i) => (
        <Link
          key={i.to}
          to={i.to}
          className="flex flex-1 flex-col items-center gap-1 rounded-xl py-1 text-[11px] text-muted-foreground"
          activeProps={{ className: "text-primary" }}
          activeOptions={{ exact: i.to === "/" }}
        >
          <i.icon className="size-5" />
          {i.label}
        </Link>
      ))}
      <button
        onClick={() => setCartOpen(true)}
        className="relative flex flex-1 flex-col items-center gap-1 py-1 text-[11px] text-muted-foreground"
      >
        <ShoppingBag className="size-5" />
        Cart
        {count > 0 && (
          <span className="absolute right-3 top-0 grid size-4 place-items-center rounded-full bg-primary text-[9px] text-primary-foreground">
            {count}
          </span>
        )}
      </button>
    </nav>
  );
}
