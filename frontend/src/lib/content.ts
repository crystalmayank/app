import type { StringKey } from "@/lib/i18n";

export const APP_PREVIEW_URL = import.meta.env.VITE_APP_PREVIEW_URL as string;

export const BROCHURE_URL = "/downloads/Quircle_Brochure.pdf";
export const CATALOGUE_URL = "/downloads/Quircle_Feature_Catalogue.pdf";

export interface NavLink {
  key: StringKey;
  hash: string;
  testid: string;
}

export const NAV_LINKS: NavLink[] = [
  { key: "nav_features", hash: "#features", testid: "nav-link-features" },
  { key: "nav_people", hash: "#people", testid: "nav-link-people" },
  { key: "nav_services", hash: "#services", testid: "nav-link-services" },
  { key: "nav_data", hash: "#data", testid: "nav-link-data" },
  { key: "nav_downloads", hash: "#downloads", testid: "nav-link-downloads" },
];

export function scrollToHash(hash: string) {
  const el = document.querySelector(hash === "#top" ? "body" : hash);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}
