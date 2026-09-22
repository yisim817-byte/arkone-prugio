import { YOUTUBE_ID } from "@/lib/site-data";

export function YoutubeModal({
  id = YOUTUBE_ID,
  title = "청라 아크원 홍보영상",
  onClose,
}: {
  id?: string;
  title?: string;
  onClose: () => void;
}) {
  return (
    <div className="modal-dim" onClick={onClose} role="dialog" aria-modal="true">
      <div className="video-frame" onClick={(e) => e.stopPropagation()}>
        <iframe
          title={title}
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
    </div>
  );
}
