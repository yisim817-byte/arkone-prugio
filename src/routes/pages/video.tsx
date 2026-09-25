import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell } from "@/components/site-shell";
import { YoutubeModal } from "@/components/youtube-modal";
import { YOUTUBE_ID } from "@/lib/site-data";

export const Route = createFileRoute("/pages/video")({
  component: VideoPage,
  head: () => ({
    meta: [
      { title: "홍보영상 | 청라 아크원 푸르지오" },
      { name: "description", content: "청라 아크원 푸르지오 홍보영상 모음. 사업 소개 영상을 확인할 수 있습니다." },
    ],
    links: [{ rel: "canonical", href: "https://www.arkone-prugio.site/pages/video" }],
  }),
});

function VideoPage() {
  const [open, setOpen] = useState(false);
  return (
    <SiteShell path="/pages/video">
      <div className="page_content">
        <section className="page_container">
          <div className="video-grid">
            <button type="button" className="video-card" onClick={() => setOpen(true)}>
              <img src={`https://img.youtube.com/vi/${YOUTUBE_ID}/hqdefault.jpg`} alt="" />
              <p>청라 아크원 푸르지오 홍보영상</p>
            </button>
          </div>
        </section>
      </div>
      {open ? <YoutubeModal id={YOUTUBE_ID} title="청라 아크원 푸르지오 홍보영상" onClose={() => setOpen(false)} /> : null}
    </SiteShell>
  );
}
