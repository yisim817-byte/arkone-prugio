import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PrivacyModal } from "@/components/privacy-modal";
import { SubVisual } from "@/components/sub-visual";
import { OtPopups } from "@/components/ot-popups";
import { SITE_TEL_HREF } from "@/lib/site-data";

type Props = {
  children: ReactNode;
  home?: boolean;
  path?: string;
};

export function SiteShell({ children, home, path }: Props) {
  const [privacy, setPrivacy] = useState(false);
  // 작업지시서 16: 팝업은 홈의 오피스텔·상가 사전고객등록 2개만. 기존 팝업·단계 띠는 파일을 두고 렌더만 끈다.

  return (
    <div className={home ? "home-wrap main_wrap" : "sub-wrap"}>
      <SiteHeader home={home} />
      {path && path !== "/register" ? <SubVisual path={path} /> : null}
      {children}
      <SiteFooter onPrivacy={() => setPrivacy(true)} />
      {privacy ? <PrivacyModal onClose={() => setPrivacy(false)} /> : null}
      {home ? <OtPopups /> : null}
      {path !== "/register" ? (
        <div className="quick-mo">
          <a href={SITE_TEL_HREF}>전화상담 1833-3872</a>
          <Link to="/register">사전고객등록</Link>
        </div>
      ) : null}
    </div>
  );
}
