import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { User } from '@vibe-trail/shared';

export default function App() {
  const dummyUser: User = { id: '1', name: 'Tester', email: 'test@vibe.trail' };
  
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app! Hello, {dummyUser.name}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
