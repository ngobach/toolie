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
    title: "Deploy Workspaces",
    description:
      "Create project environments with shared defaults, ownership rules, and deployment-ready metadata.",
    meta: "128 active setups",
  },
  {
    title: "Inspect Usage",
    description:
      "Review operational load, export audit trails, and monitor usage spikes from a single stream.",
    meta: "Realtime insights",
  },
  {
    title: "Automate Cleanup",
    description:
      "Run storage cleanup, retention policies, and recurring housekeeping without manual intervention.",
    meta: "9 queued runs",
  },
  {
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
