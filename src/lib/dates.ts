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
    day: String(date.getDate()).padStart(2, "0"),
    monthDay: String(date.getMonth() + 1).padStart(2, "0"),
    monthNameFull: months[date.getMonth()],
    monthNameShort: months[date.getMonth()].slice(0, 3),
    year: date.getFullYear(),
    weekday: days[date.getDay()],
    hour: String(date.getHours()).padStart(2, "0"),
    minute: String(date.getMinutes()).padStart(2, "0"),
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
