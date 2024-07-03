import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated from "react-native-reanimated";

import { styles } from "./styles";
import { ITEM_HEIGHT, ITEM_WIDTH } from "../presets";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type ItemProps = {
  index: number;
  numOfColumns: number;
  numOfRows: number;
  onPress: () => void;
};

export const GridItem = ({
  index,
  numOfColumns,
  onPress,
}: React.ReactFC<ItemProps>) => {
  const x = index % numOfColumns;
  const y = Math.floor(index / numOfColumns);
  const isEven = (x + y) % 2 === 0;

  return (
    <AnimatedPressable
      onPress={onPress}
      style={[
        styles.gridItem,
        {
          width: ITEM_WIDTH,
          height: ITEM_HEIGHT,
          padding: 5,
        },
      ]}
    >
      <View
        style={[
          styles.gridItemInner,
          {
            backgroundColor: isEven ? "#ed0c32" : "white",
          },
        ]}
      >
        <Text
          style={[styles.gridItemText, { color: isEven ? "white" : "black" }]}
        >
          {index}
        </Text>
      </View>
    </AnimatedPressable>
  );
};
