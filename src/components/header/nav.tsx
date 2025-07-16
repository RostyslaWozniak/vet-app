import { NavItem } from "./nav-item";

const navigation = [
  { name: "Start", href: "/" },
  { name: "O nas", href: "/o-nas" },
  { name: "Usługi", href: "/uslugi" },
  { name: "Kontakt", href: "/kontakt" },
];

export function Nav() {
  return (
    <nav className="h-full">
      <ul className="flex h-full items-center gap-2">
        {navigation.map((item) => (
          <li key={item.name} className="h-full">
            <NavItem href={item.href}>{item.name}</NavItem>
          </li>
        ))}
      </ul>
    </nav>
  );
}
