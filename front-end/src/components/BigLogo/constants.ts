// constants.ts
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const paddingMobile = width * 0.2;
const paddingLaptop = width * 0.3; 
const fontSizeMobile = width * 0.05;
const fontSizeLaptop = width * 0.025; 
const isLargeScreen = width > 768;
export {paddingMobile, paddingLaptop, fontSizeLaptop, fontSizeMobile, isLargeScreen, width }; // This is an example breakpoint for large screens
