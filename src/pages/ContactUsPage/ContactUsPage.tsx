import { PageIntro, PageLayout } from "../../components";

export function ContactUsPage() {
  return (
    <PageLayout>
      <title>Contact Us | Toolie</title>
      <div className="py-10">
        <PageIntro
          description="This page is under construction."
          eyebrow="Contact"
          title="Contact Us"
        />
      </div>
    </PageLayout>
  );
}
