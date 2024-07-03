import React from "react";
import { FlatList } from "react-native";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { GridItem } from "../grid-item";
import {
  NUM_OF_COLUMNS,
  ITEM_WIDTH,
  ITEM_HEIGHT,
  SCALE,
  DURATION,
  NUM_OF_ROWS,
} from "../presets";

export const SimpleExample = () => {
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const onPress = (index: number) => {
    const itemRow = Math.floor(index / NUM_OF_COLUMNS);
    const itemColumn = index % NUM_OF_COLUMNS;
    const x = itemColumn * ITEM_WIDTH;
    const y = itemRow * ITEM_HEIGHT;
    scale.value = withTiming(SCALE, {
      duration: DURATION,
    });
    translateX.value = withTiming(-x, {
      duration: DURATION,
    });
    translateY.value = withTiming(-y, {
      duration: DURATION,
    });
  };

  // make grid based on num of columns and rows
  const grid = Array.from({ length: NUM_OF_COLUMNS * NUM_OF_ROWS }).map(
    (_, index) => {
      return (
        <GridItem
          key={index}
          index={index}
          onPress={() => {
            onPress(index);
          }}
          numOfColumns={NUM_OF_COLUMNS}
          numOfRows={NUM_OF_ROWS}
        />
      );
    }
  );

  return (
    <Animated.View
      style={{
        transformOrigin: "top left",
        transform: [{ scale }, { translateX }, { translateY }],
      }}
    >
      <FlatList
        data={grid}
        numColumns={NUM_OF_COLUMNS}
        renderItem={({ item }) => item}
      />
    </Animated.View>
  );
};
