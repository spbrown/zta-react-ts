import React from 'react';
import { Button, Header, ListItem, withTheme } from 'react-native-elements';
import { FlatList, TouchableOpacity, SectionList, StyleSheet, Text, View, Image } from 'react-native';
//import console = require('console');
import Moment from 'moment';

export default class RiskAssessmentScreen extends React.Component {
    static navigationOptions = {
        title: 'Risk Assessment'
    };

    constructor(props) {
        super(props);
        console.log(props);
        console.log(this.props.navigation.state.params.riskAssessment);

        this.state = {
            riskAssessment: this.props.navigation.state.params.riskAssessment
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>This is where we show the detail if a Risk Assessment.</Text>
                <View style={styles.detailWrapper}>
                    <Text style={styles.detailHeader}>location</Text>
                    <Text style={styles.detailItem}>{this.state.riskAssessment.location}</Text>
                </View>
                <View style={styles.detailWrapper}>
                    <Text style={styles.detailHeader}>task</Text>
                    <Text style={styles.detailItem}>{this.state.riskAssessment.task}</Text>
                </View>
                <View style={styles.detailWrapper}>
                    <Text style={styles.detailHeader}>q number</Text>
                    <Text style={styles.detailItem}>{this.state.riskAssessment.ref}</Text>
                </View>
                <View style={styles.detailWrapper}>
                    <Text style={styles.detailHeader}>created</Text>
                    <Text style={styles.detailItem}>{Moment(this.state.riskAssessment.created).format('DD/MM/YYYY HH:mm:ss')}</Text>
                </View>
                <View style={styles.detailWrapper}>
                    <Text style={styles.detailHeader}>submitted</Text>
                    <Text style={styles.detailItem}>{Moment(this.state.riskAssessment.submitted).format('DD/MM/YYYY HH:mm:ss')}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 12,
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
