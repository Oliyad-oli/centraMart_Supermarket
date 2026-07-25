import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import { PRODUCTS, CAFE_MENU, type Product, type CafeItem } from "@/data/catalog";

export type CartLine = {
  id: string;
  name: string;
  emoji: string;
  price: number;
  qty: number;
  meta: string;
};

type StoreValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  addProduct: (p: Product, qty?: number) => void;
  addCafeItem: (i: CafeItem) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  recentlyViewed: string[];
  markViewed: (id: string) => void;
  dark: boolean;
  toggleDark: () => void;
  lang: "en" | "am";
  toggleLang: () => void;
  coupon: string | null;
  applyCoupon: (code: string) => void;
};

const StoreContext = createContext<StoreValue | null>(null);

const COUPONS: Record<string, number> = { CENTRA10: 0.1, AYAT49: 0.15, BUNA5: 0.05 };

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [dark, setDark] = useState(false);
  const [lang, setLang] = useState<"en" | "am">("en");
  const [coupon, setCoupon] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const push = useCallback((line: CartLine) => {
    setLines((prev) => {
      const found = prev.find((l) => l.id === line.id);
      if (found) {
        return prev.map((l) => (l.id === line.id ? { ...l, qty: l.qty + line.qty } : l));
      }
      return [...prev, line];
    });
  }, []);

  const value: StoreValue = useMemo(() => {
    const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
    return {
      lines,
      count: lines.reduce((s, l) => s + l.qty, 0),
      subtotal,
      addProduct: (p, qty = 1) => {
        push({ id: p.id, name: p.name, emoji: p.emoji, price: p.price, qty, meta: p.unit });
        toast.success(`${p.name} added to cart`, { description: `${qty} × ${p.unit}` });
      },
      addCafeItem: (i) => {
        push({ id: `cafe-${i.id}`, name: i.name, emoji: i.emoji, price: i.price, qty: 1, meta: "Café order" });
        toast.success(`${i.name} added to your café order`, {
          description: `Ready in about ${i.minutes} minutes`,
        });
      },
      setQty: (id, qty) =>
        setLines((prev) =>
          qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty } : l)),
        ),
      remove: (id) => setLines((prev) => prev.filter((l) => l.id !== id)),
      clear: () => setLines([]),
      cartOpen,
      setCartOpen,
      wishlist,
      toggleWishlist: (id) =>
        setWishlist((prev) => {
          const on = prev.includes(id);
          toast(on ? "Removed from wishlist" : "Saved to wishlist ❤");
          return on ? prev.filter((x) => x !== id) : [...prev, id];
        }),
      recentlyViewed,
      markViewed: (id) => setRecentlyViewed((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, 6)),
      dark,
      toggleDark: () => setDark((d) => !d),
      lang,
      toggleLang: () => setLang((l) => (l === "en" ? "am" : "en")),
      coupon,
      applyCoupon: (code) => {
        const key = code.trim().toUpperCase();
        if (COUPONS[key]) {
          setCoupon(key);
          toast.success(`Coupon ${key} applied`, { description: `${COUPONS[key] * 100}% off your order` });
        } else {
          toast.error("That coupon code is not valid");
        }
      },
    };
  }, [lines, cartOpen, wishlist, recentlyViewed, dark, lang, coupon, push]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

export const discountRate = (coupon: string | null) => (coupon ? COUPONS[coupon] ?? 0 : 0);

export const findProduct = (id: string) => PRODUCTS.find((p) => p.id === id);
export const findCafeItem = (id: string) => CAFE_MENU.find((p) => p.id === id);
