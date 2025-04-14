export function getMonthDateRange(
  year: string = new Date().getFullYear().toString(),
  month: string = new Date().getMonth().toString(),
) {
  const yearNumber = parseInt(year);
  const monthNumber = parseInt(month);
  console.log({ yearNumber, monthNumber });

  const start = new Date(yearNumber, monthNumber, 1);
  const end = new Date(yearNumber, monthNumber + 1, 0, 23, 59, 59, 999); // last moment of the last day
  return { start, end };
}
