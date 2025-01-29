import { ScrollView, StyleSheet, Text } from "react-native";
import ProductItem from "./ProductItem";
import { View } from "react-native";
// import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";



export default function ProductList() {

  // const db = useSQLiteContext();
  // const [todos, setTodos] = useState<any[]>([]);

  // useEffect(() => {
  //   async function setup() {
  //     const result = await db.getAllAsync<any>('SELECT * FROM todos');
  //     setTodos(result);
  //   }
  //   setup();
  // }, []);


    return (
        <ScrollView>
            <View style={styles.container}>
                <Text>Registros</Text>
                {/* {todos.map(product => <ProductItem key={product.id} product={product} />)} */}
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
  container: {
    padding: 8,
    display: 'flex',
    gap: 10
  }
})