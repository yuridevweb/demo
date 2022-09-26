import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { colors } from './../../constants';

export default function Leaderboard({ leaderboardArr }) {
  const [selectedId, setSelectedId] = React.useState(null);

  function handleNamePress(item) {
    setSelectedId(item.id);
    Alert.alert(
      `${item.fullName}'s Murdle`,
      `Games played: ${
        Object.keys(item.scores.games).length
      } \nAvg Points/Game: ${
        item.scores.total
          ? Math.round(
              item.scores.total / Object.keys(item.scores.games).length
            )
          : 0
      } \nFavourite Word: ${
        Object.keys(item.scores.games).length
          ? item.scores.games[
              Math.floor(
                Math.random() * Object.keys(item.scores.games).length + 1
              )
            ].word
          : "Didn't they teach you no brains at school!"
      }`,
      [],
      {
        cancelable: true,
        onDismiss: () => setSelectedId(null),
      }
    );
  }

  const Item = ({ item, onPress, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item]}>
      <View
        style={[
          styles.nameContainer,
          {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          },
        ]}
      >
        <Image source={{ uri: item.icon }} style={[styles.tinyIcon]}></Image>
        <Text style={[styles.name, textColor, { marginLeft: 15 }]}>
          {item.fullName}
        </Text>
      </View>
      <View
        style={[
          styles.scoreContainer,
          {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          },
        ]}
      >
        <Text style={[styles.total, textColor]}>{item.scores.total}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const color = item.id === selectedId ? '#bb0a1e' : '#D7DADC';

    return (
      <Item
        item={item}
        onPress={() => handleNamePress(item)}
        textColor={{ color }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={leaderboardArr}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    textAlign: 'centre',
    flexDirection: 'row',
    flex: 1,
    padding: 20,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 2,
    backgroundColor: colors.darkgrey,
  },
  name: {
    fontSize: 16,
    marginLeft: 10,
  },
  total: {
    fontSize: 16,
    marginRight: 10,
  },
  nameContainer: {
    flex: 1,
  },
  scoreContainer: {
    flex: 1,
  },
  tinyIcon: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});
