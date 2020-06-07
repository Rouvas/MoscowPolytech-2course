import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";

export const GameScreen = ({navigation}) => {

    const [computerScore, setComputerScore] = useState(null);
    const [firstComputerNumber, setFirstComputerNumber] = useState(null);
    const [secondComputerNumber, setSecondComputerNumber] = useState(null);

    const [playerScore, setPlayerScore] = useState(null);
    const [firstPlayerNumber, setFirstPlayerNumber] = useState(null);
    const [secondPlayerNumber, setSecondPlayerNumber] = useState(null);

    const playerRoll = () => {
       
        const firstPlayerNum = Math.floor(Math.random()*6) + 1;
        setFirstPlayerNumber(firstPlayerNum);
        const secPlayerNum = Math.floor(Math.random()*6) + 1;
        setSecondPlayerNumber(secPlayerNum);
        const finalPlayerNumber = firstPlayerNum + secPlayerNum;
        setPlayerScore(playerScore + finalPlayerNumber);

        const firstCompNum = Math.floor(Math.random()*6) + 1;
        setFirstComputerNumber(firstCompNum);
        const secCompNum = Math.floor(Math.random()*6) + 1;
        setSecondComputerNumber(secCompNum);
        const finalComputerNumber = firstCompNum + secCompNum;
        setComputerScore(computerScore + finalComputerNumber);
    };

    const onPlayerDouble = () => {
        const firstPlayerNum = Math.floor(Math.random()*6) + 1;
        setFirstPlayerNumber(firstPlayerNum);
        const secPlayerNum = Math.floor(Math.random()*6) + 1;
        setSecondPlayerNumber(secPlayerNum);
        const finalPlayerNumber = firstPlayerNum + secPlayerNum;
        setPlayerScore(playerScore + finalPlayerNumber);
    };

    const onComputerDouble = () => {
        const firstCompNum = Math.floor(Math.random()*6) + 1;
        setFirstComputerNumber(firstCompNum);
        const secCompNum = Math.floor(Math.random()*6) + 1;
        setSecondComputerNumber(secCompNum);
        const finalComputerNumber = firstCompNum + secCompNum;
        setComputerScore(computerScore + finalComputerNumber);
    };

    const goAgain = () => {
        navigation.navigate('Intro')
    };

    return (
        <View style={styles.container}>
            <View style={styles.computerGame}>
                <Text style={styles.header}>Искусственный интеллект</Text>
                <View style={styles.blocks}>
                    <View style={styles.computersBlock}>
                        <Text style={styles.resultText}>{firstComputerNumber}</Text>
                    </View>
                    <View style={styles.computersBlock}>
                        <Text style={styles.resultText}>{secondComputerNumber}</Text>
                    </View>
                </View>
                <Text>ИИ выпало: {firstComputerNumber + secondComputerNumber}</Text>
                <Text>Счёт ИИ: {computerScore}</Text>
                {(firstComputerNumber === secondComputerNumber) && (firstComputerNumber !== null) && (secondComputerNumber !== null) ?
                    <TouchableOpacity style={styles.rollAgainButton} onPress={onComputerDouble}>
                        <Text style={styles.rollAgainButtonText}>Дубль! Нажмите, чтобы бросить ещё раз.</Text>
                    </TouchableOpacity>
                    : null
                }
            </View>
            {((firstPlayerNumber === secondPlayerNumber) || (firstComputerNumber === secondComputerNumber)) && (firstPlayerNumber !== null) ?
                <TouchableOpacity style={styles.throwButton} onPress={playerRoll} disabled={true}>
                    <Text style={styles.throwButtonTextDisable}>Дубль!</Text>
                </TouchableOpacity> :
                <TouchableOpacity style={styles.throwButton} onPress={playerRoll} disabled={false}>
                    <Text style={styles.throwButtonText}>Бросить ещё раз.</Text>
                </TouchableOpacity>
            }
            <View style={styles.playerGame}>
                <Text style={styles.header}>Вы</Text>
                <View style={styles.blocks}>
                    <View style={styles.playersBlock}>
                        <Text style={styles.resultText}>{firstPlayerNumber}</Text>
                    </View>
                    <View style={styles.playersBlock}>
                        <Text style={styles.resultText}>{secondPlayerNumber}</Text>
                    </View>
                </View>
                <Text>Вам выпало: {firstPlayerNumber + secondPlayerNumber}</Text>
                <Text>Ваш счёт: {playerScore}</Text>
                {(firstPlayerNumber === secondPlayerNumber) && (firstPlayerNumber !== null) && (secondPlayerNumber !== null) ?
                    <TouchableOpacity style={styles.rollAgainButton} onPress={onPlayerDouble}>
                        <Text style={styles.rollAgainButtonText}>Дубль! Нажмите, чтобы бросить ещё раз.</Text>
                    </TouchableOpacity>
                    : null
                }
            </View>
            {(playerScore > 100) && (computerScore < 100) ?
                <View style={styles.result}>
                    <Text style={styles.resultHead}>Победа</Text>
                    <Text>Очки компьютера: {computerScore}</Text>
                    <Text>Ваши очки: {playerScore}</Text>
                    <TouchableOpacity style={styles.goAgainButton} onPress={goAgain}>
                        <Text style={styles.goAgainText}>В меню</Text>
                    </TouchableOpacity>
                </View> : null
            }
            {(playerScore < 100) && (computerScore > 100) ?
                <View style={styles.result}>
                    <Text style={styles.resultHead}>Поражение</Text>
                    <Text>Очки компьютера: {computerScore}</Text>
                    <Text>Ваши очки: {playerScore}</Text>
                    <TouchableOpacity style={styles.goAgainButton} onPress={goAgain}>
                        <Text style={styles.goAgainText}>В меню</Text>
                    </TouchableOpacity>
                </View> : null
            }
            {(playerScore > 100) && (computerScore > 100) ?
                <View style={styles.result}>
                    <Text style={styles.resultHead}>Ничья</Text>
                    <Text>Очки компьютера: {computerScore}</Text>
                    <Text>Ваши очки: {playerScore}</Text>
                    <TouchableOpacity style={styles.goAgainButton} onPress={goAgain}>
                        <Text style={styles.goAgainText}>В меню</Text>
                    </TouchableOpacity>
                </View> : null
            }
        </View>
    )
};

GameScreen.navigationOptions = {
    headerTitle: 'Игра'
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#505050',
    },
    header: {
      fontSize: 18
    },
    blocks: {
        flexDirection: 'row'
    },
    computerGame: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#fff'
    },
    playerGame: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#fff'
    },
    computersBlock: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,
        marginHorizontal: 20,
        borderRadius: 10
    },
    resultText: {
      fontSize: 24
    },
    playersBlock: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,
        marginHorizontal: 20,
        borderRadius: 10
    },
    throwButton: {
        height: '10%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    throwButtonText: {
        color: '#505050'
    },
    throwButtonTextDisable: {
        color: 'red',
        fontSize: 18
    },
    rollAgainButton: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    rollAgainButtonText: {
        color: '#505050'
    },
    result: {
        position: 'absolute',
        backgroundColor: '#fff',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    goAgainButton: {
        backgroundColor: '#505050',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 10
    },
    goAgainText: {
        color: '#fff'
    },
    resultHead: {
        fontSize: 34,
        marginBottom: 10
    }
});