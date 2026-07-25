import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Send, Apple, Smartphone, MapPin, Phone, Mail } from "lucide-react";
import { BUSINESS } from "@/data/catalog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function Footer() {
  return (
    <footer className="mt-24 border-t bg-secondary/50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="font-display text-xl font-bold">
            Centra <span className="text-gradient-gold">Mart & Cafe</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            A premium supermarket and café serving Ayat and greater Addis Ababa with fresh produce,
            imported goods and a full café kitchen.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              {BUSINESS.address}
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
              {BUSINESS.phones[0]}
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
              {BUSINESS.email}
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-8 md:col-span-1 lg:col-span-2">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide">Quick links</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/shop" className="hover:text-primary">Supermarket</Link></li>
              <li><Link to="/cafe" className="hover:text-primary">Café menu</Link></li>
              <li><Link to="/categories" className="hover:text-primary">Categories</Link></li>
              <li><Link to="/offers" className="hover:text-primary">Offers</Link></li>
              <li><Link to="/gallery" className="hover:text-primary">Gallery</Link></li>
              <li><Link to="/testimonials" className="hover:text-primary">Testimonials</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide">Services & support</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Same-day delivery</li>
              <li>Scheduled delivery</li>
              <li>Store pickup</li>
              <li>Bulk & business supply</li>
              <li><Link to="/faq" className="hover:text-primary">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact us</Link></li>
              <li><Link to="/about" className="hover:text-primary">About us</Link></li>
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide">Newsletter</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Weekly deals, new arrivals and café specials.
          </p>
          <form
            className="mt-4 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("You're subscribed", { description: "Demo only — no email is sent." });
            }}
          >
            <Input type="email" required placeholder="you@email.com" aria-label="Email address" />
            <Button type="submit">Join</Button>
          </form>
          <div className="mt-5 flex gap-2">
            <Button variant="outline" size="icon" aria-label="Facebook"><Facebook className="size-4" /></Button>
            <Button variant="outline" size="icon" aria-label="Instagram"><Instagram className="size-4" /></Button>
            <Button variant="outline" size="icon" aria-label="Telegram"><Send className="size-4" /></Button>
          </div>
          <div className="mt-5 flex flex-col gap-2">
            <Button variant="secondary" className="justify-start gap-2">
              <Apple className="size-4" /> Download on iOS
            </Button>
            <Button variant="secondary" className="justify-start gap-2">
              <Smartphone className="size-4" /> Get it on Android
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} {BUSINESS.name}. developed By Oliad Dandena</p>
          <p className="flex gap-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
