import Link from "next/link";
import { ChatCircleDots } from "@phosphor-icons/react/dist/ssr";

export default function CompanionButton() {
  return (
    <Link
      href="/today"
      className="fixed bottom-5 right-5 z-30 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-soft-hover transition-transform hover:-translate-y-0.5 active:scale-[0.97] sm:bottom-6 sm:right-6"
    >
      <ChatCircleDots size={20} weight="fill" />
      <span className="hidden sm:inline">AfterCare Companion</span>
    </Link>
  );
}
