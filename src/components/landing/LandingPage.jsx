import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRightIcon, Star } from "lucide-react";
import LandingHeader from "./LandingHeader";
import AboutSection from "./AboutSection";
import CTASection from "./CTASection";
import Footer from "./Footer";
import HowItWorksSection from "./HowItWorksSection";
import previewImg from "../../assets/preview.png";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.55 },
  },
};

const item = {
  hidden: { opacity: 0, filter: "blur(10px)", y: 12 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { type: "spring", bounce: 0.3, duration: 1.2 },
  },
};

export default function LandingPage() {
  return (
    <>
      <LandingHeader />

      <main className="relative flex min-h-screen flex-col overflow-hidden bg-background text-foreground font-grandstander ">
        {/* Gradient mesh background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 overflow-hidden"
        >
          <div className="absolute -top-[20%] left-1/2 h-[1000px] w-[1000px] -translate-x-1/2 rounded-[100%] bg-primary/5 blur-[80px]" />
          <div
            className="absolute inset-0 h-full w-full"
            style={{
              background:
                "radial-gradient(circle at 50% 0%, transparent 0%, var(--color-background) 70%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
              backgroundSize: "4rem 4rem",
              maskImage:
                "radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)",
            }}
          />
        </div>

        <section className="relative z-10 pt-24 lg:pt-38">
          <div className="mx-auto max-w-[1200px] text-center">
            {/* Badge */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-muted/50 pl-1 pr-3 py-1 text-sm transition-all hover:bg-muted/80 shadow-xs">
                <span className="rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
                  New
                </span>
                <span className="flex items-center text-muted-foreground">
                  No sign-up required to try it
                  <ArrowUpRightIcon className="ml-1 h-3.5 w-3.5 shrink-0 opacity-70" />
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, filter: "blur(12px)", y: 12 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="mx-auto mt-8 max-w-4xl text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl xl:text-8xl"
            >
              Build stunning READMEs, visually.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, filter: "blur(8px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
              className="mx-auto mt-6 max-w-[700px] text-balance text-lg text-muted-foreground md:text-xl"
            >
              Drag-and-drop blocks, live preview, and one-click export — no
              markdown skills required. Built for developers who care about
              their project's first impression.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
              className="mt-10 flex items-center justify-center gap-4"
            >
              <motion.div variants={item}>
                <Link
                  to="/login"
                  className="group inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Start for free
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
              <motion.div variants={item}>
                <a
                  href="https://github.com/byllzz/readmeforge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border px-6 text-base font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  GitHub
                </a>
              </motion.div>
            </motion.div>

            {/* Product screenshot */}
            <motion.div variants={container} initial="hidden" animate="visible">
              <motion.div
                variants={item}
                className="relative mt-8 overflow-hidden px-2 sm:mt-12 md:mt-20"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, black 55%, transparent 100%)",
                }}
              >
                <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-border bg-background  shadow-lg shadow-zinc-950/15">
                  <img
                    className="relative aspect-[15/8] w-full rounded-2xl border border-border/25 object-cotain object-top"
                    src={previewImg}
                    alt="ReadmeForge editor showing the block list, drag-to-reorder panel, and live markdown preview"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <AboutSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </>
  );
}
