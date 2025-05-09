export function formatDate(dateString: string): string {
  if (!dateString) return "";

  const date = new Date(dateString);

  return date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}