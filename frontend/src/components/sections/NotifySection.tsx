import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Send, Users } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiGet, apiPost } from "@/lib/api";

interface NotifyResponse {
  ok: boolean;
  message: string;
  total: number;
  already_registered: boolean;
}

interface StatsResponse {
  signups: number;
  brochure_downloads: number;
  catalogue_downloads: number;
  preview_clicks: number;
}

const FAMILY_SIZES: Record<string, string> = { "2": "1–2 people", "4": "3–4 people", "6": "5 or more" };
const ROLES: Record<string, string> = {
  parent: "Parent / household organizer",
  elder: "Elder family member",
  young_adult: "Young adult",
  professional: "Working professional",
  other: "Something else",
};

export function NotifySection() {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [familySize, setFamilySize] = useState("");
  const [role, setRole] = useState("");

  const stats = useQuery({
    queryKey: ["stats"],
    queryFn: () => apiGet<StatsResponse>("/stats"),
    retry: false,
  });

  const mutation = useMutation({
    mutationFn: () =>
      apiPost<NotifyResponse>("/notify", {
        name: name.trim(),
        email: email.trim(),
        city: city.trim(),
        family_size: Number(familySize),
        role,
      }),
    onSuccess: (res) => {
      if (res.already_registered) {
        toast.info("You are already on the list — we will be in touch.");
      } else {
        toast.success(res.message);
      }
      setName("");
      setEmail("");
      setCity("");
      setFamilySize("");
      setRole("");
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
    onError: () => {
      toast.error("Could not save your details right now. Please try again in a moment.");
    },
  });

  const ready = name.trim() && email.trim() && city.trim() && familySize && role;

  return (
    <section id="notify" className="scroll-mt-24 bg-qp-lav/70 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-[1240px] items-center gap-14 px-5 sm:px-7 lg:grid-cols-2 lg:px-10">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-qp-purple">
            Get launch updates
          </p>
          <h2 className="mt-4 font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-qp-ink sm:text-5xl">
            Be the first to know
            <br />
            <span className="font-editorial font-medium italic text-qp-deep">when Quircle opens up.</span>
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-qp-muted sm:text-lg">
            Leave your details and we will write to you when new features land — including the
            planned Find a Friend matching. No spam, no selling your details.
          </p>

          <div
            data-testid="notify-live-count"
            className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-qp-line bg-white px-5 py-4"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-qp-warm text-qp-ember">
              <Users size={18} strokeWidth={2.3} />
            </span>
            <p className="text-sm text-qp-muted">
              {stats.data && stats.data.signups > 0 ? (
                <>
                  <span className="font-heading text-lg font-extrabold text-qp-deep">
                    {stats.data.signups}
                  </span>{" "}
                  {stats.data.signups === 1 ? "person has" : "people have"} registered interest so
                  far.
                </>
              ) : (
                "Be among the first to register your interest."
              )}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <form
            data-testid="notify-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (ready && !mutation.isPending) mutation.mutate();
            }}
            className="rounded-3xl border border-qp-line bg-white p-8 shadow-[0_30px_70px_-30px_rgba(67,33,106,0.35)] sm:p-9"
          >
            <div className="space-y-5">
              <div>
                <Label htmlFor="notify-name" className="text-sm font-semibold text-qp-ink">
                  Your name
                </Label>
                <Input
                  id="notify-name"
                  data-testid="notify-input-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ananya Sharma"
                  required
                  maxLength={120}
                  className="mt-2 h-12 rounded-xl border-qp-line"
                />
              </div>
              <div>
                <Label htmlFor="notify-email" className="text-sm font-semibold text-qp-ink">
                  Email
                </Label>
                <Input
                  id="notify-email"
                  type="email"
                  data-testid="notify-input-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="mt-2 h-12 rounded-xl border-qp-line"
                />
              </div>
              <div>
                <Label htmlFor="notify-city" className="text-sm font-semibold text-qp-ink">
                  City
                </Label>
                <Input
                  id="notify-city"
                  data-testid="notify-input-city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Pune"
                  required
                  maxLength={120}
                  className="mt-2 h-12 rounded-xl border-qp-line"
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label className="text-sm font-semibold text-qp-ink">Family size</Label>
                  <Select value={familySize} onValueChange={(v: string) => setFamilySize(v)}>
                    <SelectTrigger
                      data-testid="notify-select-family-size"
                      aria-label="Family size"
                      className="mt-2 h-12 w-full rounded-xl border-qp-line"
                    >
                      <SelectValue>{(v: string) => (v ? FAMILY_SIZES[v] : "Select")}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(FAMILY_SIZES).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-semibold text-qp-ink">I am a…</Label>
                  <Select value={role} onValueChange={(v: string) => setRole(v)}>
                    <SelectTrigger
                      data-testid="notify-select-role"
                      aria-label="Your role"
                      className="mt-2 h-12 w-full rounded-xl border-qp-line"
                    >
                      <SelectValue>{(v: string) => (v ? ROLES[v] : "Select")}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(ROLES).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              data-testid="notify-submit-button"
              disabled={!ready || mutation.isPending}
              className="mt-7 h-13 w-full rounded-xl bg-qp-deep py-4 text-base font-bold text-white transition-all duration-200 hover:bg-qp-purple active:scale-[0.98] disabled:opacity-50"
            >
              {mutation.isPending ? "Saving…" : "Notify me at launch"}
              <Send size={17} strokeWidth={2.4} />
            </Button>
            <p className="mt-4 text-center text-xs leading-relaxed text-qp-muted">
              Your details are stored only to contact you about Quircle. Nothing else.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
