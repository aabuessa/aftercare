import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import AppShell from "@/components/nav/AppShell";
import { messageThread } from "@/lib/mock-data";

export default function MessagesPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
        <h1 className="text-2xl font-semibold text-foreground">Messages</h1>
        <p className="mt-1 text-sm text-muted-foreground">Fatima Noor · Care Coordinator</p>

        <div className="mt-6 space-y-3 rounded-2xl bg-mint/50 p-4 shadow-soft sm:p-6">
          {messageThread.map((message) => {
            const isPatient = message.sender === "patient";
            return (
              <div key={message.id} className={`flex ${isPatient ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[80%]">
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-soft ${
                      isPatient ? "bg-primary text-primary-foreground" : "bg-surface text-foreground"
                    }`}
                  >
                    {message.text}
                  </div>
                  <div
                    className={`mt-1 flex items-center gap-1 text-[11px] text-muted-foreground ${
                      isPatient ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.timeLabel}
                    {message.read && <CheckCircle size={12} weight="fill" className="text-primary" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </AppShell>
  );
}
