import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function TabSwitcher ({value, onChange}: {value: string, onChange: (value: string) => void}) {


    return (
        <View style={styles.tabSwitcher}>
            <Pressable style={[styles.button, value === 'income' ? styles.active : {}]} onPress={() => onChange('income')}>Ingreso</Pressable>
            <Pressable style={[styles.button, value === 'expense' ? styles.active : {}]} onPress={() => onChange('expense')}>Egreso</Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
  active: {
    backgroundColor: '#fff',
    color: '#09f',
    fontWeight: 'bold'
  },
  button: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 4,
  },
  tabSwitcher: {
    padding: 4,
    borderRadius: 8,
    backgroundColor: '#ddd',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    gap: 4,
  }
});
