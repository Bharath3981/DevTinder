export function assertEqualWithLabel(label: string, received: any, expected: any) {
  expect(received).toBe(expected); // still lets Jest show standard diff
}
