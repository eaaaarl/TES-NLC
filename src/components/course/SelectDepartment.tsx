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
import ky from "ky";
import { Skeleton } from "../ui/skeleton";

interface Department {
  id: string;
  departmentName: string;
}

interface SelectDepartmentProps {
  field: {
    value: string;
    onChange: (value: string) => void;
    name: string;
  }
}
export default function SelectDepartment({
  field,
}: SelectDepartmentProps) {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDepartments() {
      setLoading(true);
      setError(null);
      try {
        const res = await ky.get(`/api/admin/department`).json<Department[]>();
        setDepartments(res);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error fetching departments"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchDepartments();
  }, []);
  if (error) return <p>Error loading departments: {error}</p>;
  return (
    <FormItem>
      <FormLabel>Department</FormLabel>
      <FormControl>
        <Select
          onValueChange={(value) => field.onChange(value)}
          value={field.value}
        >
          <SelectTrigger className="mt-1 w-full">
            <SelectValue placeholder="Select Department" />
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
                departments.map((department) => (
                  <SelectItem key={department.id} value={department.id}>
                    {department.departmentName}
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
