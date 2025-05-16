import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export function Calculator() {
  const [display, setDisplay] = useState("0");
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [operatorDisplay, setOperatorDisplay] = useState("");
  const navigation = useNavigation();

  const colorScheme = useColorScheme();
  const buttonColor = Colors[colorScheme ?? "light"].tint;
  const textColor = colorScheme === "dark" ? "#fff" : "#000";

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay("0.");
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const clearDisplay = () => {
    setDisplay("0");
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
    setOperatorDisplay("");
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);

    // Update operator display
    const operatorSymbol =
      nextOperator === "+"
        ? "+"
        : nextOperator === "-"
        ? "-"
        : nextOperator === "*"
        ? "×"
        : nextOperator === "/"
        ? "÷"
        : "";
    setOperatorDisplay(operatorSymbol);
  };

  const calculate = (
    firstOperand: number,
    secondOperand: number,
    operator: string
  ) => {
    switch (operator) {
      case "+":
        return firstOperand + secondOperand;
      case "-":
        return firstOperand - secondOperand;
      case "*":
        return firstOperand * secondOperand;
      case "/":
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  const calculateResult = () => {
    if (firstOperand === null || operator === null) {
      return;
    }

    const inputValue = parseFloat(display);
    const result = calculate(firstOperand, inputValue, operator);

    setDisplay(String(result));
    setFirstOperand(result);
    setOperator(null);
    setWaitingForSecondOperand(false);
    setOperatorDisplay("");
  };

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color={textColor} />
      </TouchableOpacity>
      <View style={styles.displayContainer}>
        <ThemedText style={styles.operatorText}>{operatorDisplay}</ThemedText>
        <ThemedText
          style={styles.display}
          numberOfLines={1}
          adjustsFontSizeToFit={true}
          minimumFontScale={0.5}
        >
          {display}
        </ThemedText>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.functionButton]}
          onPress={clearDisplay}
        >
          <Text style={[styles.buttonText, { color: buttonColor }]}>AC</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.functionButton]}
          onPress={() => setDisplay(String(parseFloat(display) * -1))}
        >
          <Text style={[styles.buttonText, { color: buttonColor }]}>+/-</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.functionButton]}
          onPress={() => setDisplay(String(parseFloat(display) / 100))}
        >
          <Text style={[styles.buttonText, { color: buttonColor }]}>%</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.operatorButton]}
          onPress={() => performOperation("/")}
        >
          <Text style={[styles.buttonText, { color: buttonColor }]}>÷</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => inputDigit("7")}>
          <Text style={[styles.buttonText, { color: textColor }]}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => inputDigit("8")}>
          <Text style={[styles.buttonText, { color: textColor }]}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => inputDigit("9")}>
          <Text style={[styles.buttonText, { color: textColor }]}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.operatorButton]}
          onPress={() => performOperation("*")}
        >
          <Text style={[styles.buttonText, { color: buttonColor }]}>×</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => inputDigit("4")}>
          <Text style={[styles.buttonText, { color: textColor }]}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => inputDigit("5")}>
          <Text style={[styles.buttonText, { color: textColor }]}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => inputDigit("6")}>
          <Text style={[styles.buttonText, { color: textColor }]}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.operatorButton]}
          onPress={() => performOperation("-")}
        >
          <Text style={[styles.buttonText, { color: buttonColor }]}>-</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => inputDigit("1")}>
          <Text style={[styles.buttonText, { color: textColor }]}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => inputDigit("2")}>
          <Text style={[styles.buttonText, { color: textColor }]}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => inputDigit("3")}>
          <Text style={[styles.buttonText, { color: textColor }]}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.operatorButton]}
          onPress={() => performOperation("+")}
        >
          <Text style={[styles.buttonText, { color: buttonColor }]}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.zeroButton]}
          onPress={() => inputDigit("0")}
        >
          <Text style={[styles.buttonText, { color: textColor }]}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={inputDecimal}>
          <Text style={[styles.buttonText, { color: textColor }]}>.</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.operatorButton]}
          onPress={calculateResult}
        >
          <Text style={[styles.buttonText, { color: buttonColor }]}>=</Text>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-end",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  displayContainer: {
    marginBottom: 20,
    padding: 20,
    alignItems: "flex-end",
    minHeight: 120,
    width: "100%",
    justifyContent: "center",
  },
  display: {
    fontSize: 42,
    fontWeight: "300",
    maxWidth: "100%",
    textAlign: "right",
    lineHeight: 50,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  button: {
    width: 75,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(220, 220, 220, 0.2)",
  },
  zeroButton: {
    width: 130,
    alignItems: "flex-start",
    paddingLeft: 30,
  },
  functionButton: {
    backgroundColor: "rgba(220, 220, 220, 0.3)",
  },
  operatorButton: {
    backgroundColor: "rgba(220, 220, 220, 0.1)",
  },
  buttonText: {
    fontSize: 30,
    fontWeight: "400",
  },
  operatorText: {
    fontSize: 20,
    fontWeight: "300",
    marginBottom: 10,
    textAlign: "right",
    width: "100%",
  },
});
