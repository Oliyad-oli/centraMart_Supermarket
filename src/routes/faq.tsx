import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQS } from "@/data/catalog";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ | Centra Mart & Cafe Delivery, Payment & Store Info" },
      { name: "description", content: "Answers about delivery across Addis Ababa, payment options, freshness, bulk supply and returns at Centra Mart & Cafe." },
      { property: "og:title", content: "FAQ | Centra Mart & Cafe" },
      { property: "og:description", content: "Delivery, payment and store questions answered." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Faq,
});

function Faq() {
  const [q, setQ] = useState("");
  const list = FAQS.filter((f) => (f.q + f.a).toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">Frequently asked questions</h1>
      <div className="relative mt-6">
        <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search the FAQ…" aria-label="Search FAQ" className="h-12 rounded-full pl-11" />
      </div>
      <Accordion type="single" collapsible className="mt-6">
        {list.map((f) => (
          <AccordionItem key={f.q} value={f.q}>
            <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {list.length === 0 && <p className="mt-6 text-sm text-muted-foreground">No questions match "{q}".</p>}
    </div>
  );
}
