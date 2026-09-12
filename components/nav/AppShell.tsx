import { ReactNode } from "react";
import AppNav from "./AppNav";
import CompanionButton from "./CompanionButton";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      {children}
      <CompanionButton />
    </div>
  );
}
