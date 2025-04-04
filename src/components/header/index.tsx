import { getCurrentUser } from "@/auth/current-user";
import { UserButton } from "../user-button";

export async function Header() {
  const fullUser = await getCurrentUser({ withFullUser: true });
  return (
    <header className="h-16 bg-gray-700">
      <div className="container mx-auto flex h-full items-center justify-between">
        <div>LOGO</div>
        <nav>
          <ul>
            <li></li>
          </ul>
        </nav>
        <UserButton user={fullUser} />
      </div>
    </header>
  );
}
