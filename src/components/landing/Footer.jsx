import { FaGithub } from "react-icons/fa";
import logo from "../../assets/favicon.svg";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border font-grandstander bg-background py-16">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="pointer-events-none absolute left-1/4 top-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="flex items-center gap-2">
            {/* <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black">
              <img src={logo} alt="ReadmeForge" className="h-5 w-5" />
            </div> */}
            <span className="text-xl font-bold tracking-tight">
              ReadmeForge
            </span>
          </div>

          <p className="max-w-md bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-center text-base font-medium text-transparent">
            The simplest way to build beautiful, GitHub-ready READMEs.
          </p>

          <div className="h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="flex flex-col items-center space-y-2">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} ReadmeForge. All rights
              reserved.
            </p>
            <p className="text-base text-muted-foreground">
              Made by{" "}
              <a
                href="https://github.com/byllzz"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground transition-colors duration-200 hover:text-primary"
              >
                byllzz
              </a>
            </p>
          </div>

          <a
            href="https://github.com/byllzz/readmeforge"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            title="View on GitHub"
          >
            <FaGithub size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
