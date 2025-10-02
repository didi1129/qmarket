import Image from "next/image";

interface ItemImageProps {
  name: string;
  imgUrl: string | null;
}

export default function ItemImage({ name, imgUrl }: ItemImageProps) {
  return (
    <figure className="relative w-[100px] h-[122px] flex-shrink-0 rounded-lg overflow-hidden">
      <Image
        src={imgUrl ?? "/images/empty.png"}
        alt={name}
        width={100}
        height={122}
        className="object-cover"
      />
    </figure>
  );
}
