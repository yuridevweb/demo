import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "centre",
    padding: 20,
  },
  title: {},
  headerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
    height: 50,
  },
  logo: {
    resizeMode: "stretch",
    width: 224,
    height: 92,
    alignSelf: "center",
    margin: 30,
  },
  headerText: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 32,
    color: "white",
    alignSelf: "center",
  },
  row: {
    backgroundColor: "#3A3A3D",
    borderRadius: 2,
    marginBottom: 5,
  },
  usernameCell: {
    fontSize: 16,
    color: "white",
    marginLeft: 20,
  },
  scoreCell: {
    fontSize: 16,
    color: "white",
    marginLeft: 90,
  },
  paragraphText: {
  },
  murderText: {
    color: "#bb0a1e",
  },
  primaryText: { color: "#538D4E" },
  secondaryText: { color: "#B59F3B" },
});
