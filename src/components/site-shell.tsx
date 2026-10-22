import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PrivacyModal } from "@/components/privacy-modal";
import { SubVisual } from "@/components/sub-visual";
import { PreregPopup } from "@/components/prereg-popup";
import { CostcoEventPopup } from "@/components/CostcoEventPopup";
import { VisitReservationPopup } from "@/components/VisitReservationPopup";
import { PhaseBand } from "@/components/phase-band";
import { SITE_TEL_HREF } from "@/lib/site-data";

type Props = {
  children: ReactNode;
  home?: boolean;
  path?: string;
};

export function SiteShell({ children, home, path }: Props) {
  const [privacy, setPrivacy] = useState(false);
  // 작업지시서 13: 신청 페이지(사전고객등록·방문예약)와 처리방침에서는 팝업을 띄우지 않는다.
  const noPopup = path === "/register" || path === "/visit" || path === "/privacy";

  return (
    <div className={home ? "home-wrap main_wrap" : "sub-wrap"}>
      <SiteHeader home={home} />
      <PhaseBand />
      {path ? <SubVisual path={path} /> : null}
      {children}
      <SiteFooter onPrivacy={() => setPrivacy(true)} />
      {privacy ? <PrivacyModal onClose={() => setPrivacy(false)} /> : null}
      {noPopup ? null : <PreregPopup />}
      {noPopup ? null : <CostcoEventPopup />}
      {noPopup ? null : <VisitReservationPopup />}
      {path !== "/register" ? (
        <div className="quick-mo">
          <a href={SITE_TEL_HREF}>전화상담 1833-3872</a>
          <Link to="/register">사전고객등록</Link>
        </div>
      ) : null}
    </div>
  );
}
