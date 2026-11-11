import { ArrowUp } from "lucide-react";
import { ContactLinks, contactEmail } from "@/components/ContactLinks";

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-white/10 px-5 text-white sm:px-8 md:px-12">
      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col gap-7 py-8 md:flex-row md:items-end md:justify-between md:py-12">
          <div>
            <a
              href={`mailto:${contactEmail}`}
              className="break-all text-[clamp(1rem,3.8vw,2.5rem)] leading-tight font-semibold tracking-tight transition-colors hover:text-[#ff8c00]"
            >
              {contactEmail}
            </a>
            <div className="mt-4">
              <ContactLinks />
            </div>
          </div>

          <a href="#top" className="group inline-flex w-fit items-center gap-3 text-sm text-white/70 transition-colors hover:text-white">
            Back to top
            <span className="grid size-11 place-items-center rounded-full border border-white/15 text-[#ff8c00] transition-colors group-hover:border-[#ff8c00] group-hover:bg-[#ff8c00] group-hover:text-black">
              <ArrowUp size={18} aria-hidden="true" />
            </span>
          </a>
        </div>

        <div className="relative isolate grid place-items-center border-t border-white/10 py-8 text-center sm:py-12">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,#ff8c001c,transparent_66%)]" />
          <p className="signature-wordmark px-3 pt-[0.15em] text-[clamp(3.5rem,15vw,11rem)] leading-none text-[#fff2df]">
            Sumit Sahu
          </p>
        </div>
      </div>
    </footer>
  );
}
