import { Text, View, KeyboardAvoidingView, Image } from 'react-native';
import styles from './styles';
import {
  query,
  orderBy,
  limit,
  collection,
  queryEqual,
  where,
  getDocs,
} from 'firebase/firestore';
import { db } from '../../../firebase';
import React from 'react';
import Leaderboard from './Leaderboard';
import {
  pinkSkull,
  redSkull,
  greenSkull,
  yellowSkull,
  blueSkull,
} from '../../../assets/ImageData/skulls';

const LeaderboardScreen = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [leaderboardArr, setLeaderboardArr] = React.useState();

  React.useEffect(() => {
    const getLeaderboardArr = async () => {
      const leaderboardArr = [];

      const usersRef = collection(db, 'users');
      const q = query(usersRef, orderBy('scores.total', 'desc'), limit(20));

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        doc.data();
        leaderboardArr.push(doc.data());
      });

      setLeaderboardArr(leaderboardArr);
    };
    if (!leaderboardArr) getLeaderboardArr();

    if (leaderboardArr) {
      leaderboardArr.forEach((user) => {
        const options = [
          pinkSkull,
          redSkull,
          greenSkull,
          yellowSkull,
          blueSkull,
        ];
        const path = options[Math.floor(Math.random() * options.length)];

        user.icon = path;
      });
      setIsLoading(false);
    }
  }, [leaderboardArr]);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1, width: '100%' }}>

        <Image
          style={styles.logo}
          source={require('../../../assets/murdle-logo.png')}
        />

        {/* <Text style={styles.paragraphText}>Text</Text> */}
        <Leaderboard leaderboardArr={leaderboardArr} />
      </KeyboardAvoidingView>
    </View>
  );
};

export default LeaderboardScreen;
