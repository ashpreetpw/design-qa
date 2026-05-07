import React from "react";

export type FloatingCartBarProps = {
  cartCount: number;
};

export default function FloatingCartBar({ cartCount }: FloatingCartBarProps) {
  if (cartCount === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center pointer-events-none">
      <div className="w-[360px] pointer-events-auto border-t border-strokeLight bg-white px-16 py-12 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
          <div className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-orange-25 text-small font-bold text-orange-500 border border-orange-500/20">
            {cartCount}
          </div>
          <span className="text-regular font-semibold text-heading">
            {cartCount === 1 ? "Item" : "Items"} in cart
          </span>
        </div>
        <button className="flex items-center gap-6 rounded bg-brand-primary px-16 py-8 text-regular font-semibold text-white">
          View cart
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/24/svg"
          >
            <path
              d="M5 12H19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 5L19 12L12 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      </div>
    </div>
  );
}
