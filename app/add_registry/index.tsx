import TabSwitcher from '@/components/TabSwitcher';
import { StyleSheet, View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable } from 'react-native-gesture-handler';
import DatePicker from '@/components/DatePicker';
import { useEffect, useState } from 'react';
import AmountInput from '@/components/AmountInput';
import DescriptionInput from '@/components/DescriptionInput';
import { DateType } from 'react-native-ui-datepicker';
import { useSQLiteContext } from 'expo-sqlite';
import moment from 'moment';
import { useRouter } from 'expo-router';
import useProductContext from '@/hooks/useProductContext';
import { ProductItemProp } from '@/constants/definitions';


export default function TabTwoScreen() {
  const [type, setType] = useState('income')
  const [date, setDate] = useState<DateType>()
  const [amount, setAmount] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const db = useSQLiteContext()
  const { products, setProduct, setBalance } = useProductContext();
  const router = useRouter();
  
  const onSubmit = async () => {
    try{
      const data = await db.runAsync(`INSERT INTO transactions (type,amount, description, date, status) VALUES (?, ?, ?, ?, ?);`, [
        type, amount, description, moment(date?.toString()).format('DD-MM-YYYY HH:mm'), 'active' 
      ]);

      const product: ProductItemProp = {
        id: data.lastInsertRowId.toString(),
        amount: +amount,
        description,
        type,
        date: moment(date?.toString()).format('DD-MM-YYYY HH:mm'),
        status: 'active'
      }

      const newValues = [...products, product];
      setProduct(newValues);

      const balance = await db.getFirstAsync<{ amount: number }>(`SELECT amount FROM balance WHERE id = ?`, [1]);
      
      if(!balance) {
        await db.runAsync(`INSERT INTO balance (amount) VALUES (?)`, [0]);
      }

      if(product.type === 'income') {
        const currentBalance = Number(balance?.amount) + Number(product.amount);
        await db.runAsync(`UPDATE balance set amount =  ?`, [currentBalance]);
        setBalance(currentBalance);
      }

      if(product.type === 'expense') {
        const currentBalance = Number(balance?.amount) - Number(product.amount) ;
        await db.runAsync(`UPDATE balance set amount =  ?`, [currentBalance]);
        setBalance(currentBalance);
      }
      router.back();
    }catch(error){
      console.log(error)
    }
  }


  return (
    <SafeAreaView>
    <View style={styles.container}>
      <Text>Tipo de Registro</Text>
      <TabSwitcher value={type} onChange={setType} />
      <DatePicker value={date} onChange={setDate} />
      <AmountInput value={amount} onChange={setAmount} />
      <DescriptionInput value={description} onChange={setDescription} />
      <Button title='Enviar' onPress={onSubmit}  />
    </View>
    </SafeAreaView>
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
    paddingLeft: 4,
    paddingRight: 4,
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
