import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { RegisterForm } from "@/components/register-form";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
  head: () => ({
    meta: [
      { title: "APT 사전고객등록 | 청라 아크원 푸르지오" },
      { name: "description", content: "청라 아크원 푸르지오 APT 사전고객등록. 이름·연락처·생년월일 6자리 입력과 개인정보 수집 동의 후 안내를 받을 수 있습니다." },
    ],
    links: [{ rel: "canonical", href: "https://www.arkone-prugio.site/register" }],
  }),
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
