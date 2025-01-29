import { PermissionsAndroid, Pressable, ScrollView, StyleSheet, Text } from "react-native";
import ProductItem from "./ProductItem";
import { View } from "react-native";
// import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { ProductItemProp } from "@/constants/definitions";
import useProductContext from "@/hooks/useProductContext";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

export default function ProductList() {


  const db = useSQLiteContext()
  const { products, setProduct, setBalance } = useProductContext();

  const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
      Hello Expo!
    </h1>
    <img
      src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png"
      style="width: 90vw;" />
  </body>
</html>
`;

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({ html });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  };

  const getData = async () => {
    const registry = await db.getAllAsync<ProductItemProp>("SELECT * FROM transactions");
    const balance = await db.getFirstAsync<{ amount: number }>(`SELECT amount FROM balance WHERE id = ?`, [1]);
    if(!balance){
      await db.runAsync(`INSERT INTO balance (amount) VALUES (?)`, [0]);
      const balance = await db.getFirstAsync<{ amount: number }>(`SELECT amount FROM balance WHERE id = ?`, [1]);
      setBalance(Number(balance?.amount));
    } else {
      setBalance(Number(balance?.amount));
    }
    setProduct(registry);
  }
    
  useEffect(() => {
    getData();
  }, [])

    return (
        <ScrollView>
              <Pressable style={styles.button} onPress={printToFile}>
                    <Text style={styles.buttonText}>Generar Acta</Text>
              </Pressable>
            <View style={styles.container}>
                <Text>Registros</Text>
                {products.filter(product => product.status === 'active')
                  .map(product => <ProductItem key={product.id} product={product} />)}
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
  container: {
    padding: 8,
    display: 'flex',
    gap: 10
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    textTransform: 'uppercase',
    backgroundColor: '#ff2c2c',
    borderRadius: 8,
    color: '#fff',
    padding: 12
  },
  buttonText: {
    fontSize: 16,
    textTransform: 'uppercase',
    color: '#fff',
  }
})