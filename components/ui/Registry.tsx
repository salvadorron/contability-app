import { Link } from "expo-router";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";

export default function Registry() {
    return (
        <View style={styles.container}>
            <Link href="/add_registry" asChild>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Agregar Nuevo Registro</Text>
                </Pressable>
                
            </Link>
          
          </View>
    )
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    padding: 8
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    textTransform: 'uppercase',
    backgroundColor: '#09f',
    borderRadius: 8,
    color: '#fff',
    padding: 12
  },
  buttonText: {
    fontSize: 16,
    textTransform: 'uppercase',
    color: '#fff',
  }
});