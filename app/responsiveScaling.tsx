import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Use the width of your design prototype (390 for iPhone 13)
const BASE_WIDTH = 390;
// Use the height of your design prototype (844 for iPhone 13)
const BASE_HEIGHT = 844;

export const scaleWidth = (size: number): number => (SCREEN_WIDTH / BASE_WIDTH) * size;
export const scaleHeight = (size: number): number => (SCREEN_HEIGHT / BASE_HEIGHT) * size;
export const scaleBoth = (size: number, factor = 0.5) => size + (scaleWidth(size) - size) * factor;

// Example usage for font scaling
export const scaleFont = (size: number): number => size * PixelRatio.getFontScale();

// Export default object if needed
export default {
  scaleWidth,
  scaleHeight,
  scaleFont,
};
