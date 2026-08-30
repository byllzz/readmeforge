import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "../../lib/utils";
import logo from "../../assets/favicon.svg";

const menuItems = [
  { name: "Features", href: "#about" },
  { name: "How it works", href: "#how-it-works" },
  { name: "CTA", href: "#cta" },
];

export default function LandingHeader() {
  const [menuState, setMenuState] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="font-grandstander">
      <nav
        data-state={menuState && "active"}
        className="fixed z-20 w-full px-2"
      >
        <div
          className={cn(
            "mx-auto mt-2 max-w-[1120px] px-6 transition-all duration-300 lg:px-12",
            isScrolled &&
              "max-w-5xl rounded-2xl border border-border bg-background/70 backdrop-blur-lg lg:px-5",
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Link to="/" className="flex items-center gap-2">
                {/* <div className="flex h-7 w-7 items-center justify-center rounded-md bg-black">
                  <img src={logo} alt="ReadmeForge" className="h-4 w-4" />
                </div> */}
                <span className="text-xl font-bold tracking-tight text-foreground">
                  ReadmeForge
                </span>
              </Link>

              <button
                type="button"
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="relative z-20 flex h-9 w-9 items-center justify-center rounded-md border border-border lg:hidden"
              >
                <Menu
                  className={cn(
                    "m-auto size-4 duration-200",
                    menuState && "rotate-180 scale-0 opacity-0",
                  )}
                />
                <X
                  className={cn(
                    "absolute inset-0 m-auto size-4 -rotate-180 scale-0 opacity-0 duration-200",
                    menuState && "rotate-0 scale-100 opacity-100",
                  )}
                />
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-base">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="block text-muted-foreground duration-150 hover:text-foreground"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={cn(
                "mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-border bg-background p-6 shadow-2xl md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-4 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none",
                menuState && "flex",
              )}
            >
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="block text-muted-foreground duration-150 hover:text-foreground"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Link
                  to="/login"
                  className={cn(
                    "inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90",
                    isScrolled && "lg:hidden",
                  )}
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className={cn(
                    "inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90",
                    isScrolled ? "lg:inline-flex" : "hidden",
                  )}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
