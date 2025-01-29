import useProductContext from "@/hooks/useProductContext";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Balance () {

  const db = useSQLiteContext()
  const [balance, setBalance] = useState<number>(0);

    db.getFirstAsync<{ amount: number }>(`SELECT amount FROM balance WHERE id = ?`, [1]).then((balance) => {
      if(balance) {
        setBalance(balance.amount);
      } else {
        db.runAsync(`INSERT INTO balance (amount) VALUES (?)`, [0]);
        setBalance(0);
      }
    })

    return (
        <View style={styles.container}>
            <View>
                <Text>Balance Final</Text>
            </View>
            <View>
                <Text>{balance}</Text>
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
  headerTitle: {
    fontSize: 24,
    padding: 4
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
