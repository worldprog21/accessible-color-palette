# wcag-palette-generator

A TypeScript package that generates WCAG-compliant color schemes from a base color. This package helps developers create accessible color palettes that meet Web Content Accessibility Guidelines (WCAG) standards.

## Installation

```bash
npm install wcag-palette-generator
```

## Features

- Generate WCAG-compliant color palettes from any base color
- Ensure proper contrast ratios for accessibility compliance
- Generate light and dark variations automatically
- Get accessible text colors for each background color
- Full TypeScript support
- Zero dependencies
- Lightweight and efficient

## Usage

### Basic Example

```typescript
import { AccessibleColorPalette } from 'wcag-palette-generator';

const palette = AccessibleColorPalette.generate({
  baseColor: '#007ACC',    // Your base color in hex format
  contrastRatio: 4.5,      // WCAG AA standard (4.5:1)
  variations: 5            // Number of color variations
});
```

### Output Structure

The generated palette includes:
```typescript
{
  base: string;           // Your original base color
  light: string[];        // Array of lighter variations
  dark: string[];         // Array of darker variations
  accessible: {
    onLight: string[];    // Accessible text colors for light backgrounds
    onDark: string[];     // Accessible text colors for dark backgrounds
  }
}
```

### Example with React

```typescript
import { AccessibleColorPalette } from 'wcag-palette-generator';

function ColorDemo() {
  const palette = AccessibleColorPalette.generate({
    baseColor: '#007ACC',
    contrastRatio: 4.5
  });

  return (
    
      {palette.light.map((bgColor, index) => (
        
          This text is accessible on this background
        
      ))}
    
  );
}
```

### Configuration Options

|
 Option 
|
 Type 
|
 Default 
|
 Description 
|
|
--------
|
------
|
---------
|
-------------
|
|
 baseColor 
|
 string 
|
 Required 
|
 Hex color code (e.g., '#007ACC') 
|
|
 contrastRatio 
|
 number 
|
 4.5 
|
 Minimum contrast ratio (4.5 for WCAG AA, 7 for AAA) 
|
|
 variations 
|
 number 
|
 5 
|
 Number of color variations to generate 
|

### WCAG Compliance Levels

- WCAG AA (minimum): 
  - Normal text: 4.5:1
  - Large text: 3:1
- WCAG AAA (enhanced):
  - Normal text: 7:1
  - Large text: 4.5:1

## Development

```bash
# Clone the repository
git clone [your-repo-url]

# Install dependencies
npm install

# Run tests
npm test

# Build the package
npm run build
```

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## Author

Sayed Rahmani (https://github.com/worldprog21)

## License

MIT License - See LICENSE file for details

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.

## Changelog

### 1.0.0
- Initial release
- Basic color palette generation
- WCAG compliance checking
- Light and dark variations
- Accessible text colors