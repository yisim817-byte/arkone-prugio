import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PrivacyModal } from "@/components/privacy-modal";
import { SubVisual } from "@/components/sub-visual";

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
      {home ? (
        <div className="quick-mo">
          <Link to="/register">관심고객등록</Link>
          <span>
            <b>10월 OPEN</b>&nbsp;예정
          </span>
        </div>
      ) : null}
    </div>
  );
}
