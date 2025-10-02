import { Item } from "../model/types";
import { Badge } from "@/shared/ui/badge";

interface ItemRowProps {
  item: Item;
}

const ItemRow = ({ item }: ItemRowProps) => {
  return (
    <div
      className={`p-4 border rounded-lg shadow-sm ${
        item.is_sold ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-start space-x-4">
        {/* 아이템 정보 */}
        <div className="flex-grow min-w-0">
          <h3 className="text-lg font-semibold truncate">{item.item_name}</h3>
          <p className="text-2xl font-bold text-blue-700 mt-1 flex items-center gap-0.5">
            {item.price.toLocaleString()}
            <span className="text-base mt-1">원</span>
          </p>
        </div>
      </div>

      {/* 메타 정보 (닉네임, 상태) */}
      <div className="mt-3 text-sm flex items-center justify-between">
        <Badge variant="secondary" className="text-gray-700 truncate">
          판매자:{" "}
          <span className="font-bold text-gray-900">{item.nickname}</span>
        </Badge>

        <div className="flex space-x-2 text-xs font-medium">
          {/* 판매 완료 여부 (is_sold) */}
          <Badge
            className={`${
              item.is_sold ? "bg-black" : "bg-green-600"
            } text-white`}
          >
            {item.is_sold ? "판매완료" : "판매중"}
          </Badge>

          {/* 판매자 온라인 여부 (is_online) */}
          <Badge
            variant="secondary"
            className={item.is_online ? "bg-blue-500 text-white" : undefined}
          >
            {item.is_online ? "온라인" : "미접속"}
          </Badge>

          {/* 상품 출처 (is_gatcha) */}
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 border-yellow-200"
          >
            {item.item_source}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default ItemRow;
