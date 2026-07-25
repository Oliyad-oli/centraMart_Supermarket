import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BUSINESS, FAQS } from "@/data/catalog";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Location | Centra Mart & Cafe, Ayat 49" },
      { name: "description", content: "Call, email or visit Centra Mart & Cafe at Ayat 49, near Hore Real Estate, Zemer Building (Bright Gym), Addis Ababa. Business hours and contact form." },
      { property: "og:title", content: "Contact Centra Mart & Cafe" },
      { property: "og:description", content: "Phone, email, hours and location in Ayat 49, Addis Ababa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">Contact us</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Questions about an order, bulk supply or the café kitchen? Our team answers every message.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="rounded-3xl border bg-card p-6">
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3"><MapPin className="mt-0.5 size-5 shrink-0 text-primary" />{BUSINESS.address}</li>
              <li className="flex gap-3"><Phone className="mt-0.5 size-5 shrink-0 text-primary" />{BUSINESS.phones.join(" · ")}</li>
              <li className="flex gap-3"><Mail className="mt-0.5 size-5 shrink-0 text-primary" />{BUSINESS.email}</li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 size-5 shrink-0 text-primary" />
                <span className="space-y-1">
                  {BUSINESS.hours.map((h) => (
                    <span key={h.day} className="block"><span className="font-medium">{h.day}:</span> {h.time}</span>
                  ))}
                </span>
              </li>
            </ul>
            <div className="mt-5 flex gap-2">
              <Button variant="outline" size="icon" aria-label="Facebook"><Facebook className="size-4" /></Button>
              <Button variant="outline" size="icon" aria-label="Instagram"><Instagram className="size-4" /></Button>
              <Button variant="outline" size="icon" aria-label="Telegram"><Send className="size-4" /></Button>
            </div>
          </div>
          <div className="grid h-64 place-items-center rounded-3xl border border-dashed bg-muted text-center text-sm text-muted-foreground">
            <span><MapPin className="mx-auto mb-1 size-6 text-primary" />Map placeholder<br /><span className="text-xs">{BUSINESS.shortAddress}</span></span>
          </div>
        </div>

        <form
          className="h-fit rounded-3xl border bg-card p-6"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Message sent", { description: "Demo only — our team would reply within a few hours." });
            (e.target as HTMLFormElement).reset();
          }}
        >
          <h2 className="font-display text-lg font-semibold">Send a message</h2>
          <div className="mt-4 grid gap-4">
            <div><Label htmlFor="cname">Name</Label><Input id="cname" required className="mt-1.5" /></div>
            <div><Label htmlFor="cphone">Phone</Label><Input id="cphone" type="tel" required className="mt-1.5" /></div>
            <div><Label htmlFor="cmsg">Message</Label><Textarea id="cmsg" required rows={5} className="mt-1.5" /></div>
            <Button type="submit" className="rounded-full">Send message</Button>
          </div>
        </form>
      </div>

      <section className="mt-14">
        <h2 className="text-2xl font-bold">Frequently asked</h2>
        <Accordion type="single" collapsible className="mt-4">
          {FAQS.slice(0, 5).map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
