import TabSwitcher from '@/components/TabSwitcher';
import { StyleSheet, View, Text } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';
import DatePicker from '@/components/DatePicker';
import { useEffect, useState } from 'react';
import AmountInput from '@/components/AmountInput';
import DescriptionInput from '@/components/DescriptionInput';
import { DateType } from 'react-native-ui-datepicker';
import { useSQLiteContext } from 'expo-sqlite';
import moment from 'moment';


export default function TabTwoScreen() {


  const [type, setType] = useState('income')
  const [date, setDate] = useState<DateType>()
  const [amount, setAmount] = useState<string>("0")
  const [description, setDescription] = useState<string>("")
  const sqlite = useSQLiteContext()

  useEffect(() => {
    sqlite.execAsync('CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, amount REAL, type TEXT, date TEXT);')
      .then(() => console.log('database initialized'))
  }, [])

  const onSubmit = async () => {
    await sqlite.execAsync(`INSERT INTO transactions (amount, type, date) VALUES (${amount}, ${type}, ${moment(date?.toString()).format('DD-MM-YYYY HH:mm')});`);
    console.log("saved")
  }


  return (
    <View style={styles.container}>
      <Text>Tipo de Registro</Text>
      <TabSwitcher value={type} onChange={setType} />
      <DatePicker value={date} onChange={setDate} />
      <AmountInput value={amount} onChange={setAmount} />
      <DescriptionInput value={description} onChange={setDescription} />
      <Pressable onPress={onSubmit} style={styles.submit}>
        <Text>
          Enviar
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  submit: {
    backgroundColor: '#09f',
    padding: 8,
    borderRadius: 8,
    fontSize: 18,
    color: 'white',
  },
  container: {
    display: 'flex',
    padding: 8,
    flexDirection: 'column',
    gap: 8
  },
  input: {
    borderWidth: 1,
    padding: 4,
    borderColor: '#ccc',
    borderRadius: 4
  },
  tabSwitcher: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#ddd',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    gap: 4,
  },

  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
