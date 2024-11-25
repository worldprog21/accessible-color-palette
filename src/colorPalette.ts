import { ColorConfig, ColorPalette } from './types';
import { hexToRgb, rgbToHex, getLuminance, getContrastRatio } from './utils';

export class AccessibleColorPalette {
  private static readonly DEFAULT_VARIATIONS = 5;
  private static readonly MIN_CONTRAST_RATIO = 4.5;
  private static readonly MAX_ITERATIONS = 100;

  static generate(config: ColorConfig): ColorPalette {
    try {
      const {
        baseColor,
        contrastRatio = this.MIN_CONTRAST_RATIO,
        variations = this.DEFAULT_VARIATIONS
      } = config;

      // Validate inputs
      if (!baseColor) {
        throw new Error('Base color is required');
      }
      if (contrastRatio < 1) {
        throw new Error('Contrast ratio must be greater than 1');
      }
      if (variations < 1) {
        throw new Error('Number of variations must be at least 1');
      }

      const baseRgb = hexToRgb(baseColor);
      const baseLuminance = getLuminance(baseRgb.r, baseRgb.g, baseRgb.b);

      const light: string[] = [];
      const dark: string[] = [];
      const onLight: string[] = [];
      const onDark: string[] = [];

      // Generate lighter variations
      for (let i = 1; i <= variations; i++) {
        const factor = i / variations;
        
        // Calculate lighter shade with protection against infinite loops
        let lightRgb = {
          r: Math.min(255, baseRgb.r + (255 - baseRgb.r) * factor),
          g: Math.min(255, baseRgb.g + (255 - baseRgb.g) * factor),
          b: Math.min(255, baseRgb.b + (255 - baseRgb.b) * factor),
        };
        
        light.push(rgbToHex(lightRgb.r, lightRgb.g, lightRgb.b));

        // Find accessible text color for light background
        let textColor = { r: 0, g: 0, b: 0 };
        let iterations = 0;
        const lightLuminance = getLuminance(lightRgb.r, lightRgb.g, lightRgb.b);
        
        while (
          getContrastRatio(lightLuminance, getLuminance(textColor.r, textColor.g, textColor.b)) < contrastRatio &&
          iterations < this.MAX_ITERATIONS
        ) {
          textColor = {
            r: Math.max(0, textColor.r - 5),
            g: Math.max(0, textColor.g - 5),
            b: Math.max(0, textColor.b - 5),
          };
          iterations++;
        }
        
        onLight.push(rgbToHex(textColor.r, textColor.g, textColor.b));
      }

      // Generate darker variations
      for (let i = 1; i <= variations; i++) {
        const factor = i / variations;
        
        // Calculate darker shade
        let darkRgb = {
          r: Math.max(0, baseRgb.r * (1 - factor)),
          g: Math.max(0, baseRgb.g * (1 - factor)),
          b: Math.max(0, baseRgb.b * (1 - factor)),
        };
        
        dark.push(rgbToHex(darkRgb.r, darkRgb.g, darkRgb.b));

        // Find accessible text color for dark background
        let textColor = { r: 255, g: 255, b: 255 };
        let iterations = 0;
        const darkLuminance = getLuminance(darkRgb.r, darkRgb.g, darkRgb.b);
        
        while (
          getContrastRatio(darkLuminance, getLuminance(textColor.r, textColor.g, textColor.b)) < contrastRatio &&
          iterations < this.MAX_ITERATIONS
        ) {
          textColor = {
            r: Math.min(255, textColor.r + 5),
            g: Math.min(255, textColor.g + 5),
            b: Math.min(255, textColor.b + 5),
          };
          iterations++;
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
    } catch (error: any) {
      throw new Error(`Failed to generate color palette: ${error.message}`);
    }
  }
}