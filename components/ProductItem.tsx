import { ProductItemProp } from "@/constants/definitions";
import useProductContext from "@/hooks/useProductContext";
import { FontAwesome } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";


export default function ProductItem({ product }: { product: ProductItemProp }) {
    
    const db = useSQLiteContext()
  const { setProduct, products, setBalance } = useProductContext()
    const handleTrash = async () => {
      try{
        db.runAsync(`UPDATE transactions set status = 'deleted' WHERE id = ${product.id}`);
        const filteredProducts = products.map(item => item.id === product.id ? {...item, status: 'deleted'} : item); 
        setProduct(filteredProducts);
        const balance = await db.getFirstAsync<{ amount: number }>(`SELECT amount FROM balance WHERE id = ?`, [1]);
        if(!balance) {
          await db.runAsync(`INSERT INTO balance (amount) VALUES (?)`, [0]);
        }


        if(product.type === 'income') {
          const currentBalance = Number(balance?.amount) - Number(product.amount);
          await db.runAsync(`UPDATE balance set amount =  ?`, [currentBalance]);
          setBalance(currentBalance);
        }
  
        if(product.type === 'expense') {
          const currentBalance = Number(balance?.amount) + Number(product.amount) ;
          await db.runAsync(`UPDATE balance set amount =  ?`, [currentBalance]);
          setBalance(currentBalance);
        }
      }catch(err) {
        console.log(err);
      }
    }

    return (
        <View style={styles.content}>
            <View style={styles.wrapper}>
                <View style={styles.wrapperHeading}>
                    <Text style={product.type === 'income' ? styles.textIngreso : styles.textEgreso}>{`${product.type === 'income' ? '+' : '-'}$${product.amount}`}</Text>
                    <Text>{product.type === 'income' ? '(Ingreso)' : '(Egreso)'}</Text>
                </View>
                <View>
                    <Text>{new Date().toLocaleDateString()}</Text>
                </View>
            </View>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>{product.description}</Text>
                <Pressable onPress={handleTrash}>
                    <FontAwesome size={24} name="trash" color={'red'} />
                </Pressable>
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
    color: 'green',
  },
  textEgreso: {
    color: 'red'
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
