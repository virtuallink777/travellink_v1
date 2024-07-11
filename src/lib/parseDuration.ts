// función utilitaria para parsear la duración ISO 8601:
function parseDuration(isoDuration: string): {
  hours: number;
  minutes: number;
} {
  {
    const hourMatch = isoDuration.match(/(\d+)H/);
    const minuteMatch = isoDuration.match(/(\d+)M/);
    return {
      hours: hourMatch ? parseInt(hourMatch[1]) : 0,
      minutes: minuteMatch ? parseInt(minuteMatch[1]) : 0,
    };
  }
}

// función para formatear la duración de manera legible:

export default function formatDuration(isoDuration: string): string {
  const { hours, minutes } = parseDuration(isoDuration);

  if (hours === 0) {
    return `${minutes} minutos`;
  } else if (minutes === 0) {
    return `${hours} hora${hours > 1 ? "s" : ""}`;
  } else {
    return `${hours} hora${hours > 1 ? "s" : ""} y ${minutes} minutos`;
  }
}
