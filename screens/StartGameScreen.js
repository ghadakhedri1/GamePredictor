import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Alert, Keyboard } from "react-native";
import Input from "../components/Input";
import Card from "../components/Card";
import Colors from "../constants/colors";
import NumberContainer from "../components/NumberContainer";

const StartGameScreen = (props) => {
  const [enteredValue, setenteredValue] = useState("");
  const [confirmed, setconfirmed] = useState(false);
  const [confirmedNumber, setconfirmedNumber] = useState("");
  const inputHandler = (inputText) => {
    setenteredValue(inputText.replace(/[^0-9]/g, ""));
  };
  const reset = () => {
    setenteredValue("");
  };
  const submit = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid number", "Number has to be between 1 and 99", [
        { text: "ok", style: "destructive", onPress: reset },
      ]);
    }
    setconfirmed(true);
    setconfirmedNumber(chosenNumber);
    setenteredValue("");
    Keyboard.dismiss();
  };
  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.chosenNumberContainer}>
        <Text>You selected:</Text>
        <NumberContainer>{confirmedNumber}</NumberContainer>
        <Button
          title="Start the game"
          color={Colors.secondary}
          onPress={() => {
            props.onStartGame(confirmedNumber);
          }}
        />
      </Card>
    );
  }
  return (
    <View>
      <Text>Start a new game</Text>
      <Card style={styles.inputContainer}>
        <Text>Select a number</Text>
        <Input
          style={styles.input}
          blurOnSubmit
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="number-pad"
          maxLength={2}
          value={enteredValue}
          onChangeText={inputHandler}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="submit" color={Colors.primary} onPress={submit} />
          </View>
          <View style={styles.button}>
            <Button title="reset" onPress={reset} />
          </View>
        </View>
      </Card>
      {confirmedOutput}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 80,
    textAlign: "center",
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
  button: {
    width: 95,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  chosenNumberContainer: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default StartGameScreen;
