import React from "react";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  ScrollView,
} from "react-native";
import styles from "./styles";

const LeaderboardScreen = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    getLeaderboard();
  }, []);

  const getLeaderboard = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/leaderboard/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //  Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();

    if (response.status === 200) {
      console.log(data, "<<<data");
      setLeaderboard(data);
    } else if (response.statusText === "Unauthorized") {
      //  logoutUser();
    }
  };
  console.log(leaderboard, "leaderboard");
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1, width: "100%" }}>
        <Image
          style={styles.logo}
          source={require("../../../assets/murdle-logo.png")}
        />
        <Text style={styles.headerText}>Leaderboard</Text>
      </KeyboardAvoidingView>
      <ScrollView>
        <View>
          {leaderboard.map((score, index) => {
            return (
              <View>
                <Text style={styles.paragraphText} key={index}>
                  {index}==={score.user}==={score.score}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default LeaderboardScreen;
