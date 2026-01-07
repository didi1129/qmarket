import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { getWeekStart, getWeekRange } from "@/shared/lib/formatters";

const useWeekNavigation = () => {
  const searchParams = useSearchParams();
  const weekParam = searchParams.get("week");

  const weekStart = useMemo(() => {
    const parsed = weekParam ? new Date(weekParam) : null;
    if (!parsed || isNaN(parsed.getTime())) {
      return getWeekStart(new Date());
    }
    return getWeekStart(parsed);
  }, [weekParam]);

  return { weekStart, ...getWeekRange(weekStart) };
};

export default useWeekNavigation;
