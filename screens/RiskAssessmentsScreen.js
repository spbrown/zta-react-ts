import React from 'react';

import Moment from 'moment';
import uuid from 'uuid/v1';

import { Alert, AsyncStorage, Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { Button, Icon, ListItem } from 'react-native-elements';
import { TabBar, TabView, SceneMap } from 'react-native-tab-view';

import AsyncStorageKeys from '../constants/AsyncStorageKeys';

export default class RiskAssessmentsScreen extends React.Component {

  static navigationOptions = {
    title: 'Risk Assessments',
  };

  constructor(props) {

    console.log('-----------------------');
    console.log('RisksScreen.constructor');

    super(props);
    this.state = {
      riskAssessments: [],
      index: 0,
      routes: [
        { key: 'first', title: 'On This Phone' },
        { key: 'second', title: 'On ZTA' },
      ],
    };

    console.log(this.state.riskAssessments);

    Moment.locale('en');

    console.log('end of RisksScreen.constructor');
    console.log('------------------------------');

  }

  componentDidMount() {

    console.log('-----------------------------');
    console.log('RisksScreen.componentDidMount');

    // this.props.navigation.addListener('willFocus', (route) => {
    AsyncStorage.getItem(AsyncStorageKeys.riskAssessments, (error, result) => {
      console.log('Read from storage')
      console.log(JSON.parse(result));
      this.setState({ riskAssessments: JSON.parse(result) });
      console.log('Read from state')
      console.log(this.state.riskAssessments);
    })

    console.log('end of RisksScreen.componentDidMount');
    console.log('------------------------------------');

    this.props.navigation.addListener('willFocus', (route) => {
      // Read riskAssessments when tab changes.
      AsyncStorage.getItem(AsyncStorageKeys.riskAssessments, (error, result) => {
        console.log('Read from storage')
        console.log(JSON.parse(result));
        this.setState({ riskAssessments: JSON.parse(result) });
        console.log('Read from state')
        console.log(this.state.riskAssessments);
      })
    });

    // Refresh after goBack() from Add page.
    this.props.navigation.addListener('didFocus', (route) => {
      // Read riskAssessments when tab changes.
      AsyncStorage.getItem(AsyncStorageKeys.riskAssessments, (error, result) => {
        console.log('Read from storage')
        console.log(JSON.parse(result));
        this.setState({ riskAssessments: JSON.parse(result) });
        console.log('Read from state')
        console.log(this.state.riskAssessments);
      })
    });
  }

  deleteRiskAssessment = (id) => {
    console.log(id);

    Alert.alert(
      'Delete Risk Assessment',
      'Are you sure you want to delete this Risk Assessment?',
      [
        {
          text: 'Yes',
          onPress: () => {
            // Look up the id in the list of risk assessments and then remove it
            var array = [...this.state.riskAssessments]; // make a separate copy of the array
            //var index = array.indexOf(e.target.value)
            var index = array.findIndex(x => x.id === id);

            if (index !== -1) {
              // Remove the object from the array
              array.splice(index, 1);
              AsyncStorage.setItem(AsyncStorageKeys.riskAssessments, JSON.stringify(array));
              AsyncStorage.getItem(AsyncStorageKeys.riskAssessments, (error, result) => {
                this.setState({ riskAssessments: JSON.parse(result) });
              })
            }
          }
        },
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      { cancelable: true },
    )
  }

  Go = (riskAssessment) => {
    console.log(riskAssessment);
    this.props.navigation.navigate('RiskAssessment', { riskAssessment: riskAssessment })
  }

  renderItem = ({ item }) => (
    <ListItem button onPress={() => { this.Go(item) }}
      title={item.ref + ' ' + item.location}
      subtitle={Moment(item.created).format('DD/MM/YYYY HH:mm:ss')}
      rightElement={this.renderRightElement(item)}
    />
  )

  renderRightElement = (item) => {
    return (
      <View>
        <Icon
          onPress={() => { this.deleteRiskAssessment(item.id) }}
          name='delete'
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
          backgroundColor: "#CED0CE",
          height: 1,
        }}
      />
    );
  };

  renderTab1 = () => {
    console.log('renderTab1()');
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Risk Assessments stored on on this phone.</Text>
        <FlatList
          data={this.state.riskAssessments}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={(item, index) => item.id}
        />
        <View style={styles.row3}>
          <View style={styles.inputWrap}>
            <Button onPress={this.addRiskAssessment} title="Add New" />
          </View>
          <View style={styles.inputWrap}>
            <Button onPress={this.addTestRiskAssessment} title="Add Test" />
          </View>
          <View style={styles.inputWrap}>
            <Button onPress={this.clearAsyncStorage} title="Clear All" />
          </View>
        </View>
      </View>
    );
  }

  renderTab2 = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Risk Assessments uploaded and stored on on ZTA.</Text>
        <FlatList
          data={null}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={(item, index) => item.id}
        />
      </View>
    );
  }


  render() {

    return (
      <TabView

        // renderTabBar={props =>
        //  <TabBar
        //    {...props}
        //    indicatorStyle={{ backgroundColor: 'white' }}
        //    style={{ backgroundColor: 'navy' }}
        //  />
        // }

        // renderLabel={({ route, focused, color }) => (
        //   <Text style={{ color, margin: 8 }}>
        //    {route.title}
        //  </Text>
        // )}

        navigationState={this.state}
        renderScene={({ route }) => {
          switch (route.key) {
            case 'first':
              return this.renderTab1();
            case 'second':
              return this.renderTab2();
            default:
              return null;
          }
        }}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
      />

      // <View style={styles.container}>
      //   <Text style={styles.header}>This is where we show our list of Risk Assessments. We show all the Risk Assessments that are stored in local memory.</Text>
      //   <FlatList
      //     data={this.state.riskAssessments}
      //     renderItem={this.renderItem}
      //     ItemSeparatorComponent={this.renderSeparator}
      //     keyExtractor={(item, index) => item.id}
      //   />
      //   <View style={styles.row3}>
      //     <View style={styles.inputWrap}>
      //       <Button onPress={this.addRiskAssessment} title="Add New" />
      //     </View>
      //     <View style={styles.inputWrap}>
      //       <Button onPress={this.addTestRiskAssessment} title="Add Test" />
      //     </View>
      //     <View style={styles.inputWrap}>
      //       <Button onPress={this.clearAsyncStorage} title="Clear All" />
      //     </View>
      //   </View>
      // </View>
    );
  }

  addRiskAssessment = () => {
    console.log('addRiskAssessment');
    this.props.navigation.navigate('RiskAssessmentAdd');
  };

  addTestRiskAssessment = async () => {
    console.log('addTestRiskAssessment');

    // Get current risk assessments and add a new one.

    var riskAssessments = [];

    AsyncStorage.getItem(AsyncStorageKeys.riskAssessments, (error, result) => {
      console.log(result);
      if (result != null) {
        console.log('has data');
        riskAssessments = JSON.parse(result);
        console.log(riskAssessments);
        riskAssessments.push({
          id: uuid(),
          key: 'location' + riskAssessments.length,
          location: 'Kinloch Rannoch',
          created: new Date(),
          ref: GetQNumber() + ', AR20 Verifications Program - Verifications',
          task: 'Annual Verification',
          submitted: new Date(),
        });
        AsyncStorage.setItem(AsyncStorageKeys.riskAssessments, JSON.stringify(riskAssessments));
      }
      else {
        riskAssessments.push({
          id: uuid(),
          key: 'location0',
          location: 'Kinloch Rannoch',
          created: new Date(),
          ref: GetQNumber() + ', AR20 Verifications Program - Verifications',
          task: 'Annual Verification',
          submitted: new Date(),
        })
        AsyncStorage.setItem(AsyncStorageKeys.riskAssessments, JSON.stringify(riskAssessments));
      }

      //console.log(JSON.parse(result));
      this.setState({ riskAssessments: riskAssessments });

    });
  }

  clearAsyncStorage = async () => {
    console.log('clearAsyncStorage');

    Alert.alert(
      'Clear Risk Assessments',
      'Are you sure you want to delete ALL Risk Assessments?',
      [
        {
          text: 'Yes',
          onPress: () => {
            AsyncStorage.getAllKeys((err, keys) => {
              console.log(keys);
            });

            AsyncStorage.clear();

            this.setState({ riskAssessments: null });
          }
        },
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      { cancelable: true },
    )
  }
}

function GetQNumber() {
  return 'Q' + ('0000' + Math.floor(Math.random() * 9999)).slice(-4);
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    //paddingTop: 15,
  },
  header: {
    backgroundColor: 'navy',
    color: 'orange',
    fontWeight: 'bold',
    padding: 12,
  },
  item: {
    padding: 0,
    fontSize: 18,
    height: 40,
  },
  inputWrap: {
    flex: 1,
    margin: 5
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: 'red',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  row3: {
    flexDirection: "row",
  },

});
