import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {database} from './models';

const App = () => {
  const [people, setPeople] = useState([]);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    getPeople();
  }, [reload]);

  const getPeople = async () => {
    const result = database.collections.get('Pessoa');
    const allPeople = await result.query().fetch();

    console.log('result', allPeople);
  };

  const addPeople = async () => {
    const result = database.collections.get('Pessoa');

    await database.action(async () => {
      await result.create((entry) => {
        entry.name = 'teste';
        entry.years = 20;
        entry.adult = true;
      });
    });

    setReload(reload + 1);
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity onPress={() => addPeople()}>
        <Text>teste</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
