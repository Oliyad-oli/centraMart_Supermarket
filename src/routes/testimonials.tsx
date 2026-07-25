import { createFileRoute } from "@tanstack/react-router";
import { PlayCircle } from "lucide-react";
import { Stars } from "@/components/site/ProductCard";
import { TESTIMONIALS } from "@/data/catalog";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Customer Reviews | Centra Mart & Cafe" },
      { name: "description", content: "What families, restaurants and hotels in Addis Ababa say about shopping and dining at Centra Mart & Cafe." },
      { property: "og:title", content: "Customer Reviews | Centra Mart & Cafe" },
      { property: "og:description", content: "Reviews from Centra Mart customers across Addis Ababa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Testimonials,
});

function Testimonials() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">What our customers say</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        A 4.9 average across 1,240+ reviews from Ayat, Bole, CMC and beyond.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure key={t.name} className="card-lift rounded-3xl border bg-card p-6">
            <Stars rating={t.rating} />
            <blockquote className="mt-3 text-sm text-muted-foreground">"{t.quote}"</blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-full bg-primary-soft font-semibold text-primary">{t.name.charAt(0)}</span>
              <span>
                <span className="block text-sm font-medium">{t.name}</span>
                <span className="block text-xs text-muted-foreground">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-10 grid aspect-video place-items-center rounded-[2rem] border border-dashed bg-muted text-center text-sm text-muted-foreground">
        <span><PlayCircle className="mx-auto mb-2 size-10 text-primary" />Customer story video placeholder</span>
      </div>
    </div>
  );
}
