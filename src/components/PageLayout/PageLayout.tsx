import type { ReactNode } from "react";
import { Footer } from "../Footer";
import { Header, defaultHeaderProps } from "../Header";

type MaxWidth = "6xl" | "7xl" | "full";

export type PageLayoutProps = {
  children: ReactNode;
  footer?: ReactNode | false;
  header?: ReactNode | false;
  maxWidth?: MaxWidth;
};

const maxWidthClassNames: Record<MaxWidth, string> = {
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
  full: "max-w-none",
};

export function PageLayout({
  children,
  footer,
  header,
  maxWidth = "6xl",
}: PageLayoutProps) {
  const resolvedHeader =
    header === undefined ? <Header {...defaultHeaderProps} /> : header;
  const resolvedFooter = footer === undefined ? <Footer /> : footer;

  return (
    <div className="min-h-screen px-4 py-5 text-slate-100 sm:px-6 lg:px-8">
      <div
        className={`mx-auto flex min-h-[calc(100vh-2.5rem)] flex-col ${maxWidthClassNames[maxWidth]}`}
      >
        {resolvedHeader}
        <main className="flex-1">{children}</main>
        {resolvedFooter}
      </div>
    </div>
  );
}
