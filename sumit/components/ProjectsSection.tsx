import { ArrowUpRight } from "lucide-react";
import { existsSync } from "node:fs";
import { join } from "node:path";
import ProjectHomepagePreview from "@/components/ProjectHomepagePreview";

const projects = [
  {
    id: "01",
    preview: "deshi-tokri",
    name: "Deshi Tokri",
    category: "Food & beverage storefront",
    domain: "deshitokri.com",
    url: "https://www.deshitokri.com/",
    summary: "An online shop for traditional Indian snacks, including thekua, namak para, and snack bundles.",
    highlights: ["Product catalogue", "Snack bundles", "Online shopping"],
    surface: "#3e2218",
    accent: "#f5b46e",
  },
  {
    id: "02",
    preview: "ked",
    name: "KED",
    category: "Event decoration storefront",
    domain: "ked.co.in",
    url: "https://ked.co.in/",
    summary: "An event decoration website for browsing balloon décor and themed setups for birthdays and other celebrations.",
    highlights: ["Decoration collections", "Event categories", "Order tracking"],
    surface: "#202521",
    accent: "#c3d8c2",
  },
  {
    id: "03",
    preview: "dreamy-design",
    name: "Dreamy Design",
    category: "Handmade gifts storefront",
    domain: "dreamydesign.co.in",
    url: "https://dreamydesign.co.in/",
    summary: "An online shop for handmade gifts, from soy candles and clay magnets to resin pieces and festive hampers.",
    highlights: ["Collection pages", "Product catalogue", "Wishlist"],
    surface: "#38242e",
    accent: "#f0bed2",
  },
  {
    id: "04",
    preview: "noorzaar",
    name: "Noorzaar",
    category: "Fashion storefront",
    domain: "noorzaar.in",
    url: "https://noorzaar.in/",
    summary: "A fashion storefront for browsing designer collections, seasonal edits, and best sellers.",
    highlights: ["Designer collections", "Seasonal edits", "Product catalogue"],
    surface: "#34252b",
    accent: "#ecd5ac",
  },
] as const;

type Project = (typeof projects)[number];

function ProjectCover({ project }: { project: Project }) {
  const screenshot = ["webp", "png", "jpg"]
    .map((extension) => `/images/projects/${project.preview}.${extension}`)
    .find((path) => existsSync(join(process.cwd(), "public", path)));

  return (
    <div
      className="p-3 sm:p-4"
      style={{ backgroundColor: project.surface, color: project.accent }}
    >
      <div className="overflow-hidden rounded-lg border border-white/15 bg-[#101010] shadow-lg">
        <div aria-hidden="true" className="flex items-center justify-between gap-3 border-b border-white/10 px-3 py-2.5 font-mono text-[10px] text-white/65">
          <span className="flex gap-1">
            <span className="size-1.5 rounded-full bg-current opacity-80" style={{ color: project.accent }} />
            <span className="size-1.5 rounded-full bg-white/20" />
            <span className="size-1.5 rounded-full bg-white/20" />
          </span>
          <span>{project.domain}</span>
          <span className="text-white/40">{project.id}</span>
        </div>
        {screenshot ? (
          <ProjectHomepagePreview src={screenshot} name={project.name} />
        ) : (
          <div aria-hidden="true" className="project-homepage-preview relative isolate flex flex-col justify-center overflow-hidden px-5 sm:px-8" style={{ backgroundColor: project.surface }}>
            <div className="absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(currentColor_1px,transparent_1px),linear-gradient(90deg,currentColor_1px,transparent_1px)] [background-size:32px_32px] [mask-image:linear-gradient(to_bottom_left,#000,transparent_70%)]" />
            <div className="absolute -right-16 -bottom-28 -z-10 size-64 rounded-full border border-current opacity-25" />
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase">{project.category}</span>
            <span className="mt-3 text-[clamp(1.9rem,4.4vw,4rem)] leading-[0.95] font-black tracking-tighter">{project.name}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProjectsSection({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? "h1" : "h2";

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className={`scroll-mt-24 px-6 pb-20 text-white md:px-12 md:pb-28 ${standalone ? "bg-[#080808] pt-32 md:pt-40" : "pt-8 md:pt-12"}`}
    >
      <div className="mx-auto max-w-7xl">
        <header data-scroll-reveal="" className="mb-10 flex flex-col justify-between gap-6 md:mb-14 md:flex-row md:items-end">
          <div>
            <Heading id="work-heading" className="text-[clamp(2.9rem,7vw,7rem)] leading-[0.93] font-black tracking-tighter uppercase">
              Project <span className="text-[#ff8c00]">Lab.</span>
            </Heading>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/65">
            A selection of websites from my portfolio. Explore the projects and visit each site.
          </p>
        </header>

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <article id={`project-${project.id}`} key={project.id} data-scroll-reveal={index % 2 === 1 ? "second" : ""} className="project-card flex scroll-mt-24 flex-col overflow-hidden rounded-xl border border-white/10 bg-[#101010] transition-colors hover:border-[#ff8c00]/40">
              <ProjectCover project={project} />
              <div className="flex flex-1 flex-col p-5 sm:p-7">
                <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">{project.name}</h3>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/70">{project.summary}</p>
                {project.highlights.length > 0 && (
                  <ul aria-label="Website features" className="mt-4 flex flex-wrap gap-2">
                    {project.highlights.map((highlight) => (
                      <li key={highlight} className="rounded-full border border-white/15 px-2.5 py-1 text-[11px] text-white/75">{highlight}</li>
                    ))}
                  </ul>
                )}
                <div className="mt-auto pt-5">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${project.name} website (opens in a new tab)`}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-4 text-sm font-medium text-white transition-colors hover:border-[#ff8c00] hover:text-[#ff8c00]"
                  >
                    Visit website <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
