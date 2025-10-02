"use client";

import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { useState, type FormEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/shared/api/supabase-client";
import { sanitize } from "@/shared/lib/sanitize";
import { Label } from "@/shared/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { ScrollArea } from "@/shared/ui/scroll-area";

export default function ItemUploadModal() {
  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [nickname, setNickname] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const tableName = `${category}`;

      const createdAt = new Date().toISOString();

      const { error } = await supabase.from(tableName).insert([
        {
          question: sanitize(question),
          answer: sanitize(answer),
          created_at: createdAt,
          nickname: [sanitize(nickname)],
        },
      ]);

      if (error) throw error;

      toast.success("문제가 성공적으로 추가되었습니다!");

      // React Query 캐시 갱신
      queryClient.invalidateQueries({ queryKey: ["items"] });

      setCategory("");
      setQuestion("");
      setAnswer("");
      setNickname("");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`상품 등록 실패: ${error.message}`);
      } else {
        toast.error("알 수 없는 오류가 발생했습니다.");
      }
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="w-auto mx-auto bg-blue-600 hover:bg-blue-700"
        >
          상품 등록하기
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="mb-4">
          <DialogTitle>상품 등록하기</DialogTitle>
          <DialogDescription className="flex flex-col">
            <span>판매하실 상품 정보를 등록해주세요.</span>
            <span>* 상품 이미지는 관리자 확인 후 등록됩니다.</span>
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[50vh] pr-4">
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="grid gap-8">
              <div className="grid gap-3">
                <label htmlFor="question" className="text-sm">
                  상품명
                </label>
                <Input
                  id="answer"
                  name="answer"
                  placeholder="상품명"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </div>

              <div className="grid gap-3">
                <label htmlFor="answer" className="text-sm">
                  가격
                </label>
                <Input
                  id="answer"
                  name="answer"
                  placeholder="가격"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </div>

              <div className="grid gap-3">
                <label htmlFor="selling1" className="text-sm">
                  판매중/판매완료
                </label>
                <RadioGroup defaultValue="selling">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="selling" id="selling1" />
                    <Label htmlFor="selling1">판매중</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="sold" id="selling2" />
                    <Label htmlFor="selling2">판매완료</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid gap-3">
                <label htmlFor="online1" className="text-sm">
                  온라인/미접속
                </label>
                <RadioGroup defaultValue="online">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="online" id="online1" />
                    <Label htmlFor="online1">온라인</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="offline" id="online2" />
                    <Label htmlFor="online2">미접속</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid gap-3">
                <label htmlFor="source1" className="text-sm">
                  아이템 출처
                </label>
                <RadioGroup defaultValue="gatcha">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="gatcha" id="source1" />
                    <Label htmlFor="source1">뽑기</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="shop" id="source2" />
                    <Label htmlFor="source2">상점</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="lottery" id="source3" />
                    <Label htmlFor="source3">복권</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid gap-3">
                <label htmlFor="nickname" className="text-sm">
                  판매자
                </label>
                <Input
                  id="nickname"
                  name="nickname"
                  placeholder="인게임/디스코드 닉네임"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </div>
            </div>
          </form>
        </ScrollArea>

        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button variant="outline">닫기</Button>
          </DialogClose>
          <Button type="submit">
            {isSubmitting ? "등록 중..." : "등록하기"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
