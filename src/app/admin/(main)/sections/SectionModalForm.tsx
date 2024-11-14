import InputFields from "@/components/InputFields";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { sectionSchema, SectionValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCreateSection, useUpdateSection } from "./mutation";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import SelectYearLevel from "@/components/sections/SelectYearLevel";
import SelectDepartment from "@/components/course/SelectDepartment";
import { Sections } from "@/lib/types";

interface SectionModalFormProps {
  onOpen: boolean;
  onClose: () => void;
  section?: Sections | null;
}

export default function SectionModalForm({
  section,
  onOpen,
  onClose,
}: SectionModalFormProps) {
  const { toast } = useToast();
  const form = useForm<SectionValues>({
    resolver: zodResolver(sectionSchema),
    defaultValues: {
      sectionName: "",
      yearLevelId: "",
      departmentId: "",
    },
  });

  const departmentId = form.watch("departmentId");
  const yearLevelId = form.watch("yearLevelId");

  const { mutate: createSection, status: statusCreateSection } =
    useCreateSection();
  const { mutate: updateSection, status: statusUpdateSection } =
    useUpdateSection();
  const isUpdating = !!section;
  const sectionId = section?.id;
  function handleSubmit(payload: SectionValues) {
    if (isUpdating) {
      updateSection(
        { values: payload, sectionId: sectionId as string },
        {
          onSuccess: (updatedSectionData) => {
            toast({
              description: "Section updated.",
            });

            form.reset({
              sectionName: updatedSectionData.sectionName,
              yearLevelId: updatedSectionData.yearLevelId,
              departmentId: updatedSectionData.departmentId,
            });

            onClose();
          },
        }
      );
    } else {
      createSection(payload, {
        onSuccess: () => {
          toast({
            description: "Section created.",
          });
          form.reset();
        },
      });
    }
  }

  useEffect(() => {
    if (section) {
      form.reset({
        sectionName: section?.sectionName,
        yearLevelId: section?.yearLevel.id,
        departmentId: section?.departmentId,
      });
    }
  }, [form, section]);

  const handleClose = () => {
    onClose();
    form.reset();
  };

  return (
    <AlertDialog open={onOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isUpdating ? "Update Section" : "Create a New Section"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Please enter the sections details below.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="departmentId"
              render={({ field }) => <SelectDepartment field={field} />}
            />

            <FormField
              control={form.control}
              name="yearLevelId"
              render={({ field }) => (
                <SelectYearLevel
                  field={field}
                  onYearLevelChange={(sectionId) => sectionId}
                />
              )}
            />

            <InputFields
              className="text-base"
              types="text"
              label="Section Name"
              control={form.control}
              name="sectionName"
            />

            <AlertDialogFooter className="mt-3">
              <AlertDialogCancel onClick={handleClose}>
                Cancel
              </AlertDialogCancel>

              <Button
                type="submit"
                disabled={
                  statusUpdateSection === "pending" ||
                  statusCreateSection === "pending" ||
                  !departmentId ||
                  !yearLevelId
                }
              >
                {statusUpdateSection === "pending" ||
                  statusCreateSection === "pending" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : isUpdating ? (
                  "Update"
                ) : (
                  "Submit"
                )}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
