import { useState } from "react";
import { Link } from "react-router-dom";

export type HeaderNavItem = {
  label: string;
  to: string;
};

export type HeaderAction = {
  label: string;
  to?: string;
};

export type HeaderBrand = {
  monogram: string;
  name: string;
};

export type HeaderProps = {
  brand: HeaderBrand;
  navItems: HeaderNavItem[];
  primaryAction?: HeaderAction;
};

export const defaultHeaderProps: HeaderProps = {
  brand: {
    monogram: "TU",
    name: "Toolie",
  },
  navItems: [
    { label: "Home", to: "/" },
    { label: "Tools", to: "/tools" },
  ],
  primaryAction: {
    label: "Request new tool",
    to: "/contact-us",
  },
};

function ActionLink({ action, className }: { action: HeaderAction; className: string }) {
  if (action.to) {
    return (
      <Link className={className} to={action.to}>
        {action.label}
      </Link>
    );
  }

  return (
    <button className={className} type="button">
      {action.label}
    </button>
  );
}

export function Header({
  brand,
  navItems,
  primaryAction = defaultHeaderProps.primaryAction,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-4 z-10 rounded-2xl border border-white/8 bg-black/55 backdrop-blur-xl">
      <div className="px-5 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <Link
            className="flex items-center gap-3 rounded-md transition hover:opacity-90"
            to="/"
          >
            <div className="relative grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
              <div className="h-4 w-4 rounded-sm bg-white" />
              <div className="absolute bottom-2 right-2 h-2 w-2 rounded-full bg-primary-400" />
            </div>
            <p className="text-sm font-medium text-white">{brand.name}</p>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            <nav aria-label="Primary" className="flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  className="rounded-md px-3 py-2 text-sm text-slate-400 transition hover:bg-white/6 hover:text-white"
                  key={item.label}
                  to={item.to}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            {primaryAction ? (
              <ActionLink
                action={primaryAction}
                className="ml-1 rounded-md border border-white/10 bg-white px-3.5 py-2 text-sm font-medium text-black transition hover:bg-slate-200"
              />
            ) : null}
          </div>

          <button
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
            className="grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-white/4 text-slate-200 transition hover:bg-white/8 lg:hidden"
            onClick={() => setIsMenuOpen((value) => !value)}
            type="button"
          >
            <span className="relative h-4 w-4">
              <span
                className={`absolute left-0 top-1/2 h-px w-4 -translate-y-[5px] bg-current transition duration-200 ${isMenuOpen ? "translate-y-0 rotate-45" : ""}`}
              />
              <span
                className={`absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current transition duration-200 ${isMenuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`absolute left-0 top-1/2 h-px w-4 translate-y-[5px] bg-current transition duration-200 ${isMenuOpen ? "translate-y-0 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>

        <div
          aria-hidden={!isMenuOpen}
          className={`overflow-hidden transition-all duration-300 ease-out lg:hidden ${isMenuOpen ? "mt-4 max-h-80 opacity-100" : "max-h-0 opacity-0"}`}
          id="mobile-menu"
        >
          <div
            className={`border-t border-white/8 pt-4 transition-transform duration-300 ease-out ${isMenuOpen ? "translate-y-0" : "-translate-y-2"}`}
          >
            <nav aria-label="Mobile primary" className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  className="rounded-md px-3 py-3 text-sm text-slate-300 transition hover:bg-white/6 hover:text-white"
                  key={item.label}
                  onClick={() => setIsMenuOpen(false)}
                  to={item.to}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            {primaryAction ? (
              <div className="mt-3">
                <ActionLink
                  action={primaryAction}
                  className="block w-full rounded-md border border-white/10 bg-white px-3.5 py-3 text-center text-sm font-medium text-black transition hover:bg-slate-200"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
