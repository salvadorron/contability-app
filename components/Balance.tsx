import useProductContext from "@/hooks/useProductContext";
import { StyleSheet, Text, View } from "react-native";

export default function Balance () {

  const { balance } = useProductContext();

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>Balance Final</Text>
            </View>
            <View>
                <Text style={[styles.text, balance < 0 ? styles.expense : styles.income]}>{balance < 0 ? `$${Math.abs(balance)}` : `$${balance}`}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
    padding: 8
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  income: {
    color: 'green'
  },
  expense: {
    color: 'red'
  },
  text: {
    fontSize: 18,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
