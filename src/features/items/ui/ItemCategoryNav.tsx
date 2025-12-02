import { ITEM_CATEGORY_NAV } from "@/shared/config/constants";
import Image from "next/image";
import Link from "next/link";

export default function ItemCategoryNav() {
  return (
    <ol className="flex gap-4 flex-wrap">
      {ITEM_CATEGORY_NAV.map((n) => (
        <li key={n.key}>
          <Link href={n.link}>
            <Image src={n.image} alt={n.key} width={86} height={95} />
          </Link>
        </li>
      ))}
    </ol>
  );
}
