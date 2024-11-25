export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  // Remove # if present
  hex = hex.replace(/^#/, '');
  
  // Validate hex format
  if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
    throw new Error('Invalid hex color format. Use format: #RRGGBB');
  }

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    throw new Error('Invalid hex color values');
  }

  return { r, g, b };
}

export function rgbToHex(r: number, g: number, b: number): string {
  // Clamp values between 0 and 255
  r = Math.min(255, Math.max(0, Math.round(r)));
  g = Math.min(255, Math.max(0, Math.round(g)));
  b = Math.min(255, Math.max(0, Math.round(b)));

  return '#' + [r, g, b]
    .map(x => x.toString(16).padStart(2, '0'))
    .join('');
}

export function getLuminance(r: number, g: number, b: number): number {
  // Ensure values are in valid range
  r = Math.min(255, Math.max(0, r)) / 255;
  g = Math.min(255, Math.max(0, g)) / 255;
  b = Math.min(255, Math.max(0, b)) / 255;

  const [rs, gs, bs] = [r, g, b].map(component => {
    return component <= 0.03928
      ? component / 12.92
      : Math.pow((component + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function getContrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}