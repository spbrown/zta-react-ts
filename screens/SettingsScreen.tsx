import React from 'react';
//import { ExpoConfigView } from '@expo/samples';
import { ScrollView, StyleSheet, Text } from 'react-native';

// Try a bit of Typescript
let moreTesting: number = 123;

moreTesting = 456;
// end of 'Try a bit of Typescript'

export default function SettingsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>This is a page for settings...</Text>
      <Text style={styles.header}>This is from a .tsx file, git, 2</Text>
    </ScrollView>
  );
}

SettingsScreen.navigationOptions = {
  title: 'Settings',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  header: {
    padding: 10,
  },
});
