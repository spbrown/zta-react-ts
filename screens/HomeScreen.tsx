import React from 'react';
import { ActivityIndicator, AsyncStorage, FlatList, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { Button, Header, Icon, List, ListItem, SearchBar } from 'react-native-elements';

import AsyncStorageKeys from '../constants/AsyncStorageKeys';

// import { StackNavigator } from 'react-navigation';
// import ProfileScreen from '../screens/ProfileScreen';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Staff',
  };

  constructor(props) {
    super(props);
    console.log('----------------------');
    console.log('HomeScreen.constructor');
    super(props);
    this.state = {
      loading: false,
      dataSource: []
    };

    //         _storeData = async () => {
    //           try {
    // //            await AsyncStorage.setItem('RISKS', 'Here are some risks.');
    //             AsyncStorage.setItem('RISKS', 'Here are some risks.');
    //           } catch (error) {
    //             // Error saving data
    //           }
    //         };

    //         _storeData();

    //var risks = [{location: 'Location 1'}];


  }

  componentDidMount() {
    console.log('HomeScreen.componentDidMount');

    this.setState({ loading: true });
    fetch("https://zta.z-tech.co.uk/api/staff/getstaff?password=ApiTest1066")
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          loading: false,
          dataSource: responseJson
        })
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log(error) //to catch the errors if any
      });
  }

  Go = (assetId) => {
    console.log(assetId);
    //alert(assetId);
    //this.props.navigation.navigate('Details');
    this.props.navigation.navigate('Profile', { assetId: assetId })
  }

  renderFooter = () => {
    if (!this.state.loading) return null;
    return (
      <View style={{ paddingVertical: 20, borderTopWidth: 1, borderTopColor: '#CED0CE' }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  renderHeader = () => {
    return <SearchBar placeholder="Type here..." lightTheme round />
  };

  renderItem = ({ item }) => (

    <ListItem button onPress={() => { this.Go(item.AssetId) }}
      title={item.FullName}
      subtitle={item.JobTitle}
      leftAvatar={{ source: { uri: 'https://scontent-lht6-1.xx.fbcdn.net/v/t1.0-1/p40x40/23517478_328767537598470_8406965766959015695_n.jpg?_nc_cat=102&_nc_ht=scontent-lht6-1.xx&oh=8b14c5bdb88e92f79277e2d021481924&oe=5DC572B2' } }}
      rightElement={this.renderRightElement(item)}
    />
  );

  renderRightElement = (item) => {
    return (
      <View>
        <Icon
          onPress={() => { this.Go(item.AssetId) }}
          name='keyboard-arrow-right'
          size={40}
          color='#CED0CE'
        />
      </View>
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "88%",
          backgroundColor: "#CED0CE",
          marginLeft: "18%"
        }}
      />
    );
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item.AssetId.toString()}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  staff: {
    flex: 1,
    backgroundColor: '#ffffff',
  }
});
