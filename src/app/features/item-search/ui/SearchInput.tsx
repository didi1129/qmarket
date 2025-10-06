"use client";

import { Input } from "@/shared/ui/input";
import {
  ChangeEvent,
  useEffect,
  useState,
  useMemo,
  InputHTMLAttributes,
} from "react";
import debounce from "@/shared/lib/debounce";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  className?: string;
  onSearch: (value: string) => void;
}

export default function SearchInput({
  value,
  className,
  onSearch,
  ...rest
}: SearchInputProps) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const debouncedSearch = useMemo(
    () => debounce((val: string) => onSearch(val), 500),
    [onSearch]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // 입력창 즉시 반영
    debouncedSearch(e.target.value); // 검색 요청만 debounce
  };

  return (
    <Input
      type="text"
      placeholder="아이템명 검색"
      value={inputValue}
      onChange={handleChange}
      className={className}
      {...rest}
    />
  );
}
