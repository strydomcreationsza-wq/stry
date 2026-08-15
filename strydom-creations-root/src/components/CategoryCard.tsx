import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  href: string;
  title: string;
  description: string;
  image: string;
  badge?: string;
  comingSoon?: boolean;
};

export function CategoryCard({
  href,
  title,
  description,
  image,
  badge,
  comingSoon,
}: Props) {
  const content = (
    <article
      className={`group overflow-hidden rounded-3xl border border-[#ead9cd] bg-white shadow-[0_10px_30px_rgba(92,61,54,0.06)] transition ${
        comingSoon ? "opacity-80" : "hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(92,61,54,0.1)]"
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f7ebe3]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width:768px) 100vw, 33vw"
        />
        {badge && (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[#8b5a4a] shadow-sm">
            {badge}
          </span>
        )}
        {comingSoon && (
          <span className="absolute right-3 top-3 rounded-full bg-[#5c3d36]/90 px-3 py-1 text-xs font-semibold text-white">
            Coming soon
          </span>
        )}
      </div>
      <div className="p-5 sm:p-6">
        <h3 className="font-display text-xl font-semibold text-[#3d2c29]">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[#7a5f56]">{description}</p>
        {!comingSoon && (
          <p className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#c4785a]">
            Explore
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </p>
        )}
      </div>
    </article>
  );

  if (comingSoon) {
    return <div className="cursor-default">{content}</div>;
  }

  return <Link href={href}>{content}</Link>;
}
