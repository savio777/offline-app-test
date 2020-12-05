import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';

import {database} from './models';

const App = () => {
  const [people, setPeople] = useState([]);
  const [name, setName] = useState('');
  const [years, setYears] = useState('');
  const [reload, setReload] = useState(0);

  useEffect(() => {
    getPeople();
  }, [reload]);

  const getPeople = async () => {
    const result = database.collections.get('Pessoa');
    const allPeople = await result.query().fetch();

    setPeople(allPeople);
    console.log('result', allPeople);
  };

  const addPeople = async () => {
    const result = database.collections.get('Pessoa');

    await database.action(async () => {
      await result.create((entry) => {
        entry.name = name;
        entry.years = Number(years);
        entry.adult = Number(years) > 17 ? true : false;
      });
    });

    setName('');
    setYears('');
    setReload(reload + 1);
  };

  return (
    <>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nome"
          value={name}
          onChangeText={(value) => setName(value)}
        />
        <TextInput
          placeholder="Idade"
          value={years}
          onChangeText={(value) => setYears(value)}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={() => addPeople()}>
          <Text>cadastrar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <ScrollView>
          {people.map((p) => (
            <View key={p.id} style={styles.cards}>
              <Text>Id: {p.id} </Text>
              <Text>Nome: {p.name} </Text>
              <Text>Idade: {p.years} </Text>
              {(p.adult === true || p.adult === false) && (
                <Text>Adulto: {p.adult === true ? 'sim' : 'não'} </Text>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  inputContainer: {
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  button: {
    borderWidth: 1,
    borderColor: '#969696',
    borderRadius: 5,
    padding: 5,
    marginVertical: 1,
  },
  cards: {
    margin: 2,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#969696',
    padding: 5,
  },
});

export default App;
