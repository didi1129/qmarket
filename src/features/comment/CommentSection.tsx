"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/shared/api/supabase-client";
import { Button } from "@/shared/ui/button";
import { useUser } from "@/shared/hooks/useUser";
import { formatRelativeTime } from "@/shared/lib/formatters";

export default function CommentSection({ entryId }: { entryId: number }) {
  const [newComment, setNewComment] = useState("");
  const queryClient = useQueryClient();
  const { data: user } = useUser();

  const { data: comments, isPending } = useQuery({
    queryKey: ["comments", entryId],
    queryFn: async () => {
      const { data } = await supabase
        .from("best_dresser_comments")
        .select(`*`)
        .eq("entry_id", entryId)
        .order("created_at", { ascending: false });
      return data;
    },
  });

  const { mutate: addComment } = useMutation({
    mutationFn: async (content: string) => {
      if (!user) throw new Error("로그인이 필요합니다.");

      const { data: profile } = await supabase
        .from("user_profiles")
        .select("nickname")
        .eq("id", user.id)
        .single();

      if (!profile) throw new Error("유저 정보를 찾을 수 없습니다.");

      const { error } = await supabase.from("best_dresser_comments").insert({
        entry_id: entryId,
        user_id: user.id,
        nickname: profile.nickname,
        content,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      setNewComment("");
      queryClient.invalidateQueries({ queryKey: ["comments", entryId] });
    },
  });

  const { mutate: deleteComment } = useMutation({
    mutationFn: async (commentId: string) => {
      await supabase.from("best_dresser_comments").delete().eq("id", commentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", entryId] });
    },
  });

  return (
    <div className="bg-background rounded-2xl p-6 shadow-lg">
      <h3 className="font-bold mb-4 text-lg">댓글 {comments?.length || 0}</h3>

      <div className="flex gap-2 mb-6">
        <input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="따뜻한 댓글을 남겨주세요!"
          className="flex-1 p-3 rounded-xl border border-gray-200 focus:outline-pink-300"
        />
        <Button onClick={() => addComment(newComment)}>등록</Button>
      </div>

      <div className="space-y-4">
        {comments?.map((comment) => (
          <div
            key={comment.id}
            className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-start"
          >
            <div>
              <p className="text-sm text-gray-800">{comment.content}</p>
              <span>{comment.nickname}</span>
              <span className="text-[10px] text-gray-400">
                {formatRelativeTime(comment.created_at)}
              </span>
            </div>
            {/* 삭제 버튼은 유저 본인 확인 로직 추가 필요 */}
            <button
              onClick={() => deleteComment(comment.id)}
              className="text-red-300 text-xs"
            >
              삭제
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
