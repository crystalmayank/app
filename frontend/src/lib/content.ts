import type { StringKey } from "@/lib/i18n";

export const APP_PREVIEW_URL =
  "https://app.emergent.sh/share-preview?app=exp%3A%2F%2Fmobile-craft-4835.preview.emergentagent.com%3Fexpo_go_prompt_device_auth%3D1%26expo_go_device_auth_verification_uri_override%3Dapp.emergent.sh&job_id=1982d6a7-60f0-4fe8-ace1-1ecb53f1f1e1";

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
