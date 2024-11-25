import { ColorConfig, ColorPalette } from './types';
import { hexToRgb, rgbToHex, getLuminance, getContrastRatio } from './utils';

export class AccessibleColorPalette {
  private static readonly DEFAULT_VARIATIONS = 5;
  private static readonly MIN_CONTRAST_RATIO = 4.5;

  static generate(config: ColorConfig): ColorPalette {
    const { baseColor, contrastRatio = this.MIN_CONTRAST_RATIO, variations = this.DEFAULT_VARIATIONS } = config;
    const baseRgb = hexToRgb(baseColor);
    const baseLuminance = getLuminance(baseRgb.r, baseRgb.g, baseRgb.b);

    const light: string[] = [];
    const dark: string[] = [];
    const onLight: string[] = [];
    const onDark: string[] = [];

    // Generate lighter variations
    for (let i = 1; i <= variations; i++) {
      const factor = i / variations;
      const lightRgb = {
        r: Math.min(255, baseRgb.r + (255 - baseRgb.r) * factor),
        g: Math.min(255, baseRgb.g + (255 - baseRgb.g) * factor),
        b: Math.min(255, baseRgb.b + (255 - baseRgb.b) * factor),
      };
      light.push(rgbToHex(lightRgb.r, lightRgb.g, lightRgb.b));

      // Find accessible color for light background
      let textColor = { r: 0, g: 0, b: 0 };
      const lightLuminance = getLuminance(lightRgb.r, lightRgb.g, lightRgb.b);
      while (
        getContrastRatio(lightLuminance, getLuminance(textColor.r, textColor.g, textColor.b)) <
        contrastRatio
      ) {
        textColor = {
          r: Math.max(0, textColor.r - 5),
          g: Math.max(0, textColor.g - 5),
          b: Math.max(0, textColor.b - 5),
        };
      }
      onLight.push(rgbToHex(textColor.r, textColor.g, textColor.b));
    }

    // Generate darker variations
    for (let i = 1; i <= variations; i++) {
      const factor = i / variations;
      const darkRgb = {
        r: baseRgb.r * (1 - factor),
        g: baseRgb.g * (1 - factor),
        b: baseRgb.b * (1 - factor),
      };
      dark.push(rgbToHex(darkRgb.r, darkRgb.g, darkRgb.b));

      // Find accessible color for dark background
      let textColor = { r: 255, g: 255, b: 255 };
      const darkLuminance = getLuminance(darkRgb.r, darkRgb.g, darkRgb.b);
      while (
        getContrastRatio(darkLuminance, getLuminance(textColor.r, textColor.g, textColor.b)) <
        contrastRatio
      ) {
        textColor = {
          r: Math.min(255, textColor.r + 5),
          g: Math.min(255, textColor.g + 5),
          b: Math.min(255, textColor.b + 5),
        };
      }
      onDark.push(rgbToHex(textColor.r, textColor.g, textColor.b));
    }

    return {
      base: baseColor,
      light,
      dark,
      accessible: {
        onLight,
        onDark,
      },
    };
  }
}
