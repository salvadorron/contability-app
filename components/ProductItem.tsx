import { ProductItemProp } from "@/constants/definitions";
import { ScrollView, StyleSheet, Text, View } from "react-native";


export default function ProductItem({ product }: { product: ProductItemProp }) {
    return (
        <View style={styles.content}>
            <View style={styles.wrapper}>
                <View style={styles.wrapperHeading}>
                    <Text style={product.type === 'ingreso' ? styles.textIngreso : styles.textEgreso}>{`$${product.amount}`}</Text>
                    <Text>{product.type === 'ingreso' ? '(Ingreso)' : '(Egreso)'}</Text>
                </View>
                <View>
                    <Text>{new Date().toLocaleDateString()}</Text>
                </View>
            </View>
            <View>
                <Text>{product.description}</Text>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  textIngreso: {
    color: 'red',
  },
  textEgreso: {
    color: 'green'
  },
  wrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    gap: 4
  },
  wrapperHeading: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    flex: 1,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    padding: 12,
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: 8,
    marginBottom: 8
  },
});
