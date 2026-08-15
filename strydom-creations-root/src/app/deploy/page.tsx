import type { Metadata } from "next";
import Link from "next/link";
import {
  Download,
  Rocket,
  Database,
  Mail,
  Globe,
  CheckCircle2,
  FolderGit2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Deploy your site",
  description: "Download the code and deploy Strydom Creations to Vercel — free, permanent hosting.",
  robots: { index: false, follow: false },
};

const steps = [
  {
    icon: Download,
    title: "Download the code",
    body: (
      <>
        <p className="text-sm leading-relaxed text-[#7a5f56]">
          If you&apos;re deploying from this repo, you can skip this step — the code is
          already on GitHub. If you have a local copy of the project instead, zip it
          up yourself (make sure it includes the{" "}
          <code className="rounded bg-[#f7efe8] px-1.5 py-0.5 text-xs">src</code>,{" "}
          <code className="rounded bg-[#f7efe8] px-1.5 py-0.5 text-xs">public</code> and{" "}
          <code className="rounded bg-[#f7efe8] px-1.5 py-0.5 text-xs">package.json</code>{" "}
          folders) and upload it to your GitHub repo.
        </p>
      </>
    ),
  },
  {
    icon: FolderGit2,
    title: "Create a free GitHub account",
    body: (
      <>
        <p className="text-sm leading-relaxed text-[#7a5f56]">
          Sign up at{" "}
          <a
            href="https://github.com/signup"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-[#c4785a] hover:underline"
          >
            github.com/signup
          </a>{" "}
          using your Gmail. Pick any username like <code className="rounded bg-[#f7efe8] px-1.5 py-0.5 text-xs">strydomcreations</code>.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#7a5f56]">
          Then create a new empty repository at{" "}
          <a
            href="https://github.com/new"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-[#c4785a] hover:underline"
          >
            github.com/new
          </a>{" "}
          — name it <strong>strydom-creations</strong>, set it to <strong>Public</strong>, and click
          Create.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#7a5f56]">
          On the empty repo page, click <strong>&quot;uploading an existing file&quot;</strong>,
          unzip your download, and drag all the files into the browser. Click{" "}
          <strong>Commit changes</strong>.
        </p>
      </>
    ),
  },
  {
    icon: Rocket,
    title: "Deploy to Vercel",
    body: (
      <>
        <p className="text-sm leading-relaxed text-[#7a5f56]">
          Sign up free at{" "}
          <a
            href="https://vercel.com/signup"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-[#c4785a] hover:underline"
          >
            vercel.com/signup
          </a>{" "}
          — click <strong>Continue with GitHub</strong>.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#7a5f56]">
          Then go to{" "}
          <a
            href="https://vercel.com/new"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-[#c4785a] hover:underline"
          >
            vercel.com/new
          </a>{" "}
          → click <strong>Import</strong> next to your <code className="rounded bg-[#f7efe8] px-1.5 py-0.5 text-xs">strydom-creations</code>{" "}
          repo → click <strong>Deploy</strong>. Wait 1–2 minutes.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#7a5f56]">
          🎉 You&apos;ll get a permanent URL like{" "}
          <code className="rounded bg-[#f7efe8] px-1.5 py-0.5 text-xs">strydom-creations.vercel.app</code>
        </p>
      </>
    ),
  },
  {
    icon: Database,
    title: "Add a free database",
    body: (
      <>
        <p className="text-sm leading-relaxed text-[#7a5f56]">
          In your Vercel project → <strong>Storage</strong> tab → <strong>Create Database</strong>{" "}
          → pick <strong>Neon</strong> or <strong>Vercel Postgres</strong> (both free) → choose the
          Hobby tier → Create.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#7a5f56]">
          Vercel automatically connects it. Then click <strong>Redeploy</strong> from the
          Deployments tab so the site picks up the new database.
        </p>
      </>
    ),
  },
  {
    icon: Mail,
    title: "Activate email",
    body: (
      <>
        <p className="text-sm leading-relaxed text-[#7a5f56]">
          Open your new live site and send a test message via the <strong>Contact</strong> form.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#7a5f56]">
          Then check <strong>strydomcreations.za@gmail.com</strong> (including the{" "}
          <strong>Spam folder</strong>) for an activation email from <strong>FormSubmit</strong>.
          Click <strong>Activate</strong> — done! All future orders and enquiries will land in your
          inbox automatically.
        </p>
      </>
    ),
  },
  {
    icon: Globe,
    title: "(Optional) Add your own domain",
    body: (
      <>
        <p className="text-sm leading-relaxed text-[#7a5f56]">
          Buy a domain like <strong>strydomcreations.co.za</strong> from{" "}
          <a
            href="https://domains.co.za"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-[#c4785a] hover:underline"
          >
            domains.co.za
          </a>{" "}
          for about R99/year.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#7a5f56]">
          In Vercel → your project → <strong>Settings</strong> → <strong>Domains</strong> → add
          your domain. Follow the DNS instructions Vercel shows. Live in ~10 minutes.
        </p>
      </>
    ),
  },
];

export default function DeployPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#a07868]">
          Launch guide
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-[#3d2c29]">
          Deploy Strydom Creations to a real, permanent URL
        </h1>
        <p className="mt-3 text-[#7a5f56]">
          Follow these 6 steps to get your website live on the internet, forever, for free.
          It takes about 10 minutes.
        </p>
      </div>

      <ol className="mt-10 space-y-4">
        {steps.map((step, i) => (
          <li
            key={i}
            className="flex gap-4 rounded-3xl border border-[#ead9cd] bg-white p-5 sm:p-6"
          >
            <div className="flex-shrink-0">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f3e0d4] text-[#8b5a4a]">
                <step.icon className="h-5 w-5" />
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#a07868]">
                  Step {i + 1}
                </span>
              </div>
              <h2 className="mt-1 font-display text-xl font-semibold text-[#3d2c29]">
                {step.title}
              </h2>
              <div className="mt-3">{step.body}</div>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 rounded-3xl bg-[#f7efe8] p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-6 w-6 shrink-0 text-[#128C4A]" />
          <div>
            <h2 className="font-display text-xl font-semibold text-[#3d2c29]">
              After deployment, your site will:
            </h2>
            <ul className="mt-3 space-y-1.5 text-sm text-[#5c3d36]">
              <li>✅ Live at a permanent URL that never expires</li>
              <li>✅ Load fast worldwide (Vercel&apos;s global CDN)</li>
              <li>✅ Save every order to a real database</li>
              <li>✅ Email you every order + enquiry to Gmail</li>
              <li>✅ WhatsApp button works on all devices</li>
              <li>✅ Free forever on the Hobby tier</li>
              <li>✅ Auto-update when you push new code to GitHub</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/"
          className="text-sm font-semibold text-[#c4785a] hover:text-[#b0654a]"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
