"use client";

import SalesStatusWidget from "@/widgets/item-list/ui/SalesStatusWidget";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Item } from "@/entities/item/model/types";
import MarketPriceDashboard from "@/widgets/market-price-dashboard/ui/MarketPriceDashboard";

interface Props {
  initialItems: Item[];
}

export default function TabView({ initialItems }: Props) {
  return (
    <Tabs defaultValue="marketPrices" className="max-w-5xl mx-auto">
      <TabsList className="w-full">
        <TabsTrigger value="marketPrices" className="cursor-pointer py-2">
          시세 조회
        </TabsTrigger>
        <TabsTrigger value="items" className="cursor-pointer py-2">
          판매 현황
        </TabsTrigger>
      </TabsList>

      <TabsContent value="marketPrices">
        <MarketPriceDashboard />
      </TabsContent>

      <TabsContent value="items">
        <SalesStatusWidget initialItems={initialItems} />
      </TabsContent>
    </Tabs>
  );
}
