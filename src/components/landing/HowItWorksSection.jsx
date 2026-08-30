import { motion } from "framer-motion";
import { Blocks, MousePointer2, Eye, DownloadCloud, Check } from "lucide-react";
import { cn } from "../../lib/utils";

const steps = [
  {
    step: "01",
    title: "Add your blocks",
    description:
      "Pick from title, badges, description, features, installation, usage and more.",
    icon: Blocks,
    visual: "blocks",
  },
  {
    step: "02",
    title: "Drag to reorder",
    description:
      "Arrange blocks exactly how you want them to appear in your README.",
    icon: MousePointer2,
    visual: "reorder",
  },
  {
    step: "03",
    title: "Watch it render live",
    description:
      "The preview panel updates instantly, showing exactly what will land on GitHub.",
    icon: Eye,
    visual: "preview",
  },
  {
    step: "04",
    title: "Copy or download",
    description:
      "Export a clean, GitHub-ready README.md in a single click. No sign-up needed.",
    icon: DownloadCloud,
    visual: "export",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const BlocksVisual = () => (
  <div className="rounded-xl border border-border bg-background p-4 font-grandstander">
    <div className="mb-3 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-lg font-bold text-primary-foreground">
        H
      </div>
      <div>
        <div className="h-2.5 w-24 rounded-full bg-foreground/80" />
        <div className="mt-1.5 h-2 w-16 rounded-full bg-muted-foreground/40" />
      </div>
    </div>
    <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2">
      <Check className="h-4 w-4 text-primary" />
      <span className="text-sm text-primary">Title block added</span>
    </div>
  </div>
);

const ReorderVisual = () => (
  <div className="rounded-xl border border-border bg-background p-4 font-grandstander">
    <div className="space-y-2">
      {["Title", "Badges", "Description"].map((label, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 + i * 0.1 }}
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 text-sm",
            i === 0 ? "bg-primary/10 text-primary" : "text-muted-foreground",
          )}
        >
          <span className="text-xs">⠿⠿</span>
          <span>{label}</span>
        </motion.div>
      ))}
    </div>
  </div>
);

const PreviewVisual = () => (
  <div className="rounded-xl border border-border bg-background p-4 font-grandstander">
    <div className="h-3 w-32 rounded-full bg-foreground/80" />
    <div className="mt-3 space-y-1.5">
      <div className="h-2 w-full rounded-full bg-muted-foreground/20" />
      <div className="h-2 w-5/6 rounded-full bg-muted-foreground/20" />
      <div className="h-2 w-2/3 rounded-full bg-muted-foreground/20" />
    </div>
  </div>
);

const ExportVisual = () => (
  <div className="rounded-xl border border-border bg-background p-4 font-grandstander">
    <div className="mb-3 flex items-center gap-2 rounded-lg border border-dashed border-primary/50 bg-primary/5 px-3 py-2">
      <span className="flex-1 truncate text-xs text-muted-foreground">
        README.md
      </span>
      <span className="text-xs font-medium text-primary">Ready</span>
    </div>
    <div className="flex items-center gap-2">
      {["👍", "🎉", "🚀"].map((emoji, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 300 }}
          className="flex items-center gap-1 rounded-full border border-border bg-background px-2 py-1 text-sm"
        >
          <span>{emoji}</span>
        </motion.div>
      ))}
    </div>
  </div>
);

const StepVisual = ({ type }) => {
  switch (type) {
    case "blocks":
      return <BlocksVisual />;
    case "reorder":
      return <ReorderVisual />;
    case "preview":
      return <PreviewVisual />;
    case "export":
      return <ExportVisual />;
    default:
      return null;
  }
};

export default function HowItWorksSection() {
  return (
    <section
      className="relative py-24 md:py-32 font-grandstander"
      id="how-it-works"
    >
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 h-full w-full opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 60% 60% at 50% 50%, #000 40%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 text-sm font-medium uppercase tracking-wider text-primary"
          >
            Getting Started
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            From blank to shipped in minutes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-4 max-w-xl text-muted-foreground"
          >
            No complex setup. No account required to try it. Just add blocks,
            arrange them, and export.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-border to-transparent md:block" />

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative"
                >
                  <div className="absolute left-1/2 top-0 z-10 hidden -translate-x-1/2 md:block">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-sm font-semibold text-foreground shadow-sm">
                      {step.step}
                    </div>
                  </div>

                  <div
                    className={cn(
                      "grid items-center gap-8 md:grid-cols-2 md:gap-16",
                      isEven ? "md:text-right" : "md:flex-row-reverse",
                    )}
                  >
                    <div
                      className={cn(
                        "order-2",
                        isEven ? "md:order-1 md:pr-16" : "md:order-2 md:pl-16",
                      )}
                    >
                      <div className="mb-4 flex items-center gap-3 md:hidden">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-sm font-semibold text-foreground">
                          {step.step}
                        </div>
                        <div className="h-px flex-1 bg-border" />
                      </div>

                      <div
                        className={cn(
                          "mb-4 inline-flex items-center justify-center rounded-xl bg-primary/10 p-3",
                          isEven ? "md:ml-auto" : "",
                        )}
                      >
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="mb-2 text-xl font-semibold text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {step.description}
                      </p>
                    </div>

                    <div
                      className={cn(
                        "order-1",
                        isEven ? "md:order-2 md:pl-16" : "md:order-1 md:pr-16",
                      )}
                    >
                      <div className="mx-auto max-w-xs">
                        <StepVisual type={step.visual} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
