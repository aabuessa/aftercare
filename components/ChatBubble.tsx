import { ChatMessage } from "@/lib/types";

export default function ChatBubble({ message }: { message: ChatMessage }) {
  const isPatient = message.role === "patient";
  return (
    <div
      className={`flex animate-enter-up ${isPatient ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-soft ${
          isPatient
            ? "bg-primary text-primary-foreground"
            : "bg-surface text-foreground"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}
