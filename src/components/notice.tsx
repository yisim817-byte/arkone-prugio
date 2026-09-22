export function SubNotice({ items }: { items: string[] }) {
  return (
    <aside className="sub_notice">
      <strong aria-hidden="true">!</strong>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}

export function ZoomButton({ href, label = "크게보기" }: { href: string; label?: string }) {
  return (
    <div className="sub_zoom mflex-only">
      <a className="sub_zoom_button" href={href} target="_blank" rel="noopener noreferrer">
        <img src="/resources/img/sub/ico_zoom.svg" alt="" />
        <span>{label}</span>
      </a>
    </div>
  );
}
