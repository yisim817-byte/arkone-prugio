export const SITE_NAME = "청라 아크원 푸르지오";
export const SITE_PHONE = "1833-3872";
export const SITE_PHONE_DIGITS = SITE_PHONE.replace(/\D/g, "");
export const SITE_TEL_HREF = `tel:${SITE_PHONE_DIGITS}`;
export const YOUTUBE_ID = "_wAuOJSTLek";

export type NavChild = {
  krName: string;
  enName: string;
  to: string;
  disabled?: boolean;
};

export type NavItem = {
  krName: string;
  enName: string;
  to: string;
  disabled?: boolean;
  children: NavChild[];
};

export const NAV: NavItem[] = [
  {
    krName: "사업안내",
    enName: "OVERVIEW",
    to: "/pages/overview",
    children: [
      { krName: "사업개요", enName: "Overview", to: "/pages/overview" },
      { krName: "히스토리", enName: "History", to: "/pages/brand" },
      { krName: "오시는길", enName: "Contact", to: "/pages/contact" },
    ],
  },
  {
    krName: "입지안내",
    enName: "LOCATION",
    to: "/pages/location",
    children: [{ krName: "입지환경", enName: "LOCATION", to: "/pages/location" }],
  },
  {
    krName: "프리미엄",
    enName: "PREMIUM",
    to: "/pages/premium",
    children: [{ krName: "프리미엄", enName: "PREMIUM", to: "/pages/premium" }],
  },
  {
    krName: "청약안내",
    enName: "INFORMATION",
    to: "/pages/changeinfo",
    children: [
      { krName: "변경된 청약제도", enName: "INFORMATION", to: "/pages/changeinfo" },
      { krName: "특별공급 안내", enName: "INFORMATION", to: "/pages/docspecial" },
      { krName: "일반공급 안내", enName: "INFORMATION", to: "/pages/docnormal" },
    ],
  },
  {
    krName: "홍보센터",
    enName: "MEDIA",
    to: "/board/news_list",
    children: [
      { krName: "언론보도", enName: "NEWS", to: "/board/news_list" },
      { krName: "홍보영상", enName: "MEDIA", to: "/pages/video" },
    ],
  },
  {
    krName: "관심고객등록",
    enName: "REGISTER",
    to: "/register",
    children: [{ krName: "관심고객등록", enName: "REGISTER", to: "/register" }],
  },
];

export const PAGE_META: Record<
  string,
  { en: string; kr: string; parentKr: string; parentEn: string }
> = {
  "/pages/overview": { en: "Overview", kr: "사업개요", parentKr: "사업안내", parentEn: "OVERVIEW" },
  "/pages/brand": { en: "History", kr: "히스토리", parentKr: "사업안내", parentEn: "OVERVIEW" },
  "/pages/contact": { en: "Contact", kr: "오시는길", parentKr: "사업안내", parentEn: "OVERVIEW" },
  "/pages/location": { en: "LOCATION", kr: "입지환경", parentKr: "입지안내", parentEn: "LOCATION" },
  "/pages/premium": { en: "PREMIUM", kr: "프리미엄", parentKr: "프리미엄", parentEn: "PREMIUM" },
  "/pages/changeinfo": {
    en: "INFORMATION",
    kr: "변경된 청약제도",
    parentKr: "청약안내",
    parentEn: "INFORMATION",
  },
  "/pages/docspecial": {
    en: "INFORMATION",
    kr: "특별공급 안내",
    parentKr: "청약안내",
    parentEn: "INFORMATION",
  },
  "/pages/docnormal": {
    en: "INFORMATION",
    kr: "일반공급 안내",
    parentKr: "청약안내",
    parentEn: "INFORMATION",
  },
  "/board/news_list": { en: "NEWS", kr: "언론보도", parentKr: "홍보센터", parentEn: "MEDIA" },
  "/pages/video": { en: "MEDIA", kr: "홍보영상", parentKr: "홍보센터", parentEn: "MEDIA" },
  "/register": { en: "REGISTER", kr: "관심고객등록", parentKr: "관심고객등록", parentEn: "REGISTER" },
};

export function navForPath(pathname: string) {
  return NAV.find((item) => item.to === pathname || item.children.some((c) => c.to === pathname));
}
