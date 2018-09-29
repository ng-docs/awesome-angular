export function lastOf<T>(items: T[]): T {
  if (items && items.length) {
    return items[items.length - 1];
  }
}

export function firstOf<T>(items: T[]): T {
  if (items && items.length) {
    return items[0];
  }
}

export function emailOf(titleAndMail: string): string {
  return titleAndMail.replace(/^.*?<(.*?)>/, '$1');
}
