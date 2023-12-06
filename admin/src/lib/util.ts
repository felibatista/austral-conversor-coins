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

export function fromPlanNameToNumber(name: string): number {
  switch (name) {
    case 'Free':
      return 1;
    case 'Trial':
      return 2;
    case 'Pro':
      return 3;
    default:
      return 1;
  }
}