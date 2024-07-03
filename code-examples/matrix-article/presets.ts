import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const NUM_OF_COLUMNS = 5;
export const NUM_OF_ROWS = 5;
  
export const SCALE = 5;
export const DURATION = 6000;

export const ITEM_WIDTH = width / NUM_OF_COLUMNS;
export const ITEM_HEIGHT = height / NUM_OF_ROWS;