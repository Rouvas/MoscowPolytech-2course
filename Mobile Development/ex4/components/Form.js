import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const Form = ({ onFormChange, onFormSubmit, dataToChange }) => {
  const [name, setName] = useState(dataToChange ? dataToChange.name : '');
  const [surname, setSurname] = useState(dataToChange ? dataToChange.surname : '');
  const [phone, setPhone] = useState(dataToChange ? dataToChange.phone : '');

  const onAddHandler = () => {
    if (name && surname && phone) {
      onFormSubmit(name, surname, phone);
      setName('');
      setSurname('');
      setPhone('');
      onFormChange()
    } else {
      alert('Ошибка! Введите все данные')
    }
  };

  const onBackHandler = () => {
    setName('');
    setSurname('');
    setPhone('');
    onFormChange()
  };

  return (
    <>
      <TextInput
        style={styles.input}
        placeholder="Имя"
        onChangeText={name => setName(name)}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="Фамилия"
        onChangeText={surname => setSurname(surname)}
        value={surname}
      />
      <TextInput
        style={styles.input}
        placeholder="Телефон"
        onChangeText={phone => setPhone(phone)}
        value={phone}
      />
      <View style={styles.buttons}>
        <TouchableOpacity
            style={styles.buttonAdd}
            onPress={onAddHandler}
        >
          <Text style={styles.buttonText}>Создать/Изменить</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.buttonBack}
            onPress={onBackHandler}
        >
          <Text style={styles.buttonText}>Отмена</Text>
        </TouchableOpacity>
      </View>
    </>
  )
};

const styles = StyleSheet.create({
  input: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 15,
    color: 'grey',
    fontSize: 16
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
    
  },
  buttonAdd: {
    backgroundColor: 'green',
    padding: 15,
    flex: 1,
    marginRight: 10
  },
  buttonBack: {
    backgroundColor: 'red',
    padding: 15,
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center'
  }
});

export default Form
