import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import GameScreen from "./screens/GameScreen";
import StartGameScreen from "./screens/StartGameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [userNumber, setuserNumber] = useState("");
  const [guessRound, setguessRound] = useState(0);
  const startGameHandler = (slectedNumber) => {
    setuserNumber(slectedNumber);
  };

  const newGame = () => {
    setguessRound(0);
    setuserNumber(null);
  };
  const gameOver = (numberRouds) => {
    setguessRound(numberRouds);
  };
  let content = <StartGameScreen onStartGame={startGameHandler} />;
  if (userNumber && guessRound <= 0) {
    content = <GameScreen userChoice={userNumber} onGameover={gameOver} />;
  } else if (guessRound > 0) {
    content = (
      <GameOverScreen
        roundsNumber={guessRound}
        userNumber={userNumber}
        onRestart={newGame}
      />
    );
  }
  return (
    <View>
      <Header title="Guess a number" />
      {content}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({});
