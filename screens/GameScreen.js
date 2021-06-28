import React, { useState, useRef, useEffect } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import Card from "../components/Card";
import NumberContainer from "../components/NumberContainer";

const generatorRendomNumber = (min, max, exc) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNum = Math.floor(Math.random() * (max - min)) + min;
  if (randomNum === exc) {
    return generatorRendomNumber(min, max, exc);
  }
  return randomNum;
};

const GameScreen = (props) => {
  const [currentGuess, setcurrentGuess] = useState(
    generatorRendomNumber(1, 100, props.userChoice)
  );
  const currentMin = useRef(1);
  const currentMax = useRef(100);
  const [round, setround] = useState(0);
  useEffect(() => {
    if (currentGuess === props.userChoice) {
      props.onGameover(round);
    }
  }, [currentGuess, props.userChoice, props.onGameover]);

  const nextGuessNumber = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "higher" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Stop cheating", "I know you are cheating ", [
        { text: "Ok", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      currentMax.current = currentGuess;
    }
    if (direction === "higher") {
      currentMin.current = currentGuess;
    }
    const nextNumber = generatorRendomNumber(
      currentMin.current,
      currentMax.current,
      currentGuess
    );
    setcurrentGuess(nextNumber);
    setround((currentRound) => currentRound + 1);
  };

  return (
    <View style={styles.screen}>
      <Text>Computer guess </Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="Lower" onPress={nextGuessNumber.bind(this, "lower")} />
        <Button title="Higher" onPress={nextGuessNumber.bind(this, "higher")} />
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80 %",
  },
});
export default GameScreen;
