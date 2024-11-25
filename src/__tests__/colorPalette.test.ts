import { AccessibleColorPalette } from '../colorPalette';
import { hexToRgb, getLuminance, getContrastRatio } from '../utils';

describe('AccessibleColorPalette', () => {
  test('generates a valid color palette', () => {
    const palette = AccessibleColorPalette.generate({
      baseColor: '#007ACC',
      contrastRatio: 4.5,
      variations: 5,
    });

    expect(palette.base).toBe('#007ACC');
    expect(palette.light).toHaveLength(5);
    expect(palette.dark).toHaveLength(5);
    expect(palette.accessible.onLight).toHaveLength(5);
    expect(palette.accessible.onDark).toHaveLength(5);
  });

  test('ensures contrast ratios meet WCAG requirements', () => {
    const palette = AccessibleColorPalette.generate({
      baseColor: '#007ACC',
      contrastRatio: 4.5,
    });

    palette.light.forEach((color, index) => {
      const bgColor = hexToRgb(color);
      const bgLuminance = getLuminance(bgColor.r, bgColor.g, bgColor.b);
      
      const textColor = hexToRgb(palette.accessible.onLight[index]);
      const textLuminance = getLuminance(textColor.r, textColor.g, textColor.b);
      
      const ratio = getContrastRatio(bgLuminance, textLuminance);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    palette.dark.forEach((color, index) => {
      const bgColor = hexToRgb(color);
      const bgLuminance = getLuminance(bgColor.r, bgColor.g, bgColor.b);
      
      const textColor = hexToRgb(palette.accessible.onDark[index]);
      const textLuminance = getLuminance(textColor.r, textColor.g, textColor.b);
      
      const ratio = getContrastRatio(bgLuminance, textLuminance);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });
  });
});

