import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

interface BirthDateSelectProps {
  field: {
    value: string | undefined;
    onChange: (date: string) => void;
  };
}

export default function BirthDateSelect({ field }: BirthDateSelectProps) {
  const { value, onChange } = field;

  const initialDate = value ? new Date(value) : undefined;

  const [day, setDay] = useState<number | "">(
    initialDate ? initialDate.getDate() : ""
  );
  const [month, setMonth] = useState<number | "">(
    initialDate ? initialDate.getMonth() + 1 : ""
  );
  const [year, setYear] = useState<number | "">(
    initialDate ? initialDate.getFullYear() : ""
  );

  const currentYear = new Date().getFullYear();
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, i) => currentYear - i
  );

  // Update the form field whenever day, month, or year changes
  useEffect(() => {
    if (day && month && year) {
      const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      onChange(dateStr);
    }
  }, [day, month, year, onChange]);

  return (
    <div className="space-y-2">
      <Label>Birth Date</Label>
      <div className="flex space-x-2">
        <Select onValueChange={(value) => setDay(Number(value))}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={day ? `Day: ${day}` : "Day"} />
          </SelectTrigger>
          <SelectContent>
            {days.map((d) => (
              <SelectItem key={d} value={String(d)}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setMonth(Number(value))}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={month ? `Month: ${month}` : "Month"} />
          </SelectTrigger>
          <SelectContent>
            {months.map((m) => (
              <SelectItem key={m} value={String(m)}>
                {new Date(0, m - 1).toLocaleString("default", {
                  month: "long",
                })}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setYear(Number(value))}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={year ? `Year: ${year}` : "Year"} />
          </SelectTrigger>
          <SelectContent>
            {years.map((y) => (
              <SelectItem key={y} value={String(y)}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
