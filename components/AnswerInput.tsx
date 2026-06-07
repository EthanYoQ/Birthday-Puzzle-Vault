"use client";

import { FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AnswerInput({
  label,
  placeholder,
  onSubmit,
  buttonText = "Unlock",
  disabled = false,
}: {
  label: string;
  placeholder: string;
  onSubmit: (value: string) => void | Promise<void>;
  buttonText?: string;
  disabled?: boolean;
}) {
  const [value, setValue] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onSubmit(value);
  }

  return (
    <form className="flex flex-col gap-3 sm:flex-row" onSubmit={submit}>
      <label className="sr-only" htmlFor={label}>
        {label}
      </label>
      <Input
        id={label}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck={false}
        disabled={disabled}
      />
      <Button type="submit" disabled={disabled || !value.trim()} className="sm:min-w-36">
        {buttonText}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Button>
    </form>
  );
}
