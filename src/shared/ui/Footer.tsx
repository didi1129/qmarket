import Link from "next/link";
import { cn } from "../lib/utils";
import CreateInquiryModal from "@/features/inquiry/ui/CreateInquiryModal";
import CreateReportModal from "@/features/report/ui/CreateReportModal";

export default function Footer({ className }: { className?: string }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "w-full pt-20 md:pt-40 pb-12 px-4 md:px-0 text-center md:text-left",
        className
      )}
    >
      <div className="lg:max-w-6xl mx-auto">
        <div className="flex flex-col gap-2 text-xs text-foreground/50">
          <p>&copy; {currentYear} Q-Market.</p>
          <Link href="/terms">이용약관 | 개인정보처리방침</Link>
        </div>

        <div className="flex items-center">
          <CreateInquiryModal />
          <span className="text-[12px] mx-1">|</span>
          <CreateReportModal />
        </div>
      </div>
    </footer>
  );
}
