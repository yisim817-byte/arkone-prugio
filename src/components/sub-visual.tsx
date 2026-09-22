import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { NAV, PAGE_META } from "@/lib/site-data";

export function SubVisual({ path }: { path: string }) {
  const meta = PAGE_META[path];
  const parent = NAV.find((n) => n.krName === meta?.parentKr);
  const [open, setOpen] = useState<"parent" | "child" | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (!meta || !parent) return null;

  return (
    <>
      <section className="sub_visual">
        <div className="sub_visual__image">
          <picture>
            <source media="(max-width: 1024px)" srcSet="/resources/img/common/sub_visual_img_m.v4.jpg" />
            <img src="/resources/img/common/sub_visual_img.v4.jpg" alt="" />
          </picture>
        </div>
        <div className="sub_visual__content">
          <h2 className="sub_visual__title">{meta.en}</h2>
          <p className="sub_visual__text">{meta.parentKr}</p>
        </div>
      </section>
      <div className="page_location">
        <nav className="page_location__container" aria-label="현재 위치">
          <Link to="/" className="page_location__home" aria-label="홈">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" aria-hidden="true">
              <path
                fill="currentColor"
                d="M16.898 7.99 8.753.102a.367.367 0 0 0-.506 0L.102 7.991c-.22.213-.062.575.254.575h.835c.195 0 .355.152.355.338v7.756c0 .186.16.338.355.338h3.863v-6.103c0-.186.16-.339.355-.339h4.762c.196 0 .355.153.355.339v6.103H15.1a.35.35 0 0 0 .355-.338V8.904c0-.186.16-.338.356-.338h.835c.315 0 .475-.362.253-.575"
              />
            </svg>
          </Link>
          <div className="page_location__crumb">
            <button type="button" className="page_location__toggle" onClick={() => setOpen(open === "parent" ? null : "parent")}>
              {meta.parentKr}
            </button>
            <ul className="page_location__menu" hidden={open !== "parent"}>
              {NAV.filter((n) => !n.disabled).map((n) => (
                <li key={n.krName}>
                  <Link to={n.to} className={n.krName === meta.parentKr ? "is-current" : ""}>
                    {n.krName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="page_location__crumb">
            <button
              type="button"
              className="page_location__toggle is-current"
              onClick={() => setOpen(open === "child" ? null : "child")}
            >
              {meta.kr}
            </button>
            <ul className="page_location__menu" hidden={open !== "child"}>
              {parent.children
                .filter((c) => !c.disabled)
                .map((c) => (
                  <li key={c.krName}>
                    <Link to={c.to} className={c.to === pathname ? "is-current" : ""}>
                      {c.krName}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}
