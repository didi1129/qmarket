import ItemUploadModal from "@/features/item-upload-modal/ui/ItemUploadModal";

export default function ItemListHeaderWidget() {
  return (
    <div className="flex justify-end mb-6">
      <ItemUploadModal />
    </div>
  );
}
