// English copy for www.arkone-prugio.site. Facts follow the Korean screen.
// "official" is used only for the Korean phrase 공식 발표.

import { prices } from "@/lib/notice-facts.v1.json";

export const META = {
  home: {
    title: "Cheongna Ark-One Prugio | Guide",
    desc: "Notice posted 22 Oct 2026. Model house opens 30 Oct. Contract 22-24 Nov. Apt 868 units.",
  },
  overview: {
    title: "Ark-One Overview | 868 Units",
    desc: "Cheongna-dong 86-1 M5. B5 to 49F six buildings. Apt 868 and officetel 987. Daewoo E&C.",
    h1: "Cheongna Ark-One Prugio project overview",
  },
  compare: {
    title: "Ark-One Apt and Officetel",
    desc: "Compare Apt 868 units (84 and 103 sqm) with officetel 987 rooms at 105 121 and 136 sqm.",
    h1: "Cheongna Ark-One Prugio apartment and officetel",
  },
  schedule: {
    title: "Ark-One Price and Schedule",
    desc: "Notice posted 22 Oct 2026. Special supply 2 Nov. Contract 22-24 Nov. Call 1833-3872.",
    h1: "Cheongna Ark-One Prugio sale schedule",
  },
  location: {
    title: "Ark-One Location | M5 Block",
    desc: "Cheongna-dong 86-1 M5. Sky Bridge is open. Line 7 station is planned and not dated.",
    h1: "Cheongna Ark-One Prugio location",
  },
  contact: {
    title: "Ark-One Model House | Visit",
    desc: "Model house at Cheongna-dong 87-1. Grand open 30 Oct. Notice posted 22 Oct. Call 1833-3872.",
    h1: "Cheongna Ark-One Prugio model house",
  },
  brand: {
    title: "Ark-One History | Nearby Plans",
    desc: "Nearby development timeline for Cheongna Ark-One Prugio. Dates are plans and may change.",
    h1: "Cheongna Ark-One Prugio history and nearby plans",
  },
  premium: {
    title: "Ark-One Premium | Features",
    desc: "Brand town of 2911 units and rooms with Peakone. A price cap applies. Some units have views.",
    h1: "Cheongna Ark-One Prugio premium",
  },
  changeinfo: {
    title: "Ark-One Application Changes",
    desc: "Application rule changes to check before applying. Use the notice posted on 22 Oct 2026.",
    h1: "Application rule changes to check first",
  },
  docspecial: {
    title: "Ark-One Special Supply",
    desc: "Special supply applications open 2 Nov. Eligibility follows the notice posted 22 Oct 2026.",
    h1: "Cheongna Ark-One Prugio special supply",
  },
  docnormal: {
    title: "Ark-One General Supply",
    desc: "First rank 3 Nov. Second rank 4 Nov. Winners on 10 Nov. Notice posted 22 Oct 2026.",
    h1: "Cheongna Ark-One Prugio general supply",
  },
  video: {
    title: "Ark-One Promo Video",
    desc: "Promo videos for Cheongna Ark-One Prugio released by the project entity. Call 1833-3872.",
    h1: "Cheongna Ark-One Prugio promo video",
  },
  news: {
    title: "Ark-One Press Coverage",
    desc: "Press list for Cheongna Ark-One Prugio. Read the original articles for supply and area news.",
    h1: "Cheongna Ark-One Prugio press",
  },
  event: {
    title: "Model House Open Event",
    desc: "Three-day model house gifts and a 4 p.m. draw. Contract dates are 22-24 Nov 2026.",
    h1: "Model house opening three-day event",
  },
  plans: {
    title: "Ark-One Plans and Prices",
    desc: "Floor plans for 84C and 103A plus supply prices from the posted recruitment notice.",
    h1: "Floor plans and supply prices",
  },
  visit: {
    title: "Book a Model House Visit",
    desc: "Request a model house visit at Cheongna-dong 87-1. Grand open is 30 Oct. Call 1833-3872.",
    h1: "Model house visit request",
  },
} as const;

export function enPriceAnswer() {
  const bits = prices.rows.map((p) => `${p.type} ${p.min} to ${p.max}`).join(" · ");
  return `Supply amounts by type are ${bits}. Amounts differ by building floor and unit. Balcony extension paid options and tax are separate. The recruitment notice prevails.`;
}

const PRICE = "__PRICE__";

export const FAQ_OVERVIEW = [
  { q: "How many homes is Cheongna Ark-One Prugio?", a: "The published overview lists 1855 units and rooms: Apt 868 units and officetel 987 rooms. Shops are planned on floors 1 and 2." },
  { q: "What are the apartment exclusive areas?", a: "Apt exclusive areas are 84 and 103 square meters. Counts are 84A 248 units and 124 units each for 84B 84C 84D 103A and 103B. The model house shows 84A and 103A." },
  { q: "Who is the developer and who is the builder?", a: "The developer is Cheongna Smart City and the builder is Daewoo E&C." },
  { q: "What is the sale price?", a: PRICE },
  { q: "Is this the same complex as Cheongna Peakone Prugio?", a: "No. Cheongna Ark-One Prugio is 1855 units and rooms. 2911 is the combined total with Cheongna Peakone Prugio and is not one complex." },
  { q: "Is Peakone phase 2 the same complex as Ark-One?", a: "Some articles call Ark-One Peakone phase 2. The complex name is Cheongna Ark-One Prugio on block M5. Cheongna Peakone Prugio is block B1 and is a different complex." },
  { q: "Are the shops sold in the same notice?", a: "This site explains the apartment and the officetel. Shop supply is separate from the recruitment notice and should be checked on its own." },
  { q: "What number do I call?", a: "The phone number on this site is 1833-3872." },
];

export const FAQ_SCHEDULE = [
  { q: "What is the Cheongna Ark-One Prugio sale schedule?", a: "The recruitment notice was posted on 22 Oct 2026. Special supply is 2 Nov. First rank is 3 Nov. Second rank is 4 Nov. Winners are announced on 10 Nov. Document submission is 12-16 Nov. Contracts are 22-24 Nov. If the schedule changes the notice prevails." },
  { q: "What is the sale price?", a: PRICE },
  { q: "When was the price published and where can I read it?", a: "Apt supply amounts were published on 22 Oct 2026 in the recruitment notice (housing management number 2026000496) pages 6 to 20 by type building floor and unit. Read the notice on applyhome.co.kr. The officetel has a separate notice. Call 1833-3872 for a specific unit." },
  { q: "Does pre-registration submit an application?", a: "No. Pre-registration only asks for sale news. It is not an application. Eligibility and dates follow the recruitment notice and applications are made on Applyhome after the notice." },
  { q: "What should I prepare before applying?", a: "Read the recruitment notice posted on 22 Oct 2026 on Applyhome and check your savings account region and home ownership against that notice." },
  { q: "When is move-in?", a: "Move-in is planned for August 2031 and can change with construction. The project entity announces the exact date." },
  { q: "Do you publish an expected price or a market outlook?", a: "This site does not publish an expected price or a market outlook. The supply amount is the table in the recruitment notice. Call 1833-3872 for a specific condition." },
  { q: "Do you publish rent or jeonse prices?", a: "This site does not publish monthly rent or jeonse prices. Sale terms are in the recruitment notice." },
  { q: "Who can apply?", a: "Applicants must be 19 or older and live in Incheon Seoul or Gyeonggi on the notice date 22 Oct 2026. If the same rank is oversubscribed 50 percent goes first to Incheon residents and 50 percent to Seoul and Gyeonggi residents. First rank needs 12 months in the subscription account and the required deposit." },
  { q: "Are there resale limits a re-win limit or a residency duty?", a: "Resale is limited for 3 years (until title registration if sooner than 3 years it is 3 years). A re-win limit of 10 years applies if you win here. There is no residency duty. A person already inside another re-win limit can still apply here." },
  { q: "When is the Cheongna Ark-One Prugio contract period?", a: "The contract period for Cheongna Ark-One Prugio is 22 to 24 November 2026. That date is from the recruitment notice posted on 22 Oct 2026." },
];

export const FAQ_COMPARE = [
  { q: "How many officetel rooms are there and what are the areas?", a: "The officetel has 987 rooms at exclusive 105 121 and 136 square meters. Room counts and plans are in a separate officetel notice." },
  { q: "Where can I see floor plans?", a: "The model house has 84A and 103A units. Areas by type are on this site and on page 5 of the recruitment notice." },
  { q: "Do the apartment and the officetel share one schedule?", a: "No. The officetel has a separate notice. The apartment recruitment notice does not apply to the officetel." },
  { q: "Does the price cap also cover the officetel?", a: "The project entity marks the complex as a price-cap complex and the premium page says price-cap apartments. Officetel price and rules are not published here. Check the notice." },
  { q: "How is Cheongna Ark-One Prugio different from Cheongna Peakone Prugio?", a: "Cheongna Ark-One Prugio is block M5 and Cheongna Peakone Prugio is block B1. They are different complexes. The combined figure is not one complex." },
];

export const FAQ_CONTACT = [
  { q: "Where is the Cheongna Ark-One Prugio model house?", a: "The model house is at 87-1 Cheongna-dong Seohae-gu Incheon. The project site is 86-1 Cheongna-dong. Use the Naver and Kakao map buttons on this page." },
  { q: "When does the model house open?", a: "The model house at 87-1 Cheongna-dong Seohae-gu Incheon has its grand opening on 30 Oct. Units 84A and 103A are installed. Call 1833-3872 before you visit." },
  { q: "Where can I get guidance before the model house opens?", a: "The showroom is at Hongik Park 1F units 108 and 109 19 Jungbong-daero 586beon-gil Seohae-gu Incheon next to Starbucks. Call 1833-3872 for hours before you visit." },
  { q: "What should I check before visiting?", a: "Check the address and whether the model house or showroom is open. Check eligibility and dates in the recruitment notice posted on 22 Oct 2026 on Applyhome." },
  { q: "What phone number reaches the Cheongna Ark-One Prugio model house?", a: "Call 1833-3872 for the model house at 87-1 Cheongna-dong. Grand opening is 30 Oct." },
];

export const FAQ_LOCATION = [
  { q: "Where is Cheongna Ark-One Prugio?", a: "It is at 86-1 Cheongna-dong Seohae-gu Incheon on mixed-use site M5 in the Cheongna International Business District. From 1 Jul 2026 this area of former Seo-gu is Seohae-gu." },
  { q: "Is a Line 7 station nearby?", a: "International Business District station on the Seoul Line 7 Cheongna extension is a planned station. The opening date is not set." },
  { q: "Is Cheongna Sky Bridge open?", a: "Yes. Cheongna Sky Bridge (the former 3rd land bridge) opened on 5 Jan 2026 and the name was reported as fixed on 14 Jan 2026." },
  { q: "How are schools assigned?", a: "New schools are still at the plan stage. Assignment is decided by the local education office. Check with that office before move-in." },
];

export const FAQ_BRAND = [
  { q: "What standard are these dates?", a: "Dates are plans and can change depending on the relevant agency." },
  { q: "Is this the same complex as Cheongna Peakone Prugio?", a: "No. Cheongna Ark-One Prugio is 1855 units and rooms. 2911 is the combined total with Cheongna Peakone Prugio and is not one complex." },
  { q: "What does this page show?", a: "This page lists the history of Cheongna Ark-One Prugio and nearby development by year. Dates are plans and can change." },
];

export const FAQ_VIDEO = [
  { q: "Which videos can I watch?", a: "A set of promo videos for Cheongna Ark-One Prugio." },
  { q: "Who released the videos?", a: "You can watch the complex introduction released by the project entity." },
];

export function withPrice<T extends { q: string; a: string }>(faq: T[]): T[] {
  const price = enPriceAnswer();
  return faq.map((item) => (item.a === PRICE ? { ...item, a: price } : item));
}

export const EN_PAGE_NAMES: Record<string, string> = {
  "/": "Cheongna Ark-One Prugio",
  "/pages/overview": "Overview",
  "/pages/compare": "Apartment and officetel",
  "/pages/schedule": "Sale schedule",
  "/pages/location": "Location",
  "/pages/contact": "Model house",
  "/pages/changeinfo": "Application changes",
  "/pages/docspecial": "Special supply",
  "/pages/docnormal": "General supply",
  "/pages/premium": "Premium",
  "/pages/brand": "History",
  "/board/news_list": "Press",
  "/pages/video": "Promo video",
  "/event": "Open event",
};

export const EN_LEGEND =
  "Status: published = a figure released by the project entity and it can change in permitting · fixed = already completed or announced · planned = a date was given and it can change · not set = not decided yet · sales material = a sales-desk figure that the notice can change.";
