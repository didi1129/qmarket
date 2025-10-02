"use client";

import { Input } from "@/shared/ui/input";
import { ChangeEvent, useState, useMemo } from "react";
import debounce from "@/shared/lib/debounce";

interface SearchInputProps {
  value: string;
  className?: string;
  onSearch: (value: string) => void;
}

export default function SearchInput({
  value,
  className,
  onSearch,
}: SearchInputProps) {
  const [inputValue, setInputValue] = useState(value);

  const debouncedSearch = useMemo(
    () => debounce((val: string) => onSearch(val), 500),
    [onSearch]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // 입력은 바로 반영
    debouncedSearch(e.target.value); // 검색 요청만 debounce
  };

  return (
    <Input
      type="text"
      placeholder="상품명 검색"
      value={inputValue}
      onChange={handleChange}
      className={className}
    />
  );
}
