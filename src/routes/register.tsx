import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { RegisterForm } from "@/components/register-form";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
  head: () => ({ meta: [{ title: "관심고객등록 | 청라 아크원 푸르지오" }] }),
});

function RegisterPage() {
  return (
    <SiteShell path="/register">
      <div className="page_content">
        <section className="page_container">
          <RegisterForm />
        </section>
      </div>
    </SiteShell>
  );
}
