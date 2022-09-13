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
import { DataTable } from "react-native-paper";

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
      </KeyboardAvoidingView>
      <ScrollView>
        <View>
          <DataTable>
            <DataTable.Header style={styles.paragraphText}>
              <DataTable.Title>USERNAME</DataTable.Title>
              <DataTable.Title>TOTAL SCORE</DataTable.Title>
            </DataTable.Header>
            {leaderboard.map((score) => {
              return (
                <DataTable.Row style={styles.row} key={score.id}>
                  <DataTable.Cell>
                    <Text style={styles.usernameCell}> {score.user}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <Text style={styles.scoreCell}> {score.score}</Text>
                  </DataTable.Cell>
                </DataTable.Row>

                /*                 <Text style={styles.paragraphText} key={score.id}>
                  {score.id}==={score.user}==={score.score}
                </Text> */
              );
            })}
          </DataTable>
        </View>
      </ScrollView>
    </View>
  );
};

export default LeaderboardScreen;
