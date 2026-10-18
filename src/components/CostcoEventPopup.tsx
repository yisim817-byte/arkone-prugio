import { useEffect, useState, type ComponentType } from "react";
import { SITE_PHONE, SITE_TEL_HREF } from "@/lib/site-data";

type CostcoWindow = Window & { __arkoneCostcoPhone?: string; __arkoneCostcoTel?: string };

export function CostcoEventPopup() {
  const [View, setView] = useState<ComponentType | null>(null);
  useEffect(() => {
    const w = window as CostcoWindow;
    w.__arkoneCostcoPhone = SITE_PHONE;
    w.__arkoneCostcoTel = SITE_TEL_HREF;
    let live = true;
    import("./CostcoEventPopupView").then((mod) => {
      if (live) setView(() => mod.CostcoEventPopupView);
    });
    return () => { live = false; };
  }, []);
  return View ? <View /> : null;
}
