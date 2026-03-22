import {
  ActivityPanel,
  CalloutPanel,
  HeroSection,
  PageLayout,
  QuickActionsPanel,
  StatsGrid,
  UtilityGrid,
} from "../../components";

const utilityCards = [
  {
    icon: (
      <svg
        aria-hidden="true"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 4L19 8V16L12 20L5 16V8L12 4Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
        <path
          d="M12 4V20M5 8L12 12L19 8"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    ),
    title: "Deploy Workspaces",
    description:
      "Create project environments with shared defaults, ownership rules, and deployment-ready metadata.",
    meta: "128 active setups",
  },
  {
    icon: (
      <svg
        aria-hidden="true"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          d="M5 17L9 13L12 16L18 10L19 11"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
        <path
          d="M6 19H18"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
        <path
          d="M18 10V14M18 10H14"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    ),
    title: "Inspect Usage",
    description:
      "Review operational load, export audit trails, and monitor usage spikes from a single stream.",
    meta: "Realtime insights",
  },
  {
    icon: (
      <svg
        aria-hidden="true"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          d="M7 7H17"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
        <path
          d="M7 12H13"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
        <path
          d="M7 17H11"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
        <path
          d="M15.5 14.5L18.5 17.5L15.5 20.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    ),
    title: "Automate Cleanup",
    description:
      "Run storage cleanup, retention policies, and recurring housekeeping without manual intervention.",
    meta: "9 queued runs",
  },
  {
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
        <path
          d="M4 10H20"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M8 15H11"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
      </svg>
    ),
    title: "Manage Billing",
    description:
      "Preview invoice cycles, retry failed collections, and issue adjustments for internal service teams.",
    meta: "Healthy status",
  },
];

const highlights = [
  { label: "Monthly runs", value: "12.4k" },
  { label: "Portal users", value: "318" },
  { label: "Response SLA", value: "99.98%" },
];

const activity = [
  "Workspace deployment completed for Northwind Ops.",
  "New retention rule published by the platform team.",
  "Billing reconciliation recovered 14 subscriptions.",
];

const actions = [
  "Create new workspace",
  "Launch cleanup workflow",
  "Export operations report",
];

export function HomePage() {
  return (
    <PageLayout>
      <title>Toolie Home</title>
      <div className="pt-10">
        <div className="grid gap-10 border-b border-white/8 pb-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <HeroSection
            description="A Vercel-inspired portal concept with restrained surfaces, editorial spacing, and clear pathways into deployments, operations, and automation."
            eyebrow="Built for internal platform teams"
            primaryAction={{ label: "Start with deployments" }}
            secondaryAction={{ label: "View recent activity" }}
            title="A calmer, faster place to run the utilities your team depends on."
          />
          <StatsGrid items={highlights} />
        </div>

        <section className="grid gap-12 py-12 lg:grid-cols-[1.1fr_0.9fr]">
          <UtilityGrid items={utilityCards} title="Operational toolkit" />

          <div className="flex flex-col gap-6">
            <ActivityPanel
              description="Changes across the portal in the last 24 hours."
              items={activity}
              title="Latest activity"
            />
            <QuickActionsPanel
              actions={actions.map((label) => ({ label }))}
              title="Quick actions"
            />
            <CalloutPanel
              action={{ label: "Submit request" }}
              description="Draft requirements, assign ownership, and move directly into a scoped implementation request."
              eyebrow="Build the next utility"
              title="Turn repeated manual work into a reliable internal workflow."
            />
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
