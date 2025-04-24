import { H2 } from "@/components/typography";
import { EditProfileFrom } from "../_components/edit-profile-form";

export default function ProfileEditPage() {
  return (
    <div>
      <H2 className="text-muted-foreground my-4 !text-start text-lg md:!text-xl">
        Edytuj swoje dane
      </H2>

      <EditProfileFrom />
    </div>
  );
}
