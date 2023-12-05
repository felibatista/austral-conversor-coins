export function fromNumberToPlanName(number: number): string {
  switch (number) {
    case 1:
      return 'Free';
    case 2:
      return 'Trial';
    case 3:
      return 'Pro';
    default:
      return 'Free';
  }
}
