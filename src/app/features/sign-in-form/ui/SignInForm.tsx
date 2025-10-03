"use client";

import { useForm } from "react-hook-form";
import {
  SignInFormSchema,
  SignInFormValues,
} from "@/features/sign-in-form/model/SignInFormSchema";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Button } from "@/shared/ui/button";
import { useRouter } from "next/navigation";
import { supabase } from "@/shared/api/supabase-client";
import { USERS_TABLE_NAME } from "@/shared/config/constants";

export default function SignInForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(SignInFormSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: SignInFormValues) => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.signInWithPassword({
        email: data.email.trim().toLowerCase(),
        password: data.password,
      });

      if (error) {
        const errMsg = error.message;
        if (
          errMsg.includes("Invalid login credentials") ||
          errMsg.includes("not confirmed")
        ) {
          toast.error(
            "이메일 인증이 완료되지 않았거나, 비밀번호가 올바르지 않습니다."
          );
        } else {
          toast.error(error.message);
        }
        return;
      }

      if (!user) {
        toast.error("로그인에 실패했습니다. 다시 시도해주세요.");
        return;
      }

      // ✅ 로그인 성공 후 users 테이블에서 nickname 가져오기
      const { data: profile, error: profileError } = await supabase
        .from(USERS_TABLE_NAME)
        .select("nickname")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) {
        console.error("닉네임 조회 실패:", profileError.message);
        toast.success("로그인 성공! (닉네임 조회 실패)");
      } else {
        toast.success(`환영합니다, ${profile?.nickname ?? "유저"}님!`);
      }

      // 메인 페이지로 이동
      router.push("/");
    } catch (err) {
      console.log(err);
      toast.error("알 수 없는 에러가 발생했습니다.");
    }
  };

  return (
    <div className="w-md mx-auto mt-10 p-6">
      <div className="mb-12 text-center">
        <h2 className="text-2xl font-bold mb-1">로그인</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* 이메일 */}
        <div>
          <Label
            htmlFor="email"
            className="block mb-2 text-gray-800 font-medium"
          >
            이메일
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="이메일"
            autoComplete="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* 비밀번호 */}
        <div>
          <Label htmlFor="pw" className="block mb-2 text-gray-800 font-medium">
            비밀번호
          </Label>
          <Input
            id="pw"
            type="password"
            placeholder="비밀번호"
            autoComplete="current-password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isSubmitting ? "로그인 중..." : "로그인"}
        </Button>
      </form>
    </div>
  );
}
