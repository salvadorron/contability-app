import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import ProductItem from "./ProductItem";
import { View } from "react-native";
// import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { ProductItemProp } from "@/constants/definitions";
import useProductContext from "@/hooks/useProductContext";



export default function ProductList() {


  const db = useSQLiteContext()
  const {products, setProduct} = useProductContext();
  const getData = async () => {
    const registry = await db.getAllAsync<ProductItemProp>("SELECT * FROM transactions");
    setProduct(registry);
  }

  useEffect(() => {
    getData();
  }, [])

    return (
        <ScrollView>
              <Pressable style={styles.button}>
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