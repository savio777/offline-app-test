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
  const [idEdit, setIdEdit] = useState('');
  const [name, setName] = useState('');
  const [years, setYears] = useState('');
  const [reload, setReload] = useState(0);
  const [enableCreate, setEnableCreate] = useState(true);

  useEffect(() => {
    getPeoples();
  }, [reload]);

  const getPeoples = async () => {
    const result = database.collections.get('Pessoa');
    const allPeople = await result.query().fetch();

    setPeople(allPeople);
    //console.log('result', allPeople);
  };

  const addPeople = async () => {
    const result = database.collections.get('Pessoa');

    await database.action(async () => {
      await result.create((newPeople) => {
        newPeople.name = name;
        newPeople.years = Number(years);
        newPeople.adult = Number(years) > 17 ? true : false;

        console.log('create: ', newPeople);
      });
    });

    setName('');
    setYears('');
    setReload(reload + 1);
  };

  const deletePeople = async (id = '') => {
    console.log('deleted: ', id);

    const result = database.collections.get('Pessoa');

    await database.action(async () => {
      const findPeople = await result.find(id);

      await findPeople.markAsDeleted();
      await findPeople.destroyPermanently();
    });

    getPeoples();
  };

  const getPeople = async (id = '') => {
    console.log('get: ', id);

    const result = database.collections.get('Pessoa');

    const findPeople = await result.find(id);

    setIdEdit(findPeople.id);
    setName(findPeople.name);
    setYears(String(findPeople.years));
    setEnableCreate(false);
  };

  const editPeople = async () => {
    console.log('edited: ', idEdit);

    const result = database.collections.get('Pessoa');

    const findPeople = await result.find(idEdit);

    await database.action(async () => {
      await findPeople.update((peopleUpdt) => {
        peopleUpdt.name = name;
        peopleUpdt.years = Number(years);
        peopleUpdt.adult = Number(years) > 17 ? true : false;

        console.log('updated: ', peopleUpdt);
      });
    });

    setName('');
    setYears('');
    setReload(reload + 1);
    setEnableCreate(true);
  };

  return (
    <>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={(value) => setName(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Idade"
          value={years}
          onChangeText={(value) => setYears(value)}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => (enableCreate ? addPeople() : editPeople())}>
          <Text>{enableCreate ? 'Cadastrar' : 'Atualizar'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <ScrollView>
          {people.map((p) => (
            <View key={p.id} style={styles.containerCards}>
              <View style={styles.cards}>
                <Text>Id: {p.id} </Text>
                <Text>Nome: {p.name} </Text>
                <Text>Idade: {p.years} </Text>
                {(p.adult === true || p.adult === false) && (
                  <Text>Adulto: {p.adult === true ? 'sim' : 'não'} </Text>
                )}
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => getPeople(p.id)}
                  style={[styles.button, styles.buttonActionsBD]}>
                  <Text style={styles.textButtonEdit}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => deletePeople(p.id)}
                  style={[styles.button, styles.buttonActionsBD]}>
                  <Text style={styles.textButtonRemove}>Excluir</Text>
                </TouchableOpacity>
              </View>
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
  input: {borderBottomWidth: 1, borderColor: '#969696', marginBottom: 5},
  containerCards: {
    flexDirection: 'row',
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cards: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#969696',
    padding: 5,
  },
  button: {
    borderWidth: 1,
    borderColor: '#969696',
    borderRadius: 5,
    padding: 5,
    marginVertical: 1,
  },
  buttonActionsBD: {marginLeft: 5, height: 35, alignItems: 'center'},
  textButtonRemove: {color: 'red'},
  textButtonEdit: {color: '#000'},
});

export default App;
