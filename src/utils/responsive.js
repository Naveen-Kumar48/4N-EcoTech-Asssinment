import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Standard mobile baseline width (similar to iPhone 12/13/14)
const guidelineBaseWidth = 390;

/**
 * Dynamically scales pixels down if the mobile screen is small (like iPhone SE)
 */
export const scale = (size) => Math.round((width / guidelineBaseWidth) * size);
