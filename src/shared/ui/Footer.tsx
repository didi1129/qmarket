import Link from "next/link";
import { cn } from "../lib/utils";
import CreateInquiryModal from "@/features/inquiry/ui/CreateInquiryModal";
import CreateReportModal from "@/features/report/ui/CreateReportModal";

export default function Footer({ className }: { className?: string }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "w-full pt-20 md:pt-40 pb-12 text-center md:text-left",
        className
      )}
    >
      <div className="lg:max-w-6xl mx-auto px-4 xl:px-0">
        <div className="flex flex-col gap-2 items-center md:items-start text-xs text-foreground/50">
          <p>&copy; {currentYear} Q-Market.</p>
          <Link href="/terms">이용약관 | 개인정보처리방침</Link>
          <div className="flex items-center -mt-2">
            <CreateInquiryModal />
            <span className="text-[12px] mx-1">|</span>
            <CreateReportModal />
          </div>
        </div>
      </div>
    </footer>
  );
}
