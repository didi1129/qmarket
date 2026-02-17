"use client";

import { UseFormReturn, Controller } from "react-hook-form";
import { ItemFormType } from "../../model/schema";
import { Textarea } from "@/shared/ui/textarea";

interface MessageFieldProps {
  form: UseFormReturn<ItemFormType>;
}

export default function MessageField({ form }: MessageFieldProps) {
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <div className="grid gap-3">
      <label htmlFor="message" className="text-sm">
        메시지
      </label>
      <Controller
        name="message"
        control={control}
        render={({ field }) => (
          <Textarea
            id="message"
            placeholder="인게임 닉네임 등 연락 가능한 정보와 함께 적어주시면 원활한 거래에 도움이 됩니다."
            value={field.value}
            className="resize-none min-h-20"
            onChange={(e) => field.onChange(e.target.value)}
          />
        )}
      />
      {errors.message && (
        <p className="text-red-600 text-sm mt-1">
          {errors.message.message}
        </p>
      )}
    </div>
  );
}
