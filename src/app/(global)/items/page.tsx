import ItemList from "@/features/items/ui/ItemList";
import SectionTitle from "@/shared/ui/SectionTitle";
import ButtonToBack from "@/shared/ui/LinkButton/ButtonToBack";
import SellingItemCreateModal from "@/features/item/ui/SellingItemCreateModal";
import PurchaseItemCreateModal from "@/features/item/ui/PurchaseItemCreateModal";

export default function ItemsPage() {
  return (
    <section className="w-full lg:max-w-6xl mx-auto">
      <ButtonToBack />
      <SectionTitle>🧾 전체 판매/구매 현황</SectionTitle>

      <div className="flex gap-4 md:flex-row flex-col">
        <div className="shrink-0 md:min-w-[264px]">
          <div className="sticky top-20">
            <h3 className="md:text-lg font-bold mb-2 text-base">아이템 등록</h3>
            {/* 구매/판매 아이템 등록 버튼 */}
            <div className="flex flex-col gap-2">
              <SellingItemCreateModal />
              <PurchaseItemCreateModal />
            </div>
          </div>
        </div>

        <div className="flex grow gap-4">
          {/* 팝니다 */}
          <div className="w-[50%]">
            <h3 className="md:text-lg font-bold mb-2 text-base">판매해요</h3>
            <ItemList isForSale={true} isSold={false} />
          </div>

          {/* 삽니다 */}
          <div className="w-[50%]">
            <h3 className="md:text-lg font-bold mb-2 text-base">구매해요</h3>
            <ItemList isForSale={false} isSold={false} />
          </div>
        </div>
      </div>
    </section>
  );
}
