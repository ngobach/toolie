export type QuickActionItem = {
  actionLabel?: string;
  label: string;
};

export type QuickActionsPanelProps = {
  actions: QuickActionItem[];
  title: string;
};

export function QuickActionsPanel({
  actions,
  title,
}: QuickActionsPanelProps) {
  return (
    <section className="rounded-xl border border-white/8 bg-gradient-to-b from-white/[0.04] to-white/[0.02] p-6">
      <p className="text-sm font-medium text-white">{title}</p>
      <div className="mt-5 grid gap-3">
        {actions.map((action) => (
          <button
            className="flex items-center justify-between rounded-lg border border-white/8 bg-black/30 px-4 py-3 text-left text-sm text-slate-300 transition hover:border-primary-400/24 hover:text-white"
            key={action.label}
            type="button"
          >
            {action.label}
            <span className="text-primary-200">{action.actionLabel ?? "Run"}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
