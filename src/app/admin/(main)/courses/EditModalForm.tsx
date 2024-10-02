import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { courseSchema, CourseValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateCourse } from "./mutation";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EditModalFormProps {
  course: {
    course_id: string;
    courseName: string;
  };
  onOpen: boolean;
  onClose: () => void;
}

export function EditModalForm({ course, onOpen, onClose }: EditModalFormProps) {
  const { toast } = useToast();
  const [error, setError] = useState();
  const form = useForm<CourseValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      courseName: "",
    },
  });

  useEffect(() => {
    form.reset({
      courseName: course.courseName,
    });
  }, [form, course]);

  const { mutate, status } = useUpdateCourse();

  const HandleUpdateCourse = (values: CourseValues) => {
    setError(undefined);
    mutate(
      { id: course.course_id, values },
      {
        onSuccess: () => {
          toast({
            description: "Course Updated.",
          });
          onClose();
        },
      }
    );
  };
  return (
    <AlertDialog open={onOpen}>
      <AlertDialogTrigger asChild>Edit</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Course </AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(HandleUpdateCourse)}>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <FormField
              control={form.control}
              name="courseName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AlertDialogFooter className="mt-3">
              <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
              <Button type="submit" disabled={status === "pending"}>
                {status === "pending" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Save"
                )}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
