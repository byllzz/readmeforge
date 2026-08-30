import { motion } from "framer-motion";
import {
  MousePointer2,
  Eye,
  DownloadCloud,
  Sparkles,
  Lock,
  BadgeCheck,
  Code2,
  FileText,
} from "lucide-react";
import { cn } from "../../lib/utils";

const features = [
  {
    title: "Visual Block Editor",
    description:
      "Drag and drop title, badges, features, install steps, and more into place. No markdown headaches, ever.",
    icon: MousePointer2,
    className: "md:col-span-2 md:row-span-2",
    size: "large",
  },
  {
    title: "Live Preview",
    description: "See exactly how your README renders on GitHub, instantly.",
    icon: Eye,
    className: "md:col-span-1",
    size: "small",
  },
  {
    title: "One-Click Export",
    description: "Copy or download a clean, ready-to-commit README.md.",
    icon: DownloadCloud,
    className: "md:col-span-1",
    size: "small",
  },
  {
    title: "Badges & Shields",
    description:
      "Add build status, version, license, and custom badges from shields.io without touching markdown syntax.",
    icon: BadgeCheck,
    className: "md:col-span-2",
    size: "medium",
  },
  {
    title: "Code Blocks",
    description: "Syntax-highlighted install and usage snippets.",
    icon: Code2,
    className: "md:col-span-1",
    size: "small",
  },
  {
    title: "Works Offline",
    description: "Everything runs in your browser. Nothing leaves your machine.",
    icon: Lock,
    className: "md:col-span-1",
    size: "small",
  },
  {
    title: "Ready-Made Sections",
    description: "Installation, usage, contributing, license — pre-built.",
    icon: FileText,
    className: "md:col-span-1",
    size: "small",
  },
  {
    title: "Clean Interface",
    description: "A calm, distraction-free editor that stays out of your way.",
    icon: Sparkles,
    className: "md:col-span-1",
    size: "small",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// Mini block-list preview for the large card
const BlockListPreview = () => (
  <div className="mt-6 space-y-2 rounded-xl border border-border bg-background/50 p-4">
    {[
      { label: "Title", icon: "H" },
      { label: "Badges", icon: "✓" },
      { label: "Description", icon: "≡" },
    ].map((block, idx) => (
      <motion.div
        key={idx}
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 + idx * 0.1 }}
        className="flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-2"
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-semibold text-muted-foreground">
          {block.icon}
        </span>
        <span className="flex-1 text-sm text-foreground">{block.label}</span>
        <span className="text-xs text-muted-foreground">⠿⠿</span>
      </motion.div>
    ))}
    <div className="flex items-center gap-2 rounded-lg border border-dashed border-border px-3 py-2 text-xs text-muted-foreground">
      + Add block
    </div>
  </div>
);

// Live preview mini window
const PreviewMini = () => (
  <div className="mt-3 rounded-lg border border-border bg-background p-3">
    <div className="h-2 w-16 rounded-full bg-foreground/80" />
    <div className="mt-2 h-1.5 w-full rounded-full bg-muted-foreground/20" />
    <div className="mt-1.5 h-1.5 w-3/4 rounded-full bg-muted-foreground/20" />
  </div>
);

// Export buttons mini
const ExportMini = () => (
  <div className="mt-3 flex items-center gap-2">
    <span className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-muted-foreground">
      Copy
    </span>
    <span className="flex items-center gap-1.5 rounded-lg bg-primary px-2.5 py-1.5 text-xs text-primary-foreground">
      Download
    </span>
  </div>
);

// Badges preview
const BadgesPreview = () => (
  <div className="mt-4 flex flex-wrap gap-2">
    {[
      { label: "build", value: "passing", color: "bg-emerald-500" },
      { label: "version", value: "1.0.0", color: "bg-blue-500" },
      { label: "license", value: "MIT", color: "bg-zinc-500" },
    ].map((badge, idx) => (
      <motion.div
        key={idx}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 + idx * 0.05 }}
        className="flex items-center overflow-hidden rounded-md text-[11px] font-medium"
      >
        <span className="bg-zinc-700 px-2 py-1 text-white">{badge.label}</span>
        <span className={cn("px-2 py-1 text-white", badge.color)}>
          {badge.value}
        </span>
      </motion.div>
    ))}
  </div>
);

export default function AboutSection() {
  return (
    <section className="relative py-24 md:py-32 font-grandstander" id="about">
      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 text-sm font-medium uppercase tracking-wider text-primary"
          >
            About
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Everything your README needs
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-4 max-w-xl text-muted-foreground"
          >
            A visual block editor, live preview, and one-click export — no
            markdown skills required, no clutter, no sign-up.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-3 md:grid-cols-4 md:gap-4"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isLarge = feature.size === "large";
            const isMedium = feature.size === "medium";

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-primary/20 bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5",
                  feature.className,
                  isLarge && "p-8",
                )}
              >
                <div
                  className={cn(
                    "mb-4 inline-flex items-center justify-center rounded-xl bg-primary/10 p-2.5 text-primary",
                    isLarge && "mb-5 p-3",
                  )}
                >
                  <Icon className={cn("h-5 w-5", isLarge && "h-6 w-6")} />
                </div>

                <h3
                  className={cn(
                    "mb-2 font-semibold text-foreground",
                    isLarge && "mb-3 text-xl",
                    isMedium && "text-lg",
                  )}
                >
                  {feature.title}
                </h3>
                <p
                  className={cn(
                    "text-sm leading-relaxed text-muted-foreground",
                    isLarge && "text-base",
                  )}
                >
                  {feature.description}
                </p>

                {feature.title === "Visual Block Editor" && (
                  <BlockListPreview />
                )}
                {feature.title === "Live Preview" && <PreviewMini />}
                {feature.title === "One-Click Export" && <ExportMini />}
                {feature.title === "Badges & Shields" && <BadgesPreview />}

                <div className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-primary/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
