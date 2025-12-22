import { supabase } from "@/shared/api/supabase-client";
import { BestDresserEntry } from "../model/bestDresserType";

interface EntryCardProps {
  entry: BestDresserEntry;
  onVoteSuccess: () => void;
}

export default function EntryCard({ entry, onVoteSuccess }: EntryCardProps) {
  const handleVote = async () => {
    // 단순화된 투표 로직 (RPC 또는 직접 update)
    const { error } = await supabase
      .from("best_dresser")
      .update({ votes: entry.votes + 1 })
      .eq("id", entry.id);

    if (!error) onVoteSuccess();
  };

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl transition-transform hover:scale-105 border border-white/50">
      <div className="aspect-[4/5] relative overflow-hidden">
        <img
          src={entry.image_url}
          alt="Avatar"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-5 flex justify-between items-center">
        <div>
          <p className="font-bold text-gray-800">{entry.nickname}</p>
          <p className="text-sm text-pink-500 font-semibold">
            💖 {entry.votes} 득표
          </p>
        </div>
        <button
          onClick={handleVote}
          className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-4 py-2 rounded-full font-bold hover:shadow-lg transition-all active:scale-95"
        >
          투표하기
        </button>
      </div>
    </div>
  );
}
