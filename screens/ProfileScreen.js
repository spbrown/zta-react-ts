import React from 'react';
import { Button, Header, ListItem, withTheme } from 'react-native-elements';
import { FlatList, TouchableOpacity, SectionList, StyleSheet, Text, View, Image } from 'react-native';

export default class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Staff Profile'
    };

    constructor(props) {
        super(props);
        this.state = {
            assetId: props.navigation.getParam('assetId', 571),
            loading: true,
            dataSource: []
        };
    }

    componentDidMount() {
        fetch("https://zta.z-tech.co.uk/api/staff/getstaffbyid?password=ApiTest1066&id=" + this.state.assetId)
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    loading: false,
                    dataSource: responseJson
                })
            })
            .catch(error => console.log(error)) //to catch the errors if any
    }


    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                {/* <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}> */}
                {/* <Button
          title="Go to home"
          onPress={() => navigate('Home', {name: 'Jane'})}
        /> */}

                <View style={styles.skyBlue}></View>

                <View style={styles.imageWrapper}>
                    <Image style={styles.image}
                        source={{ uri: 'https://scontent-lht6-1.xx.fbcdn.net/v/t1.0-1/p40x40/23517478_328767537598470_8406965766959015695_n.jpg?_nc_cat=102&_nc_ht=scontent-lht6-1.xx&oh=8b14c5bdb88e92f79277e2d021481924&oe=5DC572B2' }} />
                    <Text style={styles.name}>{this.state.dataSource.FullName}</Text>
                </View>
                {/* <Text>{this.state.assetId}</Text>
            <Text>{this.state.dataSource.FirstName}</Text> */}

                <View style={styles.detailWrapper}>
                    <Text style={styles.detailHeader}>job title</Text>
                    <Text style={styles.detailItem}>{this.state.dataSource.JobTitle != '' ? this.state.dataSource.JobTitle : 'Not known'}</Text>
                </View>
                <View style={styles.detailWrapper}>
                    <Text style={styles.detailHeader}>home address</Text>
                    <Text style={styles.detailItem}>{this.state.dataSource.HomeAddress != '' ? this.state.dataSource.HomeAddress : 'Not known'}</Text>
                </View>
                <View style={styles.detailWrapper}>
                    <Text style={styles.detailHeader}>home phone</Text>
                    <Text style={styles.detailItem}>{this.state.dataSource.HomePhone != '' ? this.state.dataSource.HomePhone : 'Not known'}</Text>
                </View>
                <View style={styles.detailWrapper}>
                    <Text style={styles.detailHeader}>personal email</Text>
                    <Text style={styles.detailItem}>{this.state.dataSource.PersonalEmail != '' ? this.state.dataSource.PersonalEmail : 'Not known'}</Text>
                </View>
                <View style={styles.detailWrapper}>
                    <Text style={styles.detailHeader}>personal mobile</Text>
                    <Text style={styles.detailItem}>{this.state.dataSource.PersonalMobile != '' ? this.state.dataSource.PersonalMobile : 'Not known'}</Text>
                </View>
                <View style={styles.detailWrapper}>
                    <Text style={styles.detailHeader}>business unit</Text>
                    <Text style={styles.detailItem}>{this.state.dataSource.BusinessUnit != '' ? this.state.dataSource.BusinessUnit : 'Not known'}</Text>
                </View>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    detailWrapper: {
        height: 45,
        margin: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        // backgroundColor:'#eee'
    },
    detailHeader: {
        height: 20
        // backgroundColor:'red'
    },
    detailItem: {
        fontWeight: 'bold',
        height: 20,
        // backgroundColor:'blue'
    },
    skyBlue: {
        backgroundColor: 'skyblue',
        height: 100
    },
    imageWrapper: {
        alignItems: 'center',
        marginTop: -75,
        marginBottom: 10
    },
    image: {
        width: 150,
        height: 150,
        borderWidth: 5,
        borderColor: 'white',
        borderRadius: 75,
    },
    name: {
        fontSize: 25,
        color: 'grey',
    }
});

