import { Text, ScrollView, View, Image } from 'react-native';
import styles from './styles';

const RulesScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1, width: '90%' }}>
        <Image
          style={styles.logo}
          source={require('../../../assets/murdle-logo.png')}
        />
        <Text>
          <Text style={styles.headerText}>
            <Text style={styles.murderText}>Rules</Text>
          </Text>
          {'\n\n'}
          <Text style={styles.paragraphText}>
            Welcome to Maximal(Murdle), the Wordle Clone that everyone's just{' '}
            <Text style={styles.murderText}>dying</Text> to play!
            {'\n\n'}If you're not familiar with Wordle's rules, they're fairly
            easy to get to grips with. You have 6 chances to guess a 5-letter
            word. Type in and enter a guess, and you'll be shown which (if any)
            letters are in the right place when they turn{' '}
            <Text style={styles.primaryText}>green</Text>. Letters that turn{' '}
            <Text style={styles.secondaryText}>yellow</Text> are in the word,
            but in the wrong place. After your 6th guess, if you still haven't
            guessed the right word, you lose the game.
            {'\n\n'}But wait! This isn't{' '}
            <Text style={styles.murderText}>only</Text> Wordle, here!
            {'\n\n'}Maximal(Murdle) offers 2 other ways in which you can meet
            your doom! If the clock runs out, I'm afraid it's curtains. Equally,
            just as in hangman, guess too many wrong letters and you'll lose all
            your lives.
            {'\n\n'}Too difficult? There's only one way to find out! Challenge
            your friends, rise up the leaderboard, and show the world you're
            afraid of nothing! Nothing a little{' '}
            <Text style={styles.murderText}>Murdle</Text> can't cure...
          </Text>
          {'\n\n'}
          {'\n\n'}
          <Text style={styles.headerText}>
            <Text style={styles.murderText}>Scoring Points</Text>
          </Text>
          <Text style={styles.paragraphText}>
            {'\n\n'}At the end of the game, your results are converted into
            points and totalled. Points are only awarded if you win the game.
            {'\n\n'}Each guess left at the end of the game grants 2 points. Each
            life left grants 1 point.
            {'\n\n'}As the length of the game can be adjusted, the number of
            points awarded for remaining time varies.
            {'\n\n'}
          </Text>

          <Text style={styles.header2Text}>Standard Game (2 mins)</Text>
          {'\n'}
          {/* <Text style={styles.header3Text}>
            <Text style={styles.murderText}>Seconds Remaining</Text>
          </Text> */}
          <Text style={styles.paragraphText}>
            {/* {'\n'} */}
            <Text style={{ color: '#0075c4' }}>96 - 120 secs left:</Text> 10
            points
            {'\n'}
            <Text style={styles.primaryText}>60 - 95 secs left:</Text> 6 points
            {'\n'}
            <Text style={styles.secondaryText}>12 - 59 secs left:</Text> 3
            points
            {'\n'}
            <Text style={styles.murderText}>11 or fewer secs left:</Text> 1
            point
            {'\n\n'}
          </Text>
          <Text style={styles.header2Text}>Fast Game (1 min)</Text>
          {'\n'}
          {/* <Text style={styles.header3Text}>
            <Text style={styles.murderText}>Seconds Remaining</Text>
          </Text> */}
          <Text style={styles.paragraphText}>
            {/* {'\n'} */}
            <Text style={{ color: '#0075c4' }}>48 - 60 secs left:</Text> 20
            points
            {'\n'}
            <Text style={styles.primaryText}>30 - 47 secs left:</Text> 12 points
            {'\n'}
            <Text style={styles.secondaryText}>6 - 29 secs left:</Text> 6 points
            {'\n'}
            <Text style={styles.murderText}>5 or fewer secs left:</Text> 2
            points
            {'\n\n'}
          </Text>
          <Text style={styles.header2Text}>Long Game (5 mins)</Text>
          {'\n'}
          {/* <Text style={styles.header3Text}>
            <Text style={styles.murderText}>Seconds Remaining</Text>
          </Text> */}
          <Text style={styles.paragraphText}>
            {/* {'\n'} */}
            <Text style={{ color: '#0075c4' }}>240 - 300 secs left:</Text> 5
            points
            {'\n'}
            <Text style={styles.primaryText}>150 - 239 secs left:</Text> 3
            points
            {'\n'}
            <Text style={styles.secondaryText}>30 - 149 secs left:</Text> 1
            points
            {'\n'}
            <Text style={styles.murderText}>29 or fewer secs left:</Text> 0
            points
          </Text>
        </Text>
      </ScrollView>
    </View>
  );
};

export default RulesScreen;
