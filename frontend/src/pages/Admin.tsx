import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Download, LogOut, RefreshCw, ShieldCheck, Users } from "lucide-react";
import { QuircleLogo } from "@/components/QuircleLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Toaster } from "@/components/ui/sonner";
import { apiGet } from "@/lib/api";

const TOKEN_KEY = "qp_admin_token";

interface Signup {
  name: string;
  email: string;
  city: string;
  family_size: number | string;
  role: string;
  created_at: string;
}

interface Stats {
  signups: number;
  brochure_downloads: number;
  catalogue_downloads: number;
  preview_clicks: number;
}

function errorText(err: unknown): string {
  const detail = (err as { body?: { detail?: unknown } })?.body?.detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) return detail.map((e) => e?.msg ?? String(e)).join(" ");
  return "Something went wrong. Please try again.";
}

export default function Admin() {
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem(TOKEN_KEY));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [signups, setSignups] = useState<Signup[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);

  const logout = useCallback((msg?: string) => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setSignups([]);
    if (msg) toast.error(msg);
  }, []);

  const load = useCallback(
    async (tok: string) => {
      try {
        const res = await fetch("/api/admin/signups", {
          headers: { Authorization: `Bearer ${tok}` },
        });
        if (res.status === 401) {
          logout("Session expired. Please sign in again.");
          return;
        }
        if (!res.ok) throw new Error(String(res.status));
        const data = (await res.json()) as { total: number; signups: Signup[] };
        setSignups(data.signups);
      } catch {
        toast.error("Could not load signups right now.");
      }
      apiGet<Stats>("/stats").then(setStats).catch(() => {});
    },
    [logout]
  );

  useEffect(() => {
    if (token) load(token);
  }, [token, load]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(errorText({ body: data }));
        return;
      }
      sessionStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
      setPassword("");
      toast.success("Welcome back.");
    } catch {
      toast.error("Could not reach the server. Try again.");
    } finally {
      setBusy(false);
    }
  };

  const downloadCsv = async () => {
    if (!token) return;
    try {
      const res = await fetch("/api/admin/signups.csv", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        logout("Session expired. Please sign in again.");
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "quircle-signups.csv";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Signup list downloaded.");
    } catch {
      toast.error("Download failed. Try again.");
    }
  };

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-qp-cream px-5">
        <form
          data-testid="admin-login-form"
          onSubmit={login}
          className="w-full max-w-sm rounded-3xl border border-qp-line bg-white p-8 shadow-[0_30px_70px_-30px_rgba(67,33,106,0.35)]"
        >
          <div className="flex items-center justify-between">
            <QuircleLogo size={36} />
            <span className="inline-flex items-center gap-1.5 rounded-full bg-qp-lav px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-qp-purple">
              <ShieldCheck size={13} />
              Owner only
            </span>
          </div>
          <h1 className="mt-6 font-heading text-2xl font-extrabold tracking-tight text-qp-ink">
            Signup list access
          </h1>
          <p className="mt-1.5 text-sm text-qp-muted">Private area for the Quircle owner.</p>
          <div className="mt-6 space-y-4">
            <div>
              <Label htmlFor="admin-email" className="text-sm font-semibold text-qp-ink">
                Email
              </Label>
              <Input
                id="admin-email"
                type="email"
                data-testid="admin-input-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
                className="mt-2 h-12 rounded-xl border-qp-line"
              />
            </div>
            <div>
              <Label htmlFor="admin-password" className="text-sm font-semibold text-qp-ink">
                Password
              </Label>
              <Input
                id="admin-password"
                type="password"
                data-testid="admin-input-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="mt-2 h-12 rounded-xl border-qp-line"
              />
            </div>
          </div>
          <Button
            type="submit"
            data-testid="admin-login-submit-button"
            disabled={busy || !email.trim() || !password}
            className="mt-6 w-full rounded-xl bg-qp-deep py-4 text-base font-bold text-white hover:bg-qp-purple disabled:opacity-50"
          >
            {busy ? "Signing in…" : "Sign in"}
          </Button>
        </form>
        <Toaster richColors />
      </div>
    );
  }

  return (
    <div data-testid="admin-dashboard" className="min-h-screen bg-qp-cream">
      <header className="border-b border-qp-line bg-white">
        <div className="mx-auto flex h-[72px] max-w-[1100px] items-center justify-between px-5 sm:px-7">
          <QuircleLogo size={34} />
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              data-testid="admin-refresh-btn"
              onClick={() => load(token)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-qp-line bg-white text-qp-deep transition-colors hover:border-qp-purple"
              aria-label="Refresh list"
            >
              <RefreshCw size={16} />
            </button>
            <button
              type="button"
              data-testid="admin-logout-btn"
              onClick={() => logout()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-qp-line bg-white px-4 py-2.5 text-sm font-bold text-qp-deep transition-colors hover:border-qp-orange hover:text-qp-ember"
            >
              <LogOut size={15} />
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1100px] px-5 py-10 sm:px-7">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-qp-purple">Private</p>
            <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-qp-ink sm:text-4xl">
              Launch-list signups
            </h1>
          </div>
          <button
            type="button"
            data-testid="admin-download-csv-btn"
            onClick={downloadCsv}
            className="inline-flex items-center gap-2 rounded-xl bg-qp-deep px-5 py-3 text-sm font-bold text-white transition-all hover:bg-qp-purple active:scale-[0.98]"
          >
            <Download size={16} strokeWidth={2.5} />
            Download CSV
          </button>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Signups", value: stats?.signups ?? signups.length },
            { label: "Brochure downloads", value: stats?.brochure_downloads ?? "—" },
            { label: "Catalogue downloads", value: stats?.catalogue_downloads ?? "—" },
            { label: "Preview clicks", value: stats?.preview_clicks ?? "—" },
          ].map((s) => (
            <div
              key={s.label}
              data-testid={`admin-stat-${s.label.toLowerCase().replace(/\s+/g, "-")}`}
              className="rounded-2xl border border-qp-line bg-white p-5"
            >
              <p className="font-heading text-2xl font-extrabold text-qp-deep">{s.value}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-qp-muted">{s.label}</p>
            </div>
          ))}
        </div>

        <div
          data-testid="admin-signups-table"
          className="mt-8 overflow-hidden rounded-3xl border border-qp-line bg-white"
        >
          {signups.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-16 text-qp-muted">
              <Users size={28} />
              <p className="text-sm">No signups yet.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-qp-deep hover:bg-qp-deep">
                  {["Name", "Email", "City", "Family", "Role", "Joined"].map((h) => (
                    <TableHead
                      key={h}
                      className="px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-white"
                    >
                      {h}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {signups.map((s) => (
                  <TableRow key={s.email} data-testid="admin-signup-row" className="border-qp-line">
                    <TableCell className="px-5 py-4 font-semibold text-qp-ink">{s.name}</TableCell>
                    <TableCell className="px-5 py-4 text-sm text-qp-muted">{s.email}</TableCell>
                    <TableCell className="px-5 py-4 text-sm text-qp-muted">{s.city}</TableCell>
                    <TableCell className="px-5 py-4 text-sm text-qp-muted">{s.family_size}</TableCell>
                    <TableCell className="px-5 py-4 text-sm text-qp-muted">{s.role}</TableCell>
                    <TableCell className="px-5 py-4 text-sm text-qp-muted">
                      {s.created_at ? new Date(s.created_at).toLocaleString() : "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </main>
      <Toaster richColors />
    </div>
  );
}
