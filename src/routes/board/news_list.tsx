import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteShell } from "@/components/site-shell";
import { NEWS, type NewsItem } from "@/lib/news";

export const Route = createFileRoute("/board/news_list")({
  component: NewsListPage,
  head: () => ({
    meta: [
      { title: "언론보도 | 청라 아크원 푸르지오" },
      { name: "description", content: "청라 아크원 푸르지오 관련 언론보도 목록. 기사 원문은 각 언론사 기준입니다." },
    ],
    links: [{ rel: "canonical", href: "https://www.arkone-prugio.site/board/news_list" }],
  }),
});

const PAGE_SIZE = 6;

function NewsListPage() {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<NewsItem | null>(null);
  const pages = Math.ceil(NEWS.length / PAGE_SIZE);
  const items = useMemo(() => NEWS.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), [page]);

  return (
    <SiteShell path="/board/news_list">
      <div className="page_content">
        <section className="page_container">
          <div className="news_list_type">
            <ul>
              {items.map((item) => (
                <li key={item.id}>
                  <button type="button" className="news-card" onClick={() => setSelected(item)}>
                    <div>
                      <span className="media">{item.media}</span>
                      <dl>
                        <dt>{item.title}</dt>
                      </dl>
                      <div className="news_content">
                        <p>{item.content}</p>
                      </div>
                    </div>
                    <div className="news_b">
                      <h3>VIEW</h3>
                      <span className="date">{item.date}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="news-pager">
            <button type="button" onClick={() => setPage(1)} disabled={page === 1} aria-label="첫페이지로">
              «
            </button>
            <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} aria-label="이전">
              ‹
            </button>
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <button key={n} type="button" className={n === page ? "is-on" : ""} onClick={() => setPage(n)}>
                {n}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              disabled={page === pages}
              aria-label="다음"
            >
              ›
            </button>
            <button type="button" onClick={() => setPage(pages)} disabled={page === pages} aria-label="마지막페이지로">
              »
            </button>
          </div>
        </section>
      </div>
      {selected ? (
        <div className="modal-dim" onClick={() => setSelected(null)}>
          <div className="news-modal" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="modal-close" onClick={() => setSelected(null)} aria-label="닫기">
              ×
            </button>
            <p className="media" style={{ color: "#003a35", fontWeight: 700 }}>
              {selected.media}
            </p>
            <h2>{selected.title}</h2>
            <p style={{ color: "#707070", marginBottom: 20 }}>{selected.date}</p>
            <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.8 }}>{selected.content}</p>
          </div>
        </div>
      ) : null}
    </SiteShell>
  );
}
