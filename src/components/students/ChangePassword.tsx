"use client";

import React, { useTransition } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangePasswordSchema, ChangePasswordValues } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { PasswordInput } from "../PasswordInput";
import { Button } from "../ui/button";
import { changePassword } from "./action";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useSession } from "@/app/students/(main)/SessionProvider";

interface ChangePasswordProps {
  onOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function ChangePassword({
  onOpen,
  onOpenChange,
}: ChangePasswordProps) {
  const { user } = useSession();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  /*   const [error, setError] = useState<string>();
   */ const form = useForm({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const handleChangePassword = (payload: ChangePasswordValues) => {
    /*     setError(undefined);
     */ startTransition(async () => {
    const { success, error } = await changePassword(
      String(user.id),
      payload
    );
    if (success) {
      toast({
        description: "Password Changed!",
      });
      form.reset();
      onOpenChange(false);
    } else {
      toast({
        title: "Try Again",
        description: error,
        variant: "destructive",
      });
    }
  });
  };

  return (
    <AlertDialog open={onOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Change Password</AlertDialogTitle>
          <AlertDialogDescription>
            Please enter your current password and a new password.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleChangePassword)}
            className="space-y-4 p-4"
          >
            <div className="">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => onOpenChange(false)}>
                Cancel
              </AlertDialogCancel>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
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
