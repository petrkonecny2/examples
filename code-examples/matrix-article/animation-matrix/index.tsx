import {
  MathCollection,
  Matrix,
  identity,
  index,
  matrix,
  multiply,
  reshape,
  subset,
  transpose,
} from "mathjs";
import React from "react";
import { FlatList } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { GridItem } from "../grid-item";
import {
  NUM_OF_COLUMNS,
  ITEM_WIDTH,
  ITEM_HEIGHT,
  SCALE,
  DURATION,
  NUM_OF_ROWS,
} from "../presets";

const identityMatrix = () => {
  return identity(4) as Matrix;
};

const getTransformTranslateMatrix = (x: number, y: number) => {
  let matrix: MathCollection = identityMatrix();
  matrix = subset(matrix, index(0, 3), x);
  matrix = subset(matrix, index(1, 3), y);
  return matrix;
};

const getTransformScaleMatrix = (scale: number) => {
  let matrix = identityMatrix();
  matrix = subset(matrix, index(0, 0), scale);
  matrix = subset(matrix, index(1, 1), scale);
  return matrix;
};

const toTransformArray = (matrix: Matrix) => {
  return transpose(matrix).toArray().flat() as number[];
};

const fromTransformArray = (transformArray: number[]) => {
  return transpose(matrix(reshape(transformArray, [4, 4])));
};

export const MatrixExample = () => {
  const matrix = useSharedValue(toTransformArray(identityMatrix()));

  const onPress = (index: number) => {
    const itemRow = Math.floor(index / NUM_OF_COLUMNS);
    const itemColumn = index % NUM_OF_COLUMNS;
    const x = itemColumn * ITEM_WIDTH;
    const y = itemRow * ITEM_HEIGHT;
    const result = multiply<Matrix>(
      getTransformScaleMatrix(SCALE),
      getTransformTranslateMatrix(-x, -y)
    );
    matrix.value = withTiming(toTransformArray(result), {
      duration: DURATION,
      easing: Easing.linear,
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
        transform: [{ matrix }],
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
