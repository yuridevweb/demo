import { useState, useEffect, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Keyboard from './Keyboard';
import { ENTER, DELETE, colors } from '../../../constants';
import { words } from './Words';
import gameStyles from '../styles/gameStyles';
import Lives from './Lives';
import Timer from './Timer';
import { UserContext } from '../../../context/User';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';
import { Stage } from './Stage';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';

const MAX_GUESSES = 6;
const copyArray = (arr) => {
  return [...arr.map((rows) => [...rows])];
};

const Game = () => {
  const route = useRoute();
  const { duration } = route.params;
  const [word, setWord] = useState('world');

  const letters = word.split('');
  const remainingLetters = {};
  const [rows, setRows] = useState(
    new Array(MAX_GUESSES).fill(new Array(letters.length).fill(''))
  );
  const [wrongLetters, setWrongLetters] = useState('');
  const [currentRow, setCurrentRow] = useState(0);
  const [currentColumn, setCurrentColumn] = useState(0);
  const [gameState, setGameState] = useState('playing');
  const [lives, setLives] = useState(letters.length * 2);
  const [totalTime, setTotalTime] = useState();
  const [startTime, setStartTime] = useState();
  const { user, setUser } = useContext(UserContext);

  console.log('word:', word);

  useEffect(() => {
    if (word === 'world') {
      setWord(words.words[Math.floor(Math.random() * 2314)]);
    }
    if (gameState === 'timeout') {
      checkGameState();
    }
    if (currentRow > 0) {
      checkGameState();
    }
    if (gameState === 'allLivesLost') {
      checkGameState();
    }

    const wrongLetters = rows.flat().filter((letter) => {
      return !letters.includes(letter);
    });

    const removeDuplicates = (arr) => {
      return [...new Set(arr)];
    };

    setWrongLetters(removeDuplicates(wrongLetters).join(''));
  }, [currentRow, gameState]);

  const checkGameState = () => {
    if (gameState === 'timeout') {
      setTotalTime(getGameTime());
      Alert.alert(
        'TIME OUT!!',
        `You died! Shoulda thunk faster! 
        
        The word was ${word.toUpperCase()}
        
        Guesses Left: ${MAX_GUESSES - currentRow}
        Lives Left: ${lives} 
        Time Left: ${duration - getGameTime()} 
        
        Thank you for playing! 💀
        
        (0 points)`,
        [
          ({
            text: 'Go Home',
            onPress: () => navigation.navigate('Home'),
          },
          {
            text: 'View Leaderboard',
            onPress: () => navigation.navigate('Leaderboard'),
          }),
        ]
      );
      setGameState('lost');
    } else if (gameState === 'allLivesLost') {
      setTotalTime(getGameTime());
      Alert.alert(
        'THE HANGMAN GOT YOU!!',
        `Your life force is all gone! Haha! 
        
        The word was ${word.toUpperCase()}
        
        Guesses Left: ${MAX_GUESSES - currentRow - 1}
        Lives Left: ${lives} 
        Time Left: ${duration - getGameTime()}
        
        Thank you for playing! 💀
        
        (0 points)`,
        [
          ({
            text: 'Go Home',
            onPress: () => navigation.navigate('Home'),
          },
          {
            text: 'View Leaderboard',
            onPress: () => navigation.navigate('Leaderboard'),
          }),
        ]
      );
    } else if (checkIfWon() && gameState !== 'won') {
      setTotalTime(getGameTime());
      getAndPostTotalScore();
      Alert.alert(
        'WINNAR!!',
        `You live!!! For now...
        
        The word was ${word.toUpperCase()}
        
        Guesses Left: ${MAX_GUESSES - currentRow} (${getGuessScore()} points)
        Lives Left: ${lives} (${getLivesScore()} points)
        Time Left: ${duration - getGameTime()} (${getTimerScore()} points)
        
        Total score: ${getTotalScore()}`,
        [
          ({
            text: 'Go Home',
            onPress: () => navigation.navigate('Home'),
          },
          {
            text: 'View Leaderboard',
            onPress: () => navigation.navigate('Leaderboard'),
          }),
        ]
      );
      setGameState('won');
    } else if (checkIfLost() && gameState !== 'lost') {
      setTotalTime(getGameTime());
      getAndPostTotalScore();
      Alert.alert(
        'YOU DIED!!',
        `You ran out of guesses! 
        
        The word was ${word.toUpperCase()}
        
        Guesses Left: ${MAX_GUESSES - currentRow}
        Lives Left: ${lives} 
        Time Left: ${duration - getGameTime()} 
        
        Thank you for playing! 💀
        
        (0 points)`,
        [
          ({
            text: 'Go Home',
            onPress: () => navigation.navigate('Home'),
          },
          {
            text: 'View Leaderboard',
            onPress: () => navigation.navigate('Leaderboard'),
          }),
        ]
      );
      setGameState('lost');
    }
  };

  const getAndPostTotalScore = async () => {
    const gameNumber = user.scores.games[1]
      ? Object.keys(user.scores.games).length + 1
      : 1;
    const gameData = user.scores;

    const data = {
      timerScore: getTimerScore(),
      guessScore: getGuessScore(),
      livesScore: getLivesScore(),
      totalScore: getTotalScore(),
      word,
    };

    try {
      gameData.games[gameNumber] = data;
      gameData.total += getTotalScore();
      const scoresRef = doc(db, 'users', user.id);
      await updateDoc(scoresRef, { scores: gameData });

      const userRef = doc(db, 'users', user.id);
      const userSnap = await getDoc(userRef);
      setUser(userSnap.data());
    } catch (err) {
      alert(err);
    }
  };

  const getTimerScore = () => {
    if (duration === 120) {
      if (getGameTime() <= duration * 0.2) {
        return 10;
      } else if (getGameTime() <= duration * 0.5) {
        return 6;
      } else if (getGameTime() <= duration * 0.9) {
        return 3;
      } else {
        return 1;
      }
    } else if (duration === 60) {
      if (getGameTime() <= duration * 0.2) {
        return 20;
      } else if (getGameTime() <= duration * 0.5) {
        return 12;
      } else if (getGameTime() <= duration * 0.9) {
        return 6;
      } else {
        return 2;
      }
    } else if (duration === 300) {
      if (getGameTime() <= duration * 0.2) {
        return 5;
      } else if (getGameTime() <= duration * 0.5) {
        return 3;
      } else if (getGameTime() <= duration * 0.9) {
        return 1;
      } else {
        return 0;
      }
    }
  };
  const getGuessScore = () => {
    return (MAX_GUESSES - currentRow) * 2;
  };

  const getLivesScore = () => {
    return lives;
  };

  const getTotalScore = () => {
    return getTimerScore() + getGuessScore() + getLivesScore();
  };

  const getGameTime = () => {
    const endTime = Date.now();
    return Math.round((endTime - startTime) / 1000);
  };

  const checkIfWon = () => {
    const row = rows[currentRow - 1];

    return row.every((letter, i) => letter === letters[i]);
  };

  const checkIfLost = () => {
    return (!checkIfWon() && currentRow === rows.length) || lives === 0;
  };

  const handleKeyPress = (key) => {
    if (gameState !== 'playing') {
      return;
    }

    const updatedRows = copyArray(rows);

    if (key === ENTER) {
      if (!words.valid.includes(rows[currentRow].join('').toLowerCase())) {
        Alert.alert('Are you making things up? 💀');
      } else if (currentColumn === rows[0].length) {
        setCurrentRow(currentRow + 1);
        setCurrentColumn(0);
      }
      return;
    }

    if (key === DELETE) {
      const prevColumn = currentColumn - 1;
      if (prevColumn >= 0) {
        updatedRows[currentRow][prevColumn] = '';
        setRows(updatedRows);
        setCurrentColumn(prevColumn);
      }
      return;
    }

    if (currentColumn < rows[0].length) {
      updatedRows[currentRow][currentColumn] = key;
      setRows(updatedRows);
      setCurrentColumn(currentColumn + 1);
    }
  };

  const isCellActive = (row, col) => {
    return row === currentRow && col === currentColumn;
  };

  const checkRestOfRow = (row, col, letter) => {
    function duplicate(arr) {
      return new Set(arr).size !== arr.length;
    }

    let sameLetterAgain = false;

    for (let i = col; i < 4; i++) {
      if (rows[row][i + (duplicate(letters) ? 2 : 1)] === letter) {
        sameLetterAgain = true;
      }
    }
    return sameLetterAgain;
  };

  const getCellBGColor = (row, col) => {
    const letter = rows[row][col];

    if (col === 0 && row <= currentRow) {
      remainingLetters[row] = [...letters];
    }

    if (row >= currentRow) {
      return colors.black;
    }

    if (letter === letters[col]) {
      const letterPosition = remainingLetters[row].indexOf(letter);
      remainingLetters[row].splice(letterPosition, 1);
      return colors.primary;
    }

    console.log('reamainingLetters:', remainingLetters[row]);
    if (
      letters.includes(letter) &&
      remainingLetters[row].includes(letter) &&
      !checkRestOfRow(row, col, letter)
    ) {
      return colors.secondary;
    }

    return colors.darkgrey;
  };

  const getAllLettersWithColor = (color) => {
    return rows.flatMap((row, i) =>
      row.filter((cell, j) => getCellBGColor(i, j) === color)
    );
  };

  const greenKeys = getAllLettersWithColor(colors.primary);
  const yellowKeys = getAllLettersWithColor(colors.secondary);
  const greyKeys = getAllLettersWithColor(colors.darkgrey);
  const navigation = useNavigation();

  if (gameState !== 'playing') {
    return (
      <View>
        <TouchableOpacity
          style={gameStyles.homeButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={gameStyles.homeButtonTitle}>Go Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={gameStyles.container}>
      <StatusBar style='light' />

      <Stage wrongLetters={wrongLetters} />
      <Lives
        lives={lives}
        letters={letters}
        setLives={setLives}
        setCurrentRow={setCurrentRow}
        currentRow={currentRow}
        setGameState={setGameState}
        wrongLetters={wrongLetters}
      />

      <ScrollView style={gameStyles.map}>
        {rows.map((row, i) => (
          <View key={`row-${i}`} style={gameStyles.row}>
            {row.map((letter, j) => (
              <View
                key={`cell-${i}-${j}`}
                style={[
                  gameStyles.cell,
                  {
                    borderColor: isCellActive(i, j)
                      ? colors.grey
                      : colors.darkgrey,
                    backgroundColor: getCellBGColor(i, j),
                  },
                ]}
              >
                <Text style={gameStyles.cellText}>{letter.toUpperCase()}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      <Timer
        setGameState={setGameState}
        gameState={gameState}
        setTotalTime={setTotalTime}
        setStartTime={setStartTime}
        duration={duration}
      />

      {/* <Pressable onPress={resetGame} style={gameStyles.resetButton}>
        <Text style={gameStyles.resetText}>RESTART</Text>
      </Pressable> */}

      <Keyboard
        handleKeyPress={handleKeyPress}
        greenKeys={greenKeys}
        yellowKeys={yellowKeys}
        greyKeys={greyKeys}
      />
    </SafeAreaView>
  );
};

export default Game;
