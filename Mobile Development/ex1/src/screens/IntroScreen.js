import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";

export const IntroScreen = ({navigation}) => {

  const goToGame = () => {
      navigation.navigate('Game')
  };

  return (
      <View style={styles.container}>
          <Text style={styles.text}>Игра в кости</Text>
          <Text style={styles.postText}>Лучшая игра в твоём универе!</Text>
          <TouchableOpacity
              style={styles.goButton}
              onPress={goToGame}
          >
              <Text style={styles.goButtonText}>Начать новую игру</Text>
          </TouchableOpacity>
      </View>
  )
};

IntroScreen.navigationOptions = {
    headerTitle: 'Главное меню'
};

const styles = StyleSheet.create({
   container: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor: '#505050',

   },
   text: {
       color: '#fff',
       fontSize: 34
   },
   goButton: {
       backgroundColor: '#fff',
       padding: 10,
       width: '50%',
       marginTop: 30
   },
   goButtonText: {
       color: '#505050',
       textAlign: 'center'
   },
   postText: {  
       color: '#a9a9a9',
   }
});