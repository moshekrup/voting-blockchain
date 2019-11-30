export function joinClasses(...classes: (string | undefined)[]): string {
  return classes.filter(class_ => class_ != null).join(' ');
}