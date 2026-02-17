import { supabaseServer } from "@/shared/api/supabase-server";
import CommentSection from "@/features/comment/ui/CommentSection";
import ButtonToBack from "@/shared/ui/LinkButton/ButtonToBack";
import Image from "next/image";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;

  const { data: entry } = await supabaseServer
    .from("best_dresser")
    .select("nickname, description, image_url")
    .eq("id", id)
    .single();

  if (!entry) {
    return { title: "베스트 드레서" };
  }

  const title = `${entry.nickname}의 코디`;
  const description = entry.description || `${entry.nickname}의 2025 베스트 드레서 참가작`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: entry.image_url ? [{ url: entry.image_url }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: entry.image_url ? [entry.image_url] : [],
    },
  };
}

export default async function EntryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: entry } = await supabaseServer
    .from("best_dresser")
    .select("*")
    .eq("id", id)
    .single();

  if (!entry) return <div>게시물을 찾을 수 없습니다.</div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 mt-20">
      <ButtonToBack className="hover:bg-pink-100" />

      <div className="mb-8 flex flex-col justify-center items-center">
        <Image
          src={entry.image_url}
          alt={entry.nickname}
          width={320}
          height={400}
          className="w-[320px] rounded-2xl mb-8"
        />
        <h2 className="text-2xl font-bold mb-2">
          {entry.description}{" "}
          <span className="inline-flex items-center gap-2 text-pink-500 font-bold">
            💖 {entry.votes}
          </span>
        </h2>
        <p className="text-gray-600 mb-4">{entry.nickname}</p>
      </div>

      <CommentSection entryId={entry.id} />
    </div>
  );
}
