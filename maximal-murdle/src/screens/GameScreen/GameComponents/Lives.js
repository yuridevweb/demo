import { Text, StyleSheet, View } from 'react-native';
import { useEffect } from 'react';

const Lives = ({
  lives,
  letters,
  setLives,
  setCurrentRow,
  currentRow,
  setGameState,
  wrongLetters,
}) => {
  const heart = '❤️';
  const brokenHeart = '💔';
  const livesLost = letters.length * 2 - lives;
  const hearts = heart.repeat(lives);
  const brokenHearts = brokenHeart.repeat(livesLost);
  const lostLives = wrongLetters.length;

  useEffect(() => {
    if (letters.length * 2 - lostLives > 0) {
      setLives(letters.length * 2 - lostLives);
    } else {
      setLives(0);
      setGameState('allLivesLost');
      setCurrentRow(currentRow - 1);
    }
  }, [lostLives]);

  return (
    <View style={styles.lives}>
      <Text style={styles.icon}>
        {hearts}
        {brokenHearts}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    color: 'red',
    marginLeft: 10,
    fontSize: 20,
  },
  lives: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 0,
  },
});
export default Lives;
