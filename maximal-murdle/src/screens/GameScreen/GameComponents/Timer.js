import * as React from 'react';
import { Text, View } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import timerStyles from '../styles/timerStyles';

export default function Timer({
  setGameState,
  gameState,
  setStartTime,
  duration,
}) {
  React.useEffect(() => {
    if (gameState === 'playing') {
      setStartTime(Date.now());
    }
  }, [gameState]);

  return (
    <View style={timerStyles.container}>
      <CountdownCircleTimer
        isPlaying={gameState === 'playing'}
        duration={duration}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[60, 30, 10, 0]}
        size={60}
        strokeWidth={6}
        trailColor={'#121214'}
        onComplete={() => {
          ({ shouldRepeat: false, delay: 2 });
          setGameState('timeout');
        }}
      >
        {({ remainingTime, color }) => (
          <Text style={{ color, fontSize: 20 }}>{remainingTime}</Text>
        )}
      </CountdownCircleTimer>
    </View>
  );
}
