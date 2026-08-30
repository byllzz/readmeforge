import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheckIcon, Sparkles } from "lucide-react";
import { cn } from "../../lib/utils";

export default function CTASection() {
  return (
    <section className="relative py-24 lg:py-32 font-grandstander" id="cta">
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={cn(
            "relative isolate overflow-hidden rounded-3xl border border-border bg-background px-6 py-16 text-center shadow-2xl sm:px-16 md:py-24",
          )}
        >
          {/* Grid with radial mask */}
          <div
            className="absolute inset-0 -z-20 h-full w-full opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
              maskImage:
                "radial-gradient(ellipse at center, black 40%, transparent 70%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black 40%, transparent 70%)",
            }}
          />

          {/* Top spotlight glow */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 -z-10 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[80px]"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-0 right-0 -z-10 h-[300px] w-[300px] translate-x-1/3 translate-y-1/3 rounded-full bg-accent/10 blur-[60px]"
          />

          <div className="relative z-10 mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mb-6 inline-flex items-center justify-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm"
            >
              <Sparkles className="mr-2 h-3 w-3" />
              Free, forever
            </motion.div>

            <h2 className="text-balance text-3xl font-bold tracking-tighter text-foreground sm:text-4xl md:text-5xl">
              Give your project a <span className="text-primary">great</span>{" "}
              first impression.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-balance text-lg text-muted-foreground">
              Join developers who've stopped fighting markdown and started
              shipping READMEs they're proud of.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/login"
                className="group inline-flex h-12 min-w-40 items-center justify-center gap-2 rounded-lg bg-primary px-8 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href="https://github.com/byllzz/readmeforge"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 min-w-40 items-center justify-center gap-2 rounded-lg border border-border bg-background px-8 text-base font-medium text-foreground transition-colors hover:bg-muted/50"
              >
                Star on GitHub
              </a>
            </div>

            <div className="flex items-center justify-center gap-3 pt-6">
              <BadgeCheckIcon className="size-4 text-primary" />
              <span className="text-sm">No sign-up required to try it</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
