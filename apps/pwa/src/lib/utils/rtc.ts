export function roomIdConstructor({
  friendId,
  userId,
}: {
  friendId: string;
  userId: string;
}) {
  const sortedIds = [friendId, userId].sort();
  return `${sortedIds[0]}--${sortedIds[1]}`;
}
