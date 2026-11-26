import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SegmentedProps<T extends string> {
  name: string;
  legend: ReactNode;
  legendClassName?: string;
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

// A two-or-more way switch built from real radio buttons, so arrow keys work.
const Segmented = <T extends string>({
  name,
  legend,
  legendClassName,
  options,
  value,
  onChange,
  className,
}: SegmentedProps<T>) => (
  <fieldset className={className}>
    <legend className={cn("mb-3 font-display text-3xl font-semibold", legendClassName)}>{legend}</legend>
    <div className="inline-grid w-full auto-cols-fr grid-flow-col rounded-full border-2 border-ink bg-white p-1 sm:w-auto">
      {options.map((option) => {
        const checked = option.value === value;
        return (
          <label
            key={option.value}
            className={cn(
              "flex min-h-12 cursor-pointer items-center justify-center rounded-full px-2 text-center text-base font-bold whitespace-nowrap sm:px-6 sm:text-lg transition-colors has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-link",
              checked ? "bg-ink text-paper" : "text-ink hover:bg-sun",
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={checked}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        );
      })}
    </div>
  </fieldset>
);

export default Segmented;
