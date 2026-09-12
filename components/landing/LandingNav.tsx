import Image from "next/image";
import Link from "next/link";

export default function LandingNav() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-6">
      <Image src="/logo.png" alt="AfterCare" width={220} height={92} priority className="h-12 w-auto sm:h-14" />
      <Link
        href="/today"
        className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform active:scale-[0.97]"
      >
        Open AfterCare
      </Link>
    </header>
  );
}
