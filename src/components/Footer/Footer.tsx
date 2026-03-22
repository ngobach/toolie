export type FooterProps = {
  copyrightText?: string;
};

export function Footer({
  copyrightText = "© 2026 Toolie. Built for internal operations and shared utilities.",
}: FooterProps) {
  return (
    <footer className="border-t border-white/8 py-6 text-center text-sm text-slate-500">
      <p>{copyrightText}</p>
    </footer>
  );
}
