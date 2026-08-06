import { BLOCK_TYPES } from "./blocks.js";

export function blocksToMarkdown(blocks) {
  const result = blocks
    .map((b) => blockToMd(b.type, b.content))
    .filter(Boolean)
    .join("\n\n"); // single blank line between blocks
  return result;
}

function blockToMd(type, c) {
  switch (type) {
    case BLOCK_TYPES.TITLE:
      return [`# ${c.name || "Project"}`, c.tagline ? `> ${c.tagline}` : ""]
        .filter(Boolean)
        .join("\n");

    case BLOCK_TYPES.BADGES:
      return (c.badges || [])
        .map((b) =>
          b.link
            ? `[![${b.label}](${b.url})](${b.link})`
            : `![${b.label}](${b.url})`,
        )
        .join(" ");

    case BLOCK_TYPES.DESCRIPTION:
      return c.text || "";

    case BLOCK_TYPES.FEATURES:
      return `## ✨ Features\n${(c.items || []).map((f) => `- ${f}`).join("\n")}`;

    case BLOCK_TYPES.INSTALLATION: {
      const mgr = c.manager || "npm";
      const pkg = c.package || "your-package";
      const cmd =
        mgr === "yarn"
          ? `yarn add ${pkg}`
          : mgr === "pnpm"
            ? `pnpm add ${pkg}`
            : mgr === "bun"
              ? `bun add ${pkg}`
              : `npm install ${pkg}`;
      const extra = c.extra ? `\n\n\`\`\`bash\n${c.extra}\n\`\`\`` : "";
      return `## 🚀 Installation\n\n\`\`\`bash\n${cmd}\n\`\`\`${extra}`;
    }

    case BLOCK_TYPES.USAGE:
      return `## 📖 Usage\n\n\`\`\`${c.language || "js"}\n${c.code || ""}\n\`\`\``;

    case BLOCK_TYPES.SCREENSHOTS: {
      const items = c.items || [];
      const validImages = items.filter(
        (i) => i.url && typeof i.url === "string" && i.url.trim() !== "",
      );

      if (validImages.length === 0) return "";

      const imgs = validImages
        .map((i) => {
          const alt = i.alt || "Screenshot";
          const url = i.url.trim();

          // Safety net: base64 data: URLs should never reach this point
          // (uploads are hosted via /api/upload and stored as real https
          // links), but if one ever slips through — a failed upload that
          // got saved, or an old workspace from before this fix — never
          // write the raw base64 into the exported markdown. Swap in a
          // clear placeholder instead so the README stays small and the
          // person knows to re-upload that image.
          if (url.startsWith("data:")) {
            const caption = i.caption ? `\n\n*${i.caption}*` : "";
            return `![${alt}](REPLACE_WITH_HOSTED_IMAGE_URL)${caption}`;
          }

          const caption = i.caption ? `\n\n*${i.caption}*` : "";
          return `![${alt}](${url})${caption}`;
        })
        .join("\n\n");

      return `## 📸 Screenshots\n\n${imgs}`;
    }

    case BLOCK_TYPES.API: {
      const rows = (c.entries || [])
        .map(
          (e) =>
            `### \`${e.name}\`\n${e.description}${e.params ? `\n\n**Params:** ${e.params}` : ""}`,
        )
        .join("\n\n");
      return `## 📚 API\n\n${rows || "_No entries yet._"}`;
    }

    case BLOCK_TYPES.CONTRIBUTING: {
      const steps = (c.steps || []).map((s, i) => `${i + 1}. ${s}`).join("\n");
      return `## 🤝 Contributing\n\n${c.text || ""}\n\n${steps}`;
    }

    case BLOCK_TYPES.LICENSE:
      return `## 📄 License\n\nDistributed under the **${c.type || "MIT"}** License.\n\n© ${c.year || new Date().getFullYear()} ${c.author || "Your Name"}`;

    case BLOCK_TYPES.CUSTOM:
      return c.markdown || "";

    default:
      return "";
  }
}
