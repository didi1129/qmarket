import Image from "next/image";

interface ItemImageProps {
  name: string;
  imgUrl: string | null;
  size: "sm" | "lg";
}

export default function ItemImage({ name, imgUrl, size }: ItemImageProps) {
  return (
    <figure className="relative flex-shrink-0 rounded-md overflow-hidden">
      <Image
        src={imgUrl ?? "/images/empty.png"}
        alt={name}
        width={size === "lg" ? 100 : 40}
        height={size === "lg" ? 122 : 48}
        className="object-cover"
      />
    </figure>
  );
}
