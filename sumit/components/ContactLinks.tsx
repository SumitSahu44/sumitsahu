import { ArrowUpRight } from "lucide-react";

export const contactEmail = "sumitkumarsahu141@gmail.com";

const contactLinks = [
  { label: "WhatsApp", href: "https://wa.me/919399805947" },
  { label: "Instagram", href: "https://www.instagram.com/sumit_sahu_444/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sumit-sahu-14s012005/" },
];

export function ContactLinks() {
  return (
    <div className="flex flex-wrap gap-2">
      {contactLinks.map(({ label, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-4 text-sm text-white/75 transition-colors hover:border-[#ff8c00] hover:text-[#ff8c00]"
        >
          {label} <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
