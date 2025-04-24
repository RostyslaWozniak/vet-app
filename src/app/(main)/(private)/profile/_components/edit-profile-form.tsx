import { useSession } from "@/app/session-provider";
import { z } from "zod";

const updateUserProfile = z.object({
  name: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  photo: z.string().optional(),
});
type UpdateUserProfile = z.infer<typeof updateUserProfile>;

export function EditProfileFrom() {
  const { user } = useSession();
  return <form></form>;
}
