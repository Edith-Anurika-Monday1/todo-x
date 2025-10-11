import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background",
  {
    variants: {
      variant: {
        // 🟣 Primary (Add, Save, Confirm, etc.)
        default:
          "bg-primary text-white hover:bg-secondary hover:text-white shadow-md",

        // 🔴 Destructive (Delete)
        destructive:
          "bg-red-600 text-white hover:bg-red-700 shadow-md focus-visible:ring-red-500",

        // ⚪ Outline (Cancel)
        outline:
          "border border-gray-600 bg-transparent text-gray-200 hover:bg-gray-800 hover:text-white transition-colors",

        // 🔵 Secondary (Neutral Actions)
        secondary:
          "bg-secondary text-white hover:bg-primary transition-colors shadow-sm",

        // 👻 Ghost (Minimal, subtle button)
        ghost:
          "bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white",

        // 🔗 Link (Inline text buttons)
        link:
          "text-primary underline underline-offset-4 hover:text-secondary hover:underline",
      },

      size: {
        default: "h-10 px-4 py-2 text-sm",
        sm: "h-8 px-3 text-sm rounded-md",
        lg: "h-11 px-6 text-base rounded-md",
        icon: "h-10 w-10 p-0 flex items-center justify-center",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
