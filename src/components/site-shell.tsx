import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PrivacyModal } from "@/components/privacy-modal";
import { SubVisual } from "@/components/sub-visual";
import { PreregPopup } from "@/components/prereg-popup";
import { CostcoEventPopup } from "@/components/CostcoEventPopup";
import { OpenEventPopup } from "@/components/OpenEventPopup";
import { PhaseBand } from "@/components/phase-band";
import { SITE_TEL_HREF } from "@/lib/site-data";

type Props = {
  children: ReactNode;
  home?: boolean;
  path?: string;
};

export function SiteShell({ children, home, path }: Props) {
  const [privacy, setPrivacy] = useState(false);
  // 작업지시서 14: 방문예약 팝업은 렌더하지 않는다(파일은 유지). 3번째 자리는 오픈 이벤트 팝업.
  const noPopup = path === "/register" || path === "/visit" || path === "/event" || path === "/privacy";

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
      {noPopup ? null : <OpenEventPopup />}
      {path !== "/register" ? (
        <div className="quick-mo">
          <a href={SITE_TEL_HREF}>전화상담 1833-3872</a>
          <Link to="/register">사전고객등록</Link>
        </div>
      ) : null}
    </div>
  );
}
