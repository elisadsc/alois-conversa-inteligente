
import { useState } from "react";
import { cn } from "@/lib/utils";

interface LikertScaleProps {
  value: number;
  onChange: (value: number) => void;
}

export function LikertScale({ value, onChange }: LikertScaleProps) {
  return (
    <div className="flex items-center justify-between gap-1">
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type="button"
          onClick={() => onChange(rating)}
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center transition-all",
            value === rating
              ? "bg-alois-purple text-white"
              : "bg-secondary text-muted-foreground hover:bg-primary/20"
          )}
          aria-label={`Avaliação ${rating} de 5`}
        >
          {rating}
        </button>
      ))}
    </div>
  );
}
