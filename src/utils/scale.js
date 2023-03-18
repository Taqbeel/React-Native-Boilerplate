import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 414;
const scale = size => width > 600 ? (width / guidelineBaseWidth) * size * 0.61 : (width / guidelineBaseWidth) * size;

export { scale, };