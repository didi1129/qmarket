"use client";

import ItemEditModal from "@/features/item-upload-modal/ui/ItemEditModal";
import { ItemDeleteModal } from "@/features/item-upload-modal/ui/ItemDeleteModal";
import { useUser } from "@/shared/providers/UserProvider";
import { Item } from "@/entities/item/model/types";

export default function MyItemActions({ item }: { item: Item }) {
  const user = useUser();

  return (
    <div className="absolute right-4 top-4 flex gap-2">
      <ItemEditModal item={item} />
      {user?.id && <ItemDeleteModal itemId={item.id} userId={user.id} />}
    </div>
  );
}
