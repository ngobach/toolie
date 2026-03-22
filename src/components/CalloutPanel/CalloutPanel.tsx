type CalloutAction = {
  label: string;
};

export type CalloutPanelProps = {
  action: CalloutAction;
  description: string;
  eyebrow: string;
  title: string;
};

export function CalloutPanel({
  action,
  description,
  eyebrow,
  title,
}: CalloutPanelProps) {
  return (
    <section className="rounded-xl border border-primary-400/18 bg-primary-500/8 p-6">
      <p className="text-sm font-medium text-primary-200">{eyebrow}</p>
      <p className="mt-3 text-2xl font-medium text-white">{title}</p>
      <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
      <button
        className="mt-6 rounded-md bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-slate-200"
        type="button"
      >
        {action.label}
      </button>
    </section>
  );
}
