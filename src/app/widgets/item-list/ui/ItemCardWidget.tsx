import ItemCard from "@/entities/item/ui/ItemCard";
import { Item } from "@/entities/item/model/types";

interface Props {
  items: Item[];
}

export default function ItemCardWidget({ items }: Props) {
  return (
    <ol>
      {items.map((item, idx) => (
        <ItemCard key={`${item.id}=${idx}`} item={item} />
      ))}
    </ol>
  );
}
