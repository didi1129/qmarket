import { useEffect, useState } from "react";
import { getDailyItemInsertStatus } from "../model/actions";
import { useUser } from "@/shared/hooks/useUser";
import { DAILY_LIMIT } from "@/shared/lib/redis";

export default function DailyLimitDisplay() {
  const { data: user } = useUser();
  const [status, setStatus] = useState({
    remaining: DAILY_LIMIT,
    remainingTime: 0,
  });

  useEffect(() => {
    if (!user) return;

    const fetchStatus = async () => {
      const res = await getDailyItemInsertStatus(user.id);
      setStatus({ remaining: res.remaining, remainingTime: res.remainingTime });
    };

    fetchStatus();

    const interval = setInterval(() => {
      setStatus((prev) => ({
        ...prev,
        remainingTime: prev.remainingTime > 0 ? prev.remainingTime - 1 : 0,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [user]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      아이템 등록 가능 횟수: {status.remaining}/{DAILY_LIMIT}{" "}
      {status.remaining === 0 && (
        <span className="text-red-600">
          (다음 등록까지 남은 시간: {formatTime(status.remainingTime)})
        </span>
      )}
    </div>
  );
}
