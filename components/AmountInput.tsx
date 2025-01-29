import { StyleSheet, Text, TextInput, View } from "react-native";

export default function AmountInput({value, onChange}: {value: string, onChange: (value: string) => void}) {
    return (
        <View style={styles.container}>
            <Text>Monto</Text>
            <TextInput inputMode='numeric' value={value} onChangeText={(text) => onChange(text)} placeholder="Monto" style={styles.input} />
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
  container: {
    display: 'flex',
    paddingLeft: 4,
    paddingRight: 4,
    flexDirection: 'column',
    gap: 8
  },
  input: {
    borderWidth: 1,
    padding: 8,
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
