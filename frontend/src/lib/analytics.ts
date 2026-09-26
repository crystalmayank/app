import { apiPost } from "./api";

// Fire-and-forget interaction tracking; the page must never break if the API is down.
export function track(event: string, label?: string) {
  apiPost("/analytics/event", { event, label }).catch(() => {});
}
