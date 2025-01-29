import Balance from '@/components/Balance';
import ProductList from '@/components/ProductList';
import Registry from '@/components/ui/Registry';
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import RemovedProductList from '@/components/RemovedProductList';

export default function TrashScreen() {

  return (
    <SafeAreaView>
      <View>
        <RemovedProductList />
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingLeft: 4,
    paddingRight: 4
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
