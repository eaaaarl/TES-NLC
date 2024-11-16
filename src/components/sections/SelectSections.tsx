import React, { useEffect, useState } from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Skeleton } from "../ui/skeleton";
import { Sections } from "@/lib/types";

const fetchSection = async (
  yearlevel: string,
  department: string
): Promise<Sections[]> => {
  const response = await fetch(
    `http://localhost:3000/api/student/auth/getSectionByYearLevelDepartment?yearlevel=${yearlevel}&department=${department}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch sections");
  }
  return await response.json();
};

interface SelectSectionsProps {
  field: {
    value: string;
    onChange: (value: string) => void;
    name: string;
  };
  departmentId: string;
  yearLevelId: string;
  disabled: boolean;
  onSectionChange: (sectionId: string) => void;
}

export default function SelectSections({
  field,
  departmentId,
  yearLevelId,
  disabled,
  onSectionChange,
}: SelectSectionsProps) {
  const [sections, setSections] = useState<Sections[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSections = async () => {
      if (!yearLevelId || !departmentId) return;
      setLoading(true);
      try {
        const response = await fetchSection(yearLevelId, departmentId);
        setSections(response);
        if (response.length === 0) {
          field.onChange("");
          onSectionChange("");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, [yearLevelId, departmentId]);

  const handleChange = (sectionId: string) => {
    field.onChange(sectionId);
    onSectionChange(sectionId);
  };
  return (
    <FormItem>
      <FormLabel>Sections</FormLabel>
      <FormControl>
        <Select
          onValueChange={handleChange}
          value={field.value}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Sections" />
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
                </>
              ) : sections.length === 0 ? (
                <div className="p-2 text-gray-500">No Sections Available</div>
              ) : (
                sections.map((section) => (
                  <SelectItem key={section.id} value={section.id}>
                    {section.sectionName}
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
