import { PageIntro, PageLayout } from "../../components";

export function GrossToNetPage() {
  return (
    <PageLayout>
      <title>Gross to Net | Toolie</title>
      <div className="py-10">
        <PageIntro
          description="This is a blank placeholder page for the future Gross to Net tool."
          eyebrow="Tools"
          title="Gross to Net"
          variant="compact"
        />
      </div>
    </PageLayout>
  );
}
