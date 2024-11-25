export interface ColorConfig {
    baseColor: string;
    contrastRatio: number;
    variations?: number;
  }
  
  export interface ColorPalette {
    base: string;
    light: string[];
    dark: string[];
    accessible: {
      onLight: string[];
      onDark: string[];
    };
  }
  