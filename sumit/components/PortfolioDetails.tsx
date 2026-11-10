import { ArrowUpRight } from "lucide-react";

// Starter content. Update these lists as your services and skills evolve.
const services = [
  ["01", "Creative websites", "Business websites, portfolios and landing pages with a clear identity, responsive layouts and thoughtful interactions.", "React · Next.js · Tailwind CSS"],
  ["02", "Full-stack development", "Custom web applications, dashboards and API integrations that turn your business workflow into a useful digital product.", "Node.js · Express · MongoDB"],
  ["03", "Motion & refinement", "Scroll experiences, micro-interactions and website redesigns that make an existing experience feel more considered.", "GSAP · Framer Motion · Responsive UI"],
];
const section = "relative bg-[#050505] px-6 py-20 text-white md:px-12 md:py-28 border-t border-white/[0.07] scroll-mt-24";
const heading = "text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.95]";

export function ServicesSection() {
  return <section id="capabilities" className={section}><div className="max-w-7xl mx-auto"><div className="flex flex-col md:flex-row md:items-end justify-between gap-7 mb-12"><h2 className={heading}>From idea.<br /><span className="text-[#ff8c00]">To experience.</span></h2><p className="max-w-xs text-sm text-white/55 leading-relaxed">Design, development and the details in between. A clear path from your first brief to a website you can share.</p></div>{services.map(([number, title, description, tools]) => <article key={number} className="grid grid-cols-[28px_1fr] md:grid-cols-[50px_1fr_1fr] gap-4 md:gap-8 border-t border-white/10 py-8 md:py-10 group"><span className="font-mono text-xs text-[#ff8c00] pt-2">{number}</span><h3 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-[#ff8c00] transition-colors">{title}</h3><div className="col-start-2 md:col-start-auto"><p className="text-sm leading-relaxed text-white/55">{description}</p><p className="mt-4 font-mono text-[10px] text-white/40 leading-relaxed">{tools}</p></div></article>)}</div></section>;
}

export function ContactSection() {
  return <section id="contact" className={section}><div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_1.1fr] gap-12 md:gap-20"><div><h2 className={heading}>Your next<br /><span className="text-[#ff8c00]">great website.</span></h2><p className="text-sm leading-relaxed text-white/55 max-w-sm mt-7">Have a project in mind? Share your idea, the features you need and your timeline. We’ll figure out the next step together.</p><a href="mailto:sumitsahu5328@gmail.com?subject=Let%E2%80%99s%20discuss%20a%20website" className="inline-flex items-center gap-3 mt-8 rounded-full bg-[#ff8c00] text-black px-6 py-3 text-xs font-bold uppercase tracking-wider hover:bg-orange-300 transition-colors">Start a conversation <ArrowUpRight size={18} /></a><a href="mailto:sumitsahu5328@gmail.com" className="block mt-5 text-sm text-white/60 hover:text-white break-all">sumitsahu5328@gmail.com</a></div><div>{[
    ["What kind of projects do you take on?", "Business websites, portfolios, landing pages and custom web applications. We’ll choose the scope and tools around your needs."],
    ["How long will my website take?", "That depends on the pages, features and content. After reviewing your brief, we’ll agree on a realistic timeline and milestones."],
    ["Can you improve my existing website?", "Yes. We can keep what works and improve the design details, responsive behaviour, structure or functionality that needs attention."],
    ["What happens after launch?", "Hosting, handover and any ongoing support will be agreed as part of the project scope, so expectations are clear from the start."],
  ].map(([question, answer]) => <details className="portfolio-faq border-t border-white/10 py-5" key={question}><summary className="cursor-pointer flex justify-between items-center gap-5 text-sm font-medium list-none">{question}<span className="text-[#ff8c00] text-xl font-light" aria-hidden="true">+</span></summary><p className="text-sm text-white/55 leading-relaxed mt-4 pr-4">{answer}</p></details>)}</div></div></section>;
}
