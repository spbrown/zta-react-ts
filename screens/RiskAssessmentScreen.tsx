import React from 'react';
import { Button, Header, ListItem, withTheme } from 'react-native-elements';
import { FlatList, TouchableOpacity, SectionList, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
//import console = require('console');
import Moment from 'moment';
import { NavigationScreenProp } from 'react-navigation';
import RiskAssessment from '../interfaces/RiskAssessment';

interface RiskAssessmentScreenProps {
    navigation: NavigationScreenProp<any, any>
};

interface State {
    riskAssessment: RiskAssessment
};

export default class RiskAssessmentScreen extends React.Component<RiskAssessmentScreenProps, State>  {
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
                <Text style={styles.header}>This is where we show the detail of a Risk Assessment.</Text>
                <ScrollView>
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

                    <View style={styles.beforeWorkWrapper}>
                        <Text style={styles.beforeWorkHeader}>Are you aware of the site safety rules and fire procedures?</Text>
                        {/* <Text style={styles.detailItem}>{this.state.riskAssessment.question1 == null ? 'N/A' : this.state.riskAssessment.question1 ? 'Yes' : 'No'}</Text> */}
                        <Text style={GetBeforeWorkStyle(this.state.riskAssessment.questions[0])}>{GetBeforeWorkText(this.state.riskAssessment.questions[0])}</Text>
                    </View>
                    <View style={styles.beforeWorkWrapper}>
                        <Text style={styles.beforeWorkHeader}>Do you have the correct tools, equipment and PPE for the job?</Text>
                        {/* <Text style={styles.detailItem}>{this.state.riskAssessment.question2 == null ? 'N/A' : this.state.riskAssessment.question2 ? 'Yes' : 'No'}</Text> */}
                        <Text style={GetBeforeWorkStyle(this.state.riskAssessment.questions[1])}>{GetBeforeWorkText(this.state.riskAssessment.questions[2])}</Text>
                    </View>
                    <View style={styles.beforeWorkWrapper}>
                        <Text style={styles.beforeWorkHeader}>Are the method statement and permit details given correct?</Text>
                        {/* <Text style={styles.detailItem}>{this.state.riskAssessment.question3 == null ? 'N/A' : this.state.riskAssessment.question3 ? 'Yes' : 'No'}</Text> */}
                        <Text style={GetBeforeWorkStyle(this.state.riskAssessment.questions[2])}>{GetBeforeWorkText(this.state.riskAssessment.questions[2])}</Text>
                    </View>
                    <View style={styles.beforeWorkWrapper}>
                        <Text style={styles.beforeWorkHeader}>Are power tools and leads PAT tested?</Text>
                        {/* <Text style={styles.detailItem}>{this.state.riskAssessment.question4 == null ? 'N/A' : this.state.riskAssessment.question4 ? 'Yes' : 'No'}</Text> */}
                        <Text style={GetBeforeWorkStyle(this.state.riskAssessment.questions[3])}>{GetBeforeWorkText(this.state.riskAssessment.questions[3])}</Text>
                    </View>
                    <View style={styles.beforeWorkWrapper}>
                        <Text style={styles.beforeWorkHeader}>Is lifting gear and test equipment inspected/within calibration?</Text>
                        <Text style={GetBeforeWorkStyle(this.state.riskAssessment.questions[4])}>{GetBeforeWorkText(this.state.riskAssessment.questions[4])}</Text>
                    </View>
                </ScrollView>
            </View>

        );
    }
}

function GetBeforeWorkStyle(option) {

    if (option == null) {
        return styles.beforeWorkNotApplicable;
    }

    if (option) {
        return styles.beforeWorkYes;
    }
    else {
        return styles.beforeWorkNo;
    }
}

function GetBeforeWorkText(option) {

    if (option == null) {
        return 'N/A';
    }

    if (option) {
        return 'Yes';
    }
    else {
        return 'No';
    }
}

const styles = StyleSheet.create({

    beforeWorkHeader: {
        paddingRight: 10,
        width: '75%',
    },
    beforeWorkNotApplicable: {
        alignItems: 'center', // iOS only
        backgroundColor: 'orange',
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center', // Android only
        width: '25%',
    },
    beforeWorkYes: {
        alignItems: 'center', // iOS only
        backgroundColor: 'green',
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center', // Android only
        width: '25%',
    },
    beforeWorkNo: {
        alignItems: 'center', // iOS only
        backgroundColor: 'red',
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center', // Android only
        width: '25%',
    },
    beforeWorkWrapper: {
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        flexDirection: 'row',
        height: 45,
        margin: 10,
        paddingBottom: 10,
    },

    container: {
        flex: 1,
    },
    header: {
        backgroundColor: 'navy',
        color: 'orange',
        fontWeight: 'bold',
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
    },

});
