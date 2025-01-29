import Balance from '@/components/Balance';
import ProductList from '@/components/ProductList';
import Registry from '@/components/ui/Registry';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function HomeScreen() {

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Balance General</Text>
      </View>
      <View style={styles.stepContainer}>
        <Registry />
        <Balance />
        <ProductList />
      </View>      
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
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
