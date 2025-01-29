import { ScrollView, StyleSheet, Text } from "react-native";
import ProductItem from "./ProductItem";
import { View } from "react-native";
// import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { ProductItemProp } from "@/constants/definitions";
import useProductContext from "@/hooks/useProductContext";
import RemovedProductItem from "./RemovedProductItem";



export default function RemovedProductList() {


   const { products } = useProductContext();


    return (
        <ScrollView>
            <View style={styles.container}>
                <Text>Registros Eliminados</Text>
                {products.filter(product => product.status === 'deleted').map(product => <RemovedProductItem key={product.id} product={product} />)}
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