import ItemRow from "@/entities/item/ui/ItemRow";
import { Item } from "@/entities/item/model/types";

interface ItemListWidgetProps {
  items: Item[];
  isLoading: boolean;
}

export const ItemListWidget = ({ items, isLoading }: ItemListWidgetProps) => {
  if (isLoading) {
    return (
      <div className="text-center p-8">상품 목록을 불러오는 중입니다...</div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500">
        현재 등록된 상품이 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <ItemRow key={item.id} item={item} />
      ))}
    </div>
  );
};
