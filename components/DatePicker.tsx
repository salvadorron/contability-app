import { Pressable, StyleSheet, Text, View } from "react-native";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import dayjs from "dayjs";
import { useState } from "react";

export default function DatePicker({value, onChange}: {value: DateType, onChange: (value: DateType) => void}) {

      const [show, setShow] = useState(false)
    
      const onValueChange = (params: { date: DateType }) => {
        onChange(dayjs(params.date))
        setShow(false);
      }

    return (
        <View style={styles.container}>
            <Text>Fecha</Text>
            <Pressable style={styles.selectPicker} onPress={() => setShow(!show)}>{value ? dayjs(value).format('DD/MM/YYYY') : 'Seleccionar Fecha'}</Pressable>
            {show && <DateTimePicker mode="single" date={value} onChange={onValueChange} />}
        </View>
    )
}

const styles = StyleSheet.create({
  submit: {
    backgroundColor: '#09f',
    padding: 8,
    borderRadius: 8,
    fontSize: 18,
    color: 'white',
  },
  selectPicker: {
    borderWidth: 1,
    padding: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderColor: '#ccc',
    borderRadius: 4
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