import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { canonicalLinks, tx } from "@/lib/seo-host";
import { META } from "@/lib/i18n/en";
import { SITE_PHONE, SITE_TEL_HREF } from "@/lib/site-data";

const DESC = "청라 아크원 푸르지오 견본주택(인천광역시 서해구 청라동 87-1)은 별도 공지 시까지 운영합니다. 방문예약은 1833-3872로 문의하세요.";

export const Route = createFileRoute("/event")({
  component: EventPage,
  head: () => ({
    meta: [
      { title: tx("견본주택 안내 | 청라 아크원 푸르지오", "MODEL HOUSE") },
      { name: "description", content: tx(DESC, META.event.desc) },
    ],
    links: canonicalLinks("/event"),
  }),
});

function EventPage() {
  return (
    <SiteShell path="/event">
      <article className="oe">
        <header className="oe-hero">
          <p className="oe-hero__eye">MODEL HOUSE</p>
          <h1>{tx("견본주택 안내", "MODEL HOUSE")}</h1>
          <p className="oe-hero__sub">{tx("별도 공지 시까지 운영", "Open until further notice")} · {tx("인천광역시 서해구 청라동 87-1 견본주택", "Model house at 87-1 Cheongna-dong Seohae-gu Incheon")}</p>
          <div className="oe-hero__actions">
            <Link className="oe-btn oe-btn--gold" to="/visit">{tx("방문예약", "Book a visit")}</Link>
            <a className="oe-btn oe-btn--line" href={SITE_TEL_HREF}>{tx("전화 문의", "Call")} {SITE_PHONE}</a>
          </div>
        </header>

        <div className="oe-cta">
          <Link className="oe-btn oe-btn--solid" to="/visit">방문예약</Link>
          <Link className="oe-btn oe-btn--line-dark" to="/register">사전고객등록</Link>
          <a className="oe-btn oe-btn--line-dark" href={SITE_TEL_HREF}>전화 문의 {SITE_PHONE}</a>
        </div>
      </article>
    </SiteShell>
  );
}
