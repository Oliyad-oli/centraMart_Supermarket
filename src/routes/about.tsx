import { createFileRoute } from "@tanstack/react-router";
import storeFront from "@/assets/store-front.jpg";
import heroCafe from "@/assets/hero-cafe.jpg";
import { BUSINESS } from "@/data/catalog";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Centra Mart & Cafe | Ayat 49, Addis Ababa" },
      { name: "description", content: "The story, mission and team behind Centra Mart & Cafe — a premium supermarket and café at Ayat 49, Zemer Building, Addis Ababa." },
      { property: "og:title", content: "About Centra Mart & Cafe" },
      { property: "og:description", content: "Our story, mission and values in Ayat 49, Addis Ababa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">About {BUSINESS.name}</h1>
      <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
        Centra Mart & Cafe is a modern hybrid retail business in {BUSINESS.address}. We bring together a
        premium supermarket and a full-service café so families, professionals, restaurants and hotels have
        one dependable destination for daily groceries, imported products, fresh foods and great coffee.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <img src={storeFront} width={1400} height={900} loading="lazy" alt="Centra Mart storefront at dusk" className="h-64 w-full rounded-3xl object-cover" />
        <img src={heroCafe} width={1200} height={1200} loading="lazy" alt="Coffee served at the Centra café" className="h-64 w-full rounded-3xl object-cover" />
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {[
          ["Mission", "To make premium daily shopping effortless for every household in Addis Ababa through quality, service and fast local delivery."],
          ["Vision", "To become one of Addis Ababa's leading premium supermarkets and cafés with a seamless online shopping experience."],
          ["Values", "Freshness first, honest pricing, warm hospitality, and respect for the Ethiopian food traditions we sell every day."],
        ].map(([t, d]) => (
          <div key={t} className="card-lift rounded-3xl border bg-card p-6">
            <h2 className="font-display text-lg font-semibold text-primary">{t}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-4 rounded-[2rem] border bg-secondary/60 p-8 sm:grid-cols-4">
        {[["4,200+", "Products in store"], ["18,500+", "Orders delivered"], ["98%", "Customer satisfaction"], ["45 min", "Average delivery"]].map(([v, k]) => (
          <div key={k} className="text-center">
            <p className="font-display text-3xl font-bold text-primary">{v}</p>
            <p className="text-xs text-muted-foreground">{k}</p>
          </div>
        ))}
      </div>

      <section className="mt-14">
        <h2 className="text-2xl font-bold">Our team</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Store Manager", "Runs the floor, pricing and daily standards"],
            ["Inventory Manager", "Keeps 4,200+ lines stocked and fresh"],
            ["Café Manager", "Leads the kitchen, roastery and barista team"],
            ["Delivery Coordinator", "Dispatches riders across Addis Ababa"],
          ].map(([role, d]) => (
            <div key={role} className="card-lift rounded-3xl border bg-card p-6 text-center">
              <span className="mx-auto grid size-16 place-items-center rounded-full bg-primary-soft text-2xl">🧑‍💼</span>
              <p className="mt-3 font-medium">{role}</p>
              <p className="mt-1 text-xs text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
