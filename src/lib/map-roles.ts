export function mapRoles(roles: string[]) {
  return roles
    .map((role) => {
      switch (role) {
        case "ADMIN":
          return "Administrator";
        case "VET":
          return "Weterynarz";
        case "CLIENT":
          return "Klient";
        default:
          return role;
      }
    })
    .join(", ");
}
