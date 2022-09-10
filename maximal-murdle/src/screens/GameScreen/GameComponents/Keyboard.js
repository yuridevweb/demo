import { View, Text, Pressable } from 'react-native';
import { keys, ENTER, DELETE, colors } from '../../../constants';
import { keyboardStyles, keyWidth } from '../styles/keyboardStyles';

const Keyboard = ({
  handleKeyPress,
  greenKeys = [],
  yellowKeys = [],
  greyKeys = [],
}) => {
  const isLongButton = (key) => {
    return key === ENTER || key === DELETE;
  };

  const getKeyBGColor = (key) => {
    if (greenKeys.includes(key)) {
      return colors.primary;
    }
    if (yellowKeys.includes(key)) {
      return colors.secondary;
    }
    if (greyKeys.includes(key)) {
      return '#bb0a1e';
    }
    return colors.grey;
  };

  return (
    <View style={keyboardStyles.keyboard}>
      {keys.map((keyRow, i) => (
        <View style={keyboardStyles.row} key={`row-${i}`}>
          {keyRow.map((key) => (
            <Pressable
              onPress={() => handleKeyPress(key)}
              key={key}
              style={[
                keyboardStyles.key,
                isLongButton(key) ? { width: keyWidth * 1.4 } : {},
                { backgroundColor: getKeyBGColor(key) },
              ]}
            >
              <Text style={keyboardStyles.keyText}>{key.toUpperCase()}</Text>
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
};

export default Keyboard;
