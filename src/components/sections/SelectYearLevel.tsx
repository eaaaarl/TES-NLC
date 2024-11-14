import React, { useEffect, useState } from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "../ui/skeleton";
import { YearLevel } from "@/lib/types";

interface SelectYearLevelProps {
  field: {
    value: string;
    onChange: (value: string) => void;
    name: string;
  };
  onYearLevelChange: (yearLevelId: string) => void;
}

export default function SelectYearLevel({
  field,
  onYearLevelChange,
}: SelectYearLevelProps) {
  const { toast } = useToast();
  const [yearlevel, setYearLevel] = useState<YearLevel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchYearLevel = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/admin/yearlevel`);
        if (!response.ok) {
          throw new Error("Failed to fetch Year Level");
        }
        const yearlevel = await response.json();
        setYearLevel(yearlevel);
      } catch (error) {
        console.error(error);
        toast({
          title: "Failed to fetch Year Level",
          description:
            "An error occurred while fetching the year level. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchYearLevel();
  }, [setYearLevel, toast]);

  const handleChange = (value: string) => {
    field.onChange(value);
    onYearLevelChange(value);
  };
  return (
    <FormItem>
      <FormLabel>Year Level</FormLabel>
      <FormControl>
        <Select onValueChange={handleChange} value={field.value || ''}>
          <SelectTrigger className="mt-1 w-full">
            <SelectValue placeholder="Select Year Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {loading ? (
                <>
                  <div className="p-2">
                    <Skeleton className="h-5 w-full" />
                  </div>
                  <div className="p-2">
                    <Skeleton className="h-5 w-full" />
                  </div>
                  <div className="p-2">
                    <Skeleton className="h-5 w-full" />
                  </div>
                  <div className="p-2">
                    <Skeleton className="h-5 w-full" />
                  </div>
                </>
              ) : (
                yearlevel.map((yearlevel) => (
                  <SelectItem key={yearlevel.id} value={yearlevel.id}>
                    {yearlevel.yearName.toUpperCase()}
                  </SelectItem>
                ))
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
