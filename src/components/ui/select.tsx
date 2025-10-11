// src/components/ui/select.tsx
import React from "react";

/**
 * Minimal Select primitives that match the props used in the rest of the app.
 * - Select: wrapper that renders a native <select> for simplicity.
 * - SelectTrigger / SelectValue / SelectContent / SelectItem are present so imports work.
 *
 * If later you'd like the full ShadCN behavior (popovers, keyboard navigation),
 * we can swap these for Radix/ShadCN primitives.
 */

export interface SelectProps<T = string> {
  value: T;
  onValueChange: (val: T) => void;
  children?: React.ReactNode;
  className?: string;
}

export function Select<T extends string = string>({ value, onValueChange, children, className = "" }: SelectProps<T>) {
  // Render a native select. We expect SelectItem children but will also accept direct <option>.
  // To keep compatibility, map SelectItem elements to option via React.Children.
  const options: Array<{ value: string; label: string }> = [];

  React.Children.forEach(children, (child) => {
    // @ts-ignore - inspect child type
    if (child && (child as any).type === SelectItem) {
      // @ts-ignore
      const val = (child.props as any).value;
      // @ts-ignore
      const label = (child.props as any).children;
      options.push({ value: String(val), label: String(label) });
    } else if (child && (child as any).type === "option") {
      // native option
      // @ts-ignore
      options.push({ value: String(child.props.value), label: String(child.props.children) });
    }
  });

  return (
    <select
      className={`rounded-md border px-3 py-2 text-sm ${className}`}
      value={String(value)}
      onChange={(e) => onValueChange(e.target.value as unknown as T)}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function SelectTrigger({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  return <span>{placeholder}</span>;
}

export function SelectContent({ children }: { children?: React.ReactNode }) {
  return <div>{children}</div>;
}

export function SelectItem({ value, children }: { value: string; children?: React.ReactNode }) {
  // This component is used only as a child marker inside Select; it does not output surrounding markup itself.
  return <option value={value as any}>{children}</option>;
}
