import type { ImgHTMLAttributes } from "react";
import dims from "@/lib/image-dims.json";

// SEO_PUSH 2026-10-06 P1-5: below-the-fold images get loading="lazy" (which also stops React SSR
// from emitting <link rel="preload" as="image"> for them) plus intrinsic width/height to reserve space.
// Rendered size is unchanged: styles.css sets `:where(img[data-dims]) { width: auto; height: auto }` at zero specificity,
// so the attributes only supply aspect-ratio and any existing CSS sizing still wins.
const DIMS = dims as unknown as Record<string, [number, number] | null>;

export function imgDims(src: string): { width?: number; height?: number } {
  const d = DIMS[src.split("?")[0]];
  return d ? { width: d[0], height: d[1] } : {};
}

type Props = ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string };

export function Img({ src, alt, ...rest }: Props) {
  // Explicit width/height from the caller keep their original meaning (rendered size); only json dims get data-dims.
  const auto = rest.width == null && rest.height == null ? { ...imgDims(src), "data-dims": "" } : {};
  return <img src={src} alt={alt} loading="lazy" decoding="async" {...auto} {...rest} />;
}
