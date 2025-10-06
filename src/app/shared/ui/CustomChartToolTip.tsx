import TransactionList from "@/features/transaction-list/ui/TransactionList";
import { SaleHistory } from "../lib/getItemSaleHistory";

interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number; payload: SaleHistory }[];
  label?: string;
}

export default function CustomChartTooltip({
  active,
  payload,
  label,
}: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const avgPrice = payload[0].value.toLocaleString();

    return (
      <div
        className="bg-white p-3 border border-gray-200 rounded-md shadow-lg"
        style={{ minWidth: "250px" }}
      >
        <p className="font-bold text-sm text-blue-600 mb-2">
          🧮 평균 거래 가격: {avgPrice}원
        </p>
        <TransactionList payload={payload} label={label!} />{" "}
      </div>
    );
  }
  return null;
}
