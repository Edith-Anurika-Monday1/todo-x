// @ts-ignore
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

export function SimplePager({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) {
  return (
    <div className="flex gap-2">
      <button onClick={onPrev} aria-label="Previous"><ChevronLeft /></button>
      <button onClick={onNext} aria-label="Next"><ChevronRight /></button>
    </div>
  );
}
