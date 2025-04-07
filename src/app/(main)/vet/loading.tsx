import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="bg-background absolute inset-0 flex items-center justify-center">
      <Loader className="size-10 animate-spin" />
    </div>
  );
}
