import { Item } from "../model/types";
import Image from "next/image";

interface ItemRowProps {
  item: Item;
}

const statusColor = {
  online: "text-green-600",
  offline: "text-gray-500",
  selling: "bg-blue-100 text-blue-800",
  sold: "bg-red-100 text-red-800",
};

const ItemRow = ({ item }: ItemRowProps) => {
  return (
    <div
      className={`p-4 border rounded-lg shadow-sm ${
        item.is_sold ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-start space-x-4">
        {/* 아이템 이미지 */}
        <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden">
          <Image
            src={item.image}
            alt={item.item_name}
            fill
            sizes="64px"
            className="object-cover"
          />
          {item.is_sold && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <span className="text-white font-bold text-sm">완료</span>
            </div>
          )}
        </div>

        {/* 아이템 정보 */}
        <div className="flex-grow min-w-0">
          <h3 className="text-lg font-semibold truncate">{item.item_name}</h3>
          <p className="text-2xl font-bold text-indigo-700 mt-1">
            {item.price.toLocaleString()} 원
          </p>
        </div>
      </div>

      {/* 메타 정보 (닉네임, 상태) */}
      <div className="mt-3 text-sm flex items-center justify-between">
        <p className="font-medium text-gray-700 truncate">
          판매자: {item.nickname}
        </p>

        <div className="flex space-x-2 text-xs font-medium">
          {/* 판매 완료 여부 (is_sold) */}
          <span
            className={`px-2 py-0.5 rounded-full ${statusColor[item.is_sold]}`}
          >
            {item.is_sold ? "판매완료" : "판매중"}
          </span>

          {/* 판매자 온라인 여부 (is_online) */}
          <span
            className={`px-2 py-0.5 rounded-full ${
              item.is_online === "online" ? "bg-green-100" : "bg-gray-100"
            } ${statusColor[item.is_online]}`}
          >
            {item.is_online === "online" ? "온라인" : "미접속"}
          </span>

          {/* 상품 출처 (is_gatcha) */}
          <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">
            {item.item_source}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ItemRow;
