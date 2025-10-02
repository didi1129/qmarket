import { fetchInitialItems } from "./entities/item/model/server-fetch";
import ClientMoreItems from "./widgets/item-list/ui/ClientMoreItems";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./shared/ui/tabs";

export default async function Home() {
  const initialItems = await fetchInitialItems(10, 0);

  return (
    <main className="flex min-h-screen">
      <section className="flex-1 p-6">
        <div className="mb-12">
          <h1 className="text-3xl text-center font-bold mb-2">Q-Market</h1>
          <p className="text-center text-gray-500 text-sm">
            큐플레이 아이템 판매 현황, 시세 조회 서비스
          </p>
        </div>

        <Tabs defaultValue="items" className="max-w-4xl mx-auto">
          <TabsList className="w-full">
            <TabsTrigger value="items" className="cursor-pointer py-2">
              판매 현황
            </TabsTrigger>
            <TabsTrigger value="marketPrices" className="cursor-pointer py-2">
              시세 조회
            </TabsTrigger>
          </TabsList>

          <TabsContent value="items">
            <ClientMoreItems initialItems={initialItems} />
          </TabsContent>

          <TabsContent value="marketPrices">시세 조회</TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
