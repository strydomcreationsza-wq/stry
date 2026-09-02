"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AGE_OPTIONS,
  BOOK_FORMATS,
  COMPANIONS,
  LANGUAGES,
  PROBLEMS_BY_AGE,
  THEMES,
  formatRand,
} from "@/lib/config";
import { adventureOrderMessage } from "@/lib/whatsapp";
import { StepIndicator } from "./StepIndicator";
import { WhatsAppButton } from "./WhatsAppButton";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Camera } from "lucide-react";

const STEPS = [
  "Age",
  "Format",
  "Theme",
  "Focus",
  "Language",
  "Name",
  "Companion",
  "Photos",
  "Email",
];

export type AdventureConfig = {
  age: string;
  formatId: string;
  formatLabel: string;
  themeId: string;
  themeName: string;
  problemId: string;
  problemLabel: string;
  language: string;
  childName: string;
  companionId: string;
  companionLabel: string;
  email: string;
};

const STORAGE_KEY = "lsn_checkout";

export function AdventureConfigurator() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [age, setAge] = useState("");
  const [formatId, setFormatId] = useState("");
  const [themeId, setThemeId] = useState("");
  const [problemId, setProblemId] = useState("");
  const [language, setLanguage] = useState("");
  const [childName, setChildName] = useState("");
  const [companionId, setCompanionId] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const theme = THEMES.find((t) => t.id === themeId);
  const bookFormat = BOOK_FORMATS.find((f) => f.id === formatId);
  const problems = age ? PROBLEMS_BY_AGE[age] || [] : [];
  const problem = problems.find((p) => p.id === problemId);
  const companion = COMPANIONS.find((c) => c.id === companionId);

  const waPreview = adventureOrderMessage({
    age: age ? `Age ${age}` : undefined,
    format: bookFormat ? `${bookFormat.label} (${formatRand(bookFormat.price)})` : undefined,
    theme: theme?.name,
    problem: problem?.label,
    language: language || undefined,
    childName: childName || undefined,
    companion: companion?.label,
    email: email || undefined,
  });

  function validateStep(): boolean {
    setError("");
    if (step === 1 && !age) {
      setError("Please choose an age.");
      return false;
    }
    if (step === 2 && !formatId) {
      setError("Please choose a book format.");
      return false;
    }
    if (step === 3 && !themeId) {
      setError("Please choose a theme.");
      return false;
    }
    if (step === 4 && !problemId) {
      setError("Please choose a learning focus.");
      return false;
    }
    if (step === 5 && !language) {
      setError("Please choose a language.");
      return false;
    }
    if (step === 6 && childName.trim().length < 2) {
      setError("Please enter your child's name.");
      return false;
    }
    if (step === 7 && !companionId) {
      setError("Please choose a companion animal.");
      return false;
    }
    if (step === 9) {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
      if (!ok) {
        setError("Please enter a valid email address.");
        return false;
      }
    }
    return true;
  }

  function next() {
    if (!validateStep()) return;
    if (step < STEPS.length) {
      setStep((s) => s + 1);
      return;
    }
    const config: AdventureConfig = {
      age,
      formatId,
      formatLabel: bookFormat?.label || "",
      themeId,
      themeName: theme?.name || "",
      problemId,
      problemLabel: problem?.label || "",
      language,
      childName: childName.trim(),
      companionId,
      companionLabel: companion?.label || "",
      email: email.trim().toLowerCase(),
    };

    const payload = {
      category: "adventure",
      productName: `Adventure Book — ${config.themeName} (${config.formatLabel})`,
      bookPrice: bookFormat?.price || BOOK_FORMATS[0].price,
      childName: config.childName,
      ageGroup: `Age ${config.age}`,
      theme: config.themeName,
      problem: config.problemLabel,
      language: config.language,
      companion: config.companionLabel,
      customerEmail: config.email,
      configSnapshot: config,
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    router.push("/checkout");
  }

  function back() {
    setError("");
    if (step > 1) setStep((s) => s - 1);
  }

  return (
    <div className="rounded-3xl border border-[#ead9cd] bg-white p-5 shadow-[0_12px_40px_rgba(92,61,54,0.06)] sm:p-8">
      <StepIndicator steps={STEPS} current={step} />

      <div className="mt-8 min-h-[280px]">
        {step === 1 && (
          <section>
            <h2 className="font-display text-2xl font-semibold text-[#3d2c29]">How old is your child?</h2>
            <p className="mt-2 text-sm text-[#7a5f56]">
              We tailor language, pace, and illustrations for ages 1–12.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {AGE_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setAge(opt.id);
                    setProblemId("");
                  }}
                  className={cn(
                    "rounded-2xl border p-3 text-left transition sm:p-4",
                    age === opt.id
                      ? "border-[#c4785a] bg-[#fff5ef]"
                      : "border-[#ead9cd] hover:border-[#d9b9a8]",
                  )}
                >
                  <span className="block font-display text-lg font-semibold text-[#3d2c29] sm:text-xl">
                    {opt.label}
                  </span>
                  <span className="mt-1 block text-xs text-[#7a5f56]">{opt.description}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {step === 2 && (
          <section>
            <h2 className="font-display text-2xl font-semibold text-[#3d2c29]">Choose your book format</h2>
            <p className="mt-2 text-sm text-[#7a5f56]">
              Pick between a compact softcover and a large keepsake hardcover.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {BOOK_FORMATS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFormatId(f.id)}
                  className={cn(
                    "rounded-2xl border p-5 text-left transition",
                    formatId === f.id
                      ? "border-[#c4785a] bg-[#fff5ef] ring-2 ring-[#c4785a]/30"
                      : "border-[#ead9cd] hover:border-[#d9b9a8]",
                  )}
                >
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="font-display text-lg font-semibold text-[#3d2c29]">
                      {f.label}
                    </span>
                    <span className="rounded-full bg-[#f3e0d4] px-3 py-1 text-sm font-semibold text-[#8b5a4a]">
                      from {formatRand(f.price)}
                    </span>
                  </span>
                  <span className="mt-2 block text-sm text-[#7a5f56]">{f.description}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {step === 3 && (
          <section>
            <h2 className="font-display text-2xl font-semibold text-[#3d2c29]">Pick a theme</h2>
            <p className="mt-2 text-sm text-[#7a5f56]">
              Two adventure worlds to start — more themes later this year. You can&apos;t type a custom theme.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setThemeId(t.id)}
                  className={cn(
                    "overflow-hidden rounded-2xl border text-left transition",
                    themeId === t.id
                      ? "border-[#c4785a] ring-2 ring-[#c4785a]/30"
                      : "border-[#ead9cd] hover:border-[#d9b9a8]",
                  )}
                >
                  <div className="relative aspect-[16/10] bg-[#f7ebe3]">
                    <Image src={t.image} alt={t.name} fill className="object-cover" sizes="400px" />
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-[#3d2c29]">{t.name}</p>
                    <p className="mt-1 text-sm text-[#7a5f56]">{t.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {step === 4 && (
          <section>
            <h2 className="font-display text-2xl font-semibold text-[#3d2c29]">What shall we gently work on?</h2>
            <p className="mt-2 text-sm text-[#7a5f56]">
              Learning focuses for age {age}. Choose one everyday skill to weave into the story.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {problems.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setProblemId(p.id)}
                  className={cn(
                    "rounded-2xl border p-4 text-left transition",
                    problemId === p.id
                      ? "border-[#c4785a] bg-[#fff5ef]"
                      : "border-[#ead9cd] hover:border-[#d9b9a8]",
                  )}
                >
                  <span className="font-semibold text-[#3d2c29]">{p.label}</span>
                  <span className="mt-1 block text-sm text-[#7a5f56]">{p.description}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {step === 5 && (
          <section>
            <h2 className="font-display text-2xl font-semibold text-[#3d2c29]">Language</h2>
            <p className="mt-2 text-sm text-[#7a5f56]">Choose the language for your book.</p>
            <label className="mt-6 block">
              <span className="sr-only">Language</span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full rounded-2xl border border-[#ead9cd] bg-white px-4 py-3.5 text-[#3d2c29] outline-none focus:border-[#c4785a]"
              >
                <option value="">Select a language…</option>
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </label>
          </section>
        )}

        {step === 6 && (
          <section>
            <h2 className="font-display text-2xl font-semibold text-[#3d2c29]">Child&apos;s name</h2>
            <p className="mt-2 text-sm text-[#7a5f56]">
              Your little one becomes the hero of the adventure.
            </p>
            <label className="mt-6 block">
              <span className="mb-2 block text-sm font-medium text-[#5c3d36]">First name</span>
              <input
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="e.g. Amara"
                className="w-full rounded-2xl border border-[#ead9cd] bg-white px-4 py-3.5 text-[#3d2c29] outline-none focus:border-[#c4785a]"
              />
            </label>
          </section>
        )}

        {step === 7 && (
          <section>
            <h2 className="font-display text-2xl font-semibold text-[#3d2c29]">Choose a companion</h2>
            <p className="mt-2 text-sm text-[#7a5f56]">
              A friendly animal guide for the story — not your own pet, just a story companion.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {COMPANIONS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCompanionId(c.id)}
                  className={cn(
                    "rounded-2xl border p-4 text-center transition",
                    companionId === c.id
                      ? "border-[#c4785a] bg-[#fff5ef]"
                      : "border-[#ead9cd] hover:border-[#d9b9a8]",
                  )}
                >
                  <span className="text-3xl">{c.emoji}</span>
                  <span className="mt-2 block text-sm font-semibold text-[#3d2c29]">{c.label}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {step === 8 && (
          <section>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f3e0d4] text-[#8b5a4a]">
              <Camera className="h-6 w-6" />
            </div>
            <h2 className="mt-4 font-display text-2xl font-semibold text-[#3d2c29]">
              Photos for your book
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#7a5f56]">
              You&apos;ll send photos to us on WhatsApp <strong>after you check out</strong>. Clear
              face photos work best — smiling, looking at the camera, good light. We&apos;ll guide
              you if we need anything else.
            </p>
            <div className="mt-6 rounded-2xl border border-dashed border-[#d9b9a8] bg-[#fffaf5] p-5">
              <p className="text-sm font-medium text-[#5c3d36]">
                Save our WhatsApp so you&apos;re ready
              </p>
              <p className="mt-1 text-sm text-[#7a5f56]">
                Tap below to open WhatsApp with your selections already in the message, or just copy
                the number to save it: <strong>{"+27 65 589 4577"}</strong>
              </p>
              <div className="mt-4">
                <WhatsAppButton
                  message={waPreview}
                  label="Open WhatsApp now"
                  variant="primary"
                />
              </div>
              <p className="mt-3 text-xs text-[#9a7f74]">
                Not required at this step — you can also do this after payment on the thank-you
                page.
              </p>
            </div>
          </section>
        )}

        {step === 9 && (
          <section>
            <h2 className="font-display text-2xl font-semibold text-[#3d2c29]">Your email</h2>
            <p className="mt-2 text-sm text-[#7a5f56]">
              We&apos;ll send your receipt here and keep you updated as the book is made.
            </p>
            <label className="mt-6 block">
              <span className="mb-2 block text-sm font-medium text-[#5c3d36]">Email address</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                required
                className="w-full rounded-2xl border border-[#ead9cd] bg-white px-4 py-3.5 text-[#3d2c29] outline-none focus:border-[#c4785a]"
              />
            </label>

            <div className="mt-6 rounded-2xl bg-[#f7efe8] p-4 text-sm text-[#5c3d36]">
              <p className="font-semibold">Order summary</p>
              <ul className="mt-2 space-y-1 text-[#7a5f56]">
                <li>Child: {childName || "—"}</li>
                <li>Age {age} · {theme?.name || "—"}</li>
                <li>Format: {bookFormat?.label || "—"}</li>
                <li>Focus: {problem?.label || "—"}</li>
                <li>Language: {language || "—"}</li>
                <li>Companion: {companion?.label || "—"}</li>
                <li className="pt-1 font-semibold text-[#3d2c29]">
                  Book price: {bookFormat ? formatRand(bookFormat.price) : "—"}
                </li>
              </ul>
              <p className="mt-3 text-xs text-[#9a7f74]">
                Next you&apos;ll choose courier and pay. Photos can be sent on WhatsApp after payment.
              </p>
            </div>
          </section>
        )}
      </div>

      {error && (
        <p className="mt-4 rounded-xl bg-[#fdecea] px-3 py-2 text-sm text-[#9b3b2e]">{error}</p>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#f0e2d8] pt-6">
        <button
          type="button"
          onClick={back}
          disabled={step === 1}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-[#7a5f56] disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <button
          type="button"
          onClick={next}
          className="inline-flex items-center gap-2 rounded-full bg-[#c4785a] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#b0654a]"
        >
          {step === STEPS.length ? "Continue to checkout" : "Next"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
