import { capitalizeWord } from "./formatter";

const months = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

const days = [
  "domingo",
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
];

function formatDate(timestamp: number) {
  const date = new Date(timestamp);

  return {
    day: String(date.getUTCDate()).padStart(2, "0"),
    month: String(date.getUTCMonth() + 1).padStart(2, "0"),
    monthNameFull: months[date.getUTCMonth()],
    monthNameShort: months[date.getUTCMonth()].slice(0, 3),
    year: String(date.getUTCFullYear()),
    weekday: String(days[date.getUTCDay()]),
    hour: String(date.getUTCHours()).padStart(2, "0"),
    minute: String(date.getUTCMinutes()).padStart(2, "0"),
  };
}

export function getLongDate(timestamp: number): string {
  const { weekday, monthNameShort, day, year } = formatDate(timestamp);

  return `${capitalizeWord(weekday)}, ${capitalizeWord(monthNameShort)} ${day}, ${year}`;
}

export function getShortDate(timestamp: number): string {
  const { monthNameShort, day } = formatDate(timestamp);

  return `${capitalizeWord(monthNameShort)} ${day}`;
}

export function getDateNTime(timestamp: number, monthLength?: "short"): string {
  const { monthNameFull, monthNameShort, day, hour, minute } =
    formatDate(timestamp);

  return `${capitalizeWord(monthLength === "short" ? monthNameShort : monthNameFull)} ${day}, ${hour}:${minute}`;
}

export function formatDatetimeInput(timestamp: number): string {
  const { year, month, day, hour, minute } = formatDate(timestamp);

  return `${year}-${month}-${day}T${hour}:${minute}`;
}

export function cleanDatetimeInput(datetime: string): number {
  return new Date(datetime).getTime();
}
