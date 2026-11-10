import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PrivacyModal } from "@/components/privacy-modal";
import { SubVisual } from "@/components/sub-visual";
import { OtPopups } from "@/components/ot-official";
import { SoonPopups } from "@/components/soon-popups";
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
      {path && path !== "/register" ? <SubVisual path={path} /> : null}
      {children}
      <SiteFooter onPrivacy={() => setPrivacy(true)} />
      {privacy ? <PrivacyModal onClose={() => setPrivacy(false)} /> : null}
      <SoonPopups />
      {/* 작업지시서 16-2: 첫 화면 팝업은 공식 오피스텔·상업시설 팝업 2장만. 기존 팝업(prereg-popup.tsx)은 파일을 두고 렌더만 끈다. */}
      {home && !noPopup ? <OtPopups /> : null}
      {path !== "/register" ? (
        <div className="quick-mo">
          <a href={SITE_TEL_HREF}>전화상담 1833-3872</a>
          <Link to="/register">사전고객등록</Link>
        </div>
      ) : null}
    </div>
  );
}
