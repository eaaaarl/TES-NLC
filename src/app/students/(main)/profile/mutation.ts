import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUploadThing } from "@/lib/uploadthing";

export function useSubmitAvatar() {
  const queryClient = useQueryClient();
  const { startUpload: startAvatarUpload } = useUploadThing("avatar");
  return useMutation({
    mutationFn: async ({ avatar }: { avatar: File }) => {
      await startAvatarUpload([avatar]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students", "profile"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
