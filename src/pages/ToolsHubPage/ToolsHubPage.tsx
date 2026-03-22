import { PageIntro, PageLayout, ToolCard } from "../../components";

const tools = [
  {
    description:
      "Placeholder page for a future payroll-style utility that converts gross values into net outcomes.",
    icon: (
      <svg
        aria-hidden="true"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
      >
        <rect
          height="12"
          rx="2.5"
          stroke="currentColor"
          strokeWidth="1.8"
          width="16"
          x="4"
          y="6"
        />
        <path d="M4 10H20" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M8 15H11"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
      </svg>
    ),
    title: "Gross to Net",
    to: "/tools/gross-to-net",
  },
];

export function ToolsHubPage() {
  return (
    <PageLayout>
      <title>Tools Hub | Toolie</title>
      <div className="py-10">
        <PageIntro
          description="A placeholder hub for Toolie utilities. This page can later become the main entry point for calculators, workflows, and internal tools."
          eyebrow="Tools"
          title="Tools Hub"
        />

        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard
              description={tool.description}
              icon={tool.icon}
              key={tool.title}
              title={tool.title}
              to={tool.to}
            />
          ))}
        </section>
      </div>
    </PageLayout>
  );
}
