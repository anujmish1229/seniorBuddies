import { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Each inner page opens on a band of one of the logo's colours, so the title
// reads as its own section.
const tones = {
  sun: "bg-sun",
  shirt: "bg-shirt",
  blush: "bg-blush",
} as const;

interface PageHeaderProps {
  title: string;
  tone: keyof typeof tones;
  children?: ReactNode;
  centered?: boolean;
}

const PageHeader = ({ title, tone, children, centered }: PageHeaderProps) => (
  <div className={cn(tones[tone])}>
    <header className={cn("container pt-14 pb-14 md:pt-20 md:pb-20", centered && "text-center")}>
      <h1 className={cn("max-w-5xl text-[clamp(3rem,8vw,6.5rem)]", centered && "mx-auto")}>{title}</h1>
      {children && (
        <div className={cn("mt-6 max-w-2xl text-xl md:text-2xl md:leading-snug", centered && "mx-auto")}>{children}</div>
      )}
    </header>
  </div>
);

export default PageHeader;
