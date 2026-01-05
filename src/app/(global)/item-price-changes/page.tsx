import ItemPriceChangesTable from "@/features/market/ui/ItemPriceChangesTable";

export default async function ItemPriceChangesPage() {
  return (
    <section className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold tracking-tight mb-8">
        📊 시세 변동 내역
      </h2>

      <ItemPriceChangesTable />
    </section>
  );
}
