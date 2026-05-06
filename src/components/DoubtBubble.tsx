import { useEffect, useRef, useState, type PointerEvent } from "react";

type Message = {
  role: "user" | "bot";
  text: string;
};

type QuickPrompt = {
  label: string;
  reply: string;
};

const quickPrompts: QuickPrompt[] = [
  {
    label: "Ask about admissions",
    reply: "Admissions are open for the current batch. Share your class and goal, and we can suggest the right course.",
  },
  {
    label: "Help with payment",
    reply: "You can complete payment using UPI, cards, net banking, or wallet options on the checkout screen.",
  },
  {
    label: "Talk to a counsellor",
    reply: "A counsellor can help you choose a batch and plan. Please share your phone number in the support flow.",
  },
];

const pendingReplies = new Set<ReturnType<typeof setTimeout>>();

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

export default function DoubtBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);
  const cleanupResizeRef = useRef<() => void>(() => {});

  useEffect(() => {
    return () => {
      cleanupResizeRef.current();
      pendingReplies.forEach((timeoutId) => clearTimeout(timeoutId));
      pendingReplies.clear();
    };
  }, []);

  const handlePrompt = (prompt: QuickPrompt) => {
    setMessages((current) => [
      ...current,
      { role: "user", text: prompt.label },
    ]);

    const timeoutId = setTimeout(() => {
      setMessages((current) => [
        ...current,
        { role: "bot", text: prompt.reply },
      ]);
      pendingReplies.delete(timeoutId);
    }, 600);

    pendingReplies.add(timeoutId);
  };

  const handleResizeStart = (event: PointerEvent<HTMLButtonElement>) => {
    const panel = panelRef.current;

    if (!panel) {
      return;
    }

    event.preventDefault();

    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = panel.offsetWidth;
    const startHeight = panel.offsetHeight;
    const previousUserSelect = document.body.style.userSelect;

    document.body.style.userSelect = "none";

    const handleResizeMove = (moveEvent: globalThis.PointerEvent) => {
      const maxWidth = Math.min(window.innerWidth - 32, 520);
      const maxHeight = Math.min(window.innerHeight - 64, 640);
      const nextWidth = startWidth + startX - moveEvent.clientX;
      const nextHeight = startHeight + startY - moveEvent.clientY;

      panel.style.width = `${clamp(nextWidth, 320, maxWidth)}px`;
      panel.style.height = `${clamp(nextHeight, 400, maxHeight)}px`;
    };

    const stopResize = () => {
      document.body.style.userSelect = previousUserSelect;
      window.removeEventListener("pointermove", handleResizeMove);
      window.removeEventListener("pointerup", stopResize);
      window.removeEventListener("pointercancel", stopResize);
      cleanupResizeRef.current = () => {};
    };

    cleanupResizeRef.current = stopResize;
    window.addEventListener("pointermove", handleResizeMove);
    window.addEventListener("pointerup", stopResize);
    window.addEventListener("pointercancel", stopResize);
  };

  if (!isOpen) {
    return (
      <button
        type="button"
        aria-label="Open AI Guru chat"
        onClick={() => setIsOpen(true)}
        className="group fixed bottom-[26px] right-[26px] z-50 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-heading text-white shadow-[0_10px_28px_rgba(27,33,36,0.28)] ring-4 ring-white"
      >
        <span className="pointer-events-none absolute bottom-[76px] rounded-full bg-white px-8 py-4 text-tiny font-bold text-heading opacity-0 shadow-card ring-1 ring-strokeLight transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          AI Guru
        </span>
        <span className="flex h-40 w-40 items-center justify-center rounded-full bg-brand-primary text-regular font-bold">
          AI
        </span>
      </button>
    );
  }

  return (
    <div
      ref={panelRef}
      className="fixed bottom-[26px] right-[26px] z-50 flex h-[400px] w-[320px] max-w-[calc(100vw-52px)] flex-col overflow-hidden rounded-xl bg-white shadow-[0_18px_48px_rgba(27,33,36,0.18)] ring-1 ring-strokeLight"
    >
      <button
        type="button"
        aria-label="Resize AI Guru chat"
        onPointerDown={handleResizeStart}
        className="absolute left-0 top-0 z-10 flex h-[36px] w-[36px] cursor-nwse-resize items-start justify-start rounded-tl-xl p-6 text-white/60 hover:bg-white/10 hover:text-white"
      >
        <span className="block h-12 w-12 border-l-2 border-t-2 border-current" />
      </button>
      <div className="flex items-center justify-between bg-heading px-16 py-12 text-white">
        <div className="flex items-center gap-10">
          <div className="flex h-40 w-40 items-center justify-center rounded-full bg-brand-primary text-small font-bold">
            AI
          </div>
          <div>
            <div className="text-regular font-semibold">AI Guru</div>
            <div className="text-small text-white/70">Online now</div>
          </div>
        </div>
        <button
          type="button"
          aria-label="Close AI Guru chat"
          onClick={() => setIsOpen(false)}
          className="flex h-[36px] w-[36px] shrink-0 items-center justify-center overflow-hidden rounded-full text-h4 leading-none text-white/80 hover:bg-white/10"
        >
          ×
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-8 overflow-y-auto bg-grey6 px-16 py-12">
        {messages.length === 0 ? (
          <div className="flex flex-col gap-8">
            <div className="max-w-[244px] rounded-xl rounded-bl-sm bg-white px-12 py-10 text-small text-body1 shadow-card">
              Hi, I am AI Guru. Pick a quick action and I will help you right away.
            </div>
            <div className="w-fit rounded-full bg-white px-8 py-4 text-tiny font-semibold text-brand-primary shadow-card">
              Fast replies
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`max-w-[244px] px-12 py-8 text-small shadow-card ${
                message.role === "user"
                  ? "self-end rounded-xl rounded-br-sm bg-brand-primary text-white"
                  : "self-start rounded-xl rounded-bl-sm bg-white text-body1"
              }`}
            >
              {message.text}
            </div>
          ))
        )}
      </div>

      <div className="flex flex-col gap-8 border-t border-strokeLight bg-white p-12">
        {quickPrompts.map((prompt) => (
          <button
            key={prompt.label}
            type="button"
            onClick={() => handlePrompt(prompt)}
            className="group flex w-full items-center justify-between gap-8 rounded-lg border border-strokeLight bg-white px-12 py-8 text-left text-small font-semibold text-heading hover:border-brand-primary hover:bg-indigo-100/50"
          >
            <span>{prompt.label}</span>
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-grey6 text-body2 group-hover:bg-brand-primary group-hover:text-white">
              ›
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
