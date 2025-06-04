export function getNameInitials(value: string) {
  return value
    .split(" ")
    .map((name) => name[0])
    .join("");
}
