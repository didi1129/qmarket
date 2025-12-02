import ItemList from "@/features/items/ui/ItemList";
import { ItemCategory } from "@/features/item/model/itemTypes";

export default async function ItemCategoryPage({
  params,
}: {
  params: Promise<{ category: ItemCategory }>;
}) {
  const { category } = await params;
  return (
    <section>
      {/* 팝니다 */}
      <ItemList category={category} isForSale={true} isSold={false} />
      {/* 삽니다 */}
      <ItemList category={category} isForSale={false} isSold={false} />
    </section>
  );
}
