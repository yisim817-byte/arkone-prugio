import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PrivacyModal } from "@/components/privacy-modal";
import { SubVisual } from "@/components/sub-visual";
import { PreregPopup } from "@/components/prereg-popup";
import { SITE_TEL_HREF } from "@/lib/site-data";

type Props = {
  children: ReactNode;
  home?: boolean;
  path?: string;
};

export function SiteShell({ children, home, path }: Props) {
  const [privacy, setPrivacy] = useState(false);

  return (
    <div className={home ? "home-wrap main_wrap" : "sub-wrap"}>
      <SiteHeader home={home} />
      {path ? <SubVisual path={path} /> : null}
      {children}
      <SiteFooter onPrivacy={() => setPrivacy(true)} />
      {privacy ? <PrivacyModal onClose={() => setPrivacy(false)} /> : null}
      {path === "/register" ? null : <PreregPopup />}
      {path !== "/register" ? (
        <div className="quick-mo">
          <a href={SITE_TEL_HREF}>전화상담 1833-3872</a>
          <Link to="/register">사전고객등록</Link>
        </div>
      ) : null}
    </div>
  );
}
