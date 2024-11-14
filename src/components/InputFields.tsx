import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

interface InputFieldsProps {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  name: string;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  label?: any;
  types?: string;
  placeHolder?: string;
  className?: string;
}

export default function InputFields({
  control,
  name,
  label,
  types,
  placeHolder,
  className,
}: InputFieldsProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              className={className}
              type={types}
              placeholder={placeHolder}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
