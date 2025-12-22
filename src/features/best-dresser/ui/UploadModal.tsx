"use client";

import { useState, ChangeEvent } from "react";
import { supabase } from "@/shared/api/supabase-client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Camera, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { getUploadUrl } from "@/app/actions/s3-actions";
import { useUser } from "@/shared/hooks/useUser";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

interface UploadModalProps {
  onUploadSuccess?: (image_url: string) => void;
}

export default function UploadModal({ onUploadSuccess }: UploadModalProps) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isSucceeded, setIsSucceeded] = useState(false);
  const { data: user } = useUser();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile && selectedFile.size > MAX_FILE_SIZE) {
      toast.error("2MB 이하의 파일을 선택해주세요.");
      e.target.value = "";
      return;
    }

    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setIsSucceeded(false);
    }
  };

  const handleUpload = async () => {
    if (!user) {
      toast.error("로그인이 필요합니다.");
      return;
    }

    if (!file) {
      toast.error("이미지를 등록해주세요.");
      return;
    }

    setUploading(true);
    setIsSucceeded(false);

    try {
      const { signedUrl, fileUrl } = await getUploadUrl(file.name, file.type);

      const res = await fetch(signedUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      // if (res.ok) {
      //   onUploadSuccess?.(fileUrl);
      //   toast.success("거래 인증 등록에 성공했습니다.");
      // }

      const { data, error } = await supabase.from("best_dresser").insert({
        image_url: fileUrl,
        user_id: user.id,
        nickname: user.user_metadata.custom_claims.global_name,
        votes: 0,
      });

      toast.success("이달의 베스트 드레서 후보로 등록되었습니다!");
      setIsSucceeded(true);
      setOpen(false);
    } catch (error) {
      console.error("실패:", error);
      toast.error("등록 중 오류가 발생했습니다.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) {
          // 모달 닫힐 때 상태 초기화 (선택사항)
          setIsSucceeded(false);
          setFile(null);
          setPreviewUrl(null);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-6 px-8 rounded-2xl shadow-lg transition-all transform hover:scale-105">
          <Camera className="mr-2 h-5 w-5" />내 아바타 뽐내기
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-white/95 backdrop-blur-xl border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            📸 아바타 등록하기
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="photo" className="text-gray-600 font-medium">
              아바타 스크린샷 (Max 2MB)
            </Label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading || isSucceeded}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-pink-50 file:text-pink-700
                hover:file:bg-pink-100
                disabled:opacity-50 cursor-pointer"
            />

            {previewUrl && (
              <div className="mt-2 rounded-xl overflow-hidden border-2 border-pink-100 aspect-square relative shadow-inner bg-gray-50">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="object-cover w-full h-full transition-opacity duration-300"
                />
                {isSucceeded && (
                  <div className="absolute inset-0 bg-white/60 flex items-center justify-center backdrop-blur-[2px]">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleUpload}
            disabled={uploading || !file || isSucceeded}
            className={`w-full py-6 rounded-xl font-bold transition-all ${
              isSucceeded
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90"
            } text-white`}
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                업로드 중...
              </>
            ) : isSucceeded ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                등록 완료
              </>
            ) : (
              "컨테스트 참가하기"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
