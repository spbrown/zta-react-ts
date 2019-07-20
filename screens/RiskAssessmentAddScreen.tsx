import React from 'react';

import { AsyncStorage, Dimensions, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button, CheckBox, Divider } from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select';
import { TabBar, TabView, SceneMap } from 'react-native-tab-view';
import { NavigationScreenProp } from 'react-navigation';

import RadioGroup from 'react-native-radio-buttons-group';

import uuid from 'uuid/v1';

import AsyncStorageKeys from '../constants/AsyncStorageKeys';
import RiskAssessment from '../interfaces/RiskAssessment'
import { string } from 'prop-types';

const projects = [
    {
        label: 'Please select...',
        value: '',
    },
    {
        label: 'Q2337 Project Planning Resources',
        value: 'Q2337 Project Planning Resources',
    },
    {
        label: 'Q2385 Kelda Procurement',
        value: 'Q2385 Kelda Procurement',
    },
    {
        label: 'Q2395 Kelda Business Development',
        value: 'Q2395 Kelda Business Development',
    },
    {
        label: 'Q2396 Data Collection and Collation Services',
        value: 'Q2396 Data Collection and Collation Services',
    },
    {
        label: 'Q2178 Meter verification and calibration at Tidworth',
        value: 'Q2178 Meter verification and calibration at Tidworth',
    },
    {
        label: 'Q2489 Magor Replacement Meter',
        value: 'Q2489 Magor Replacement Meter',
    },
    {
        label: 'Q2554 Verification of Desal Meters at Beckton',
        value: 'Q2554 Verification of Desal Meters at Beckton',
    },
    {
        label: 'Q2440 HSBC Maintenance',
        value: 'Q2440 HSBC Maintenance',
    },
    {
        label: 'Q2505 SW Logger Migration',
        value: 'Q2505 SW Logger Migration',
    },
    {
        label: 'Q2150 Walton Ultrasonics',
        value: 'Q2150 Walton Ultrasonics',
    },
    {
        label: 'Q2164 Walton - Temporary Metering',
        value: 'Q2164 Walton - Temporary Metering',
    },
    {
        label: 'Q2368 Maple Lodge - Commission 7 Flowmeters',
        value: 'Q2368 Maple Lodge - Commission 7 Flowmeters',
    },
    {
        label: 'Q2439 Repair to Flowmeter Transmitter',
        value: 'Q2439 Repair to Flowmeter Transmitter',
    },
    {
        label: 'Q2490 Waltham Abbey STW Temporary Flowmeter Install & Survey',
        value: 'Q2490 Waltham Abbey STW Temporary Flowmeter Install & Survey',
    },
    {
        label: 'Q2527 Flowmeter Investigation/Calibration Hampton AWTW',
        value: 'Q2527 Flowmeter Investigation/Calibration Hampton AWTW',
    },
    {
        label: 'Q2539 Flow and Pressure Measurement - Rainham WWTW',
        value: 'Q2539 Flow and Pressure Measurement - Rainham WWTW',
    }
    , {
        label: 'Q2564 Verification of 1400mm Full-Bore Flowmeter - TW - Honor Oak',
        value: 'Q2564 Verification of 1400mm Full-Bore Flowmeter - TW - Honor Oak',
    },
    {
        label: 'Q2565 Fault Investigation of ABB MagMaster Full-Bore Flowmeter - Bovindon Res',
        value: 'Q2565 Fault Investigation of ABB MagMaster Full-Bore Flowmeter - Bovindon Res',
    },
];

interface HomeScreenProps {
    navigation: NavigationScreenProp<any, any>
};

interface BeforeWorkQuestion {
    Question: string,
    Options: [
        { label: string, value: string, selected: boolean },
        { label: string, value: string, selected: boolean },
        { label: string, value: string, selected: boolean },
    ]
}

interface State {
    checkedNA: boolean,
    checkedNo: boolean,
    checkedYes: boolean,
    created: Date,
    id: number,
    key: string,
    location: string,
    ref: string,
    riskAssessments: Array<RiskAssessment>,
    submitted: Date,
    task: string,
    text: string,
    index: number,
    routes: Array<{ key: string, title: string }>,
    Question1: BeforeWorkQuestion,
    Question2: BeforeWorkQuestion,
    Question3: BeforeWorkQuestion,
    Question4: BeforeWorkQuestion,
    Question5: BeforeWorkQuestion,
}

export default class RiskAssessmentAddScreen extends React.Component<HomeScreenProps, State> {
    static navigationOptions = {
        title: 'Add Risk Assessment'
    };

    constructor(props) {
        super(props);

        this.state = {
            checkedNA: false,
            checkedNo: false,
            checkedYes: false,
            created: null,
            id: null,
            key: '',
            location: '',
            ref: '',
            riskAssessments: null,
            submitted: null,
            task: '',
            text: '',
            index: 0,
            routes: [
                { key: 'General', title: 'General' },
                { key: 'BeforeWork', title: 'Before Work' },
                { key: 'Hazards', title: 'Hazards' },
            ],
            Question1:
            {
                Question: 'Are you aware of the site safety rules and fire procedures?',
                Options: [
                    { label: 'Yes', value: 'yes', selected: false },
                    { label: 'No', value: 'no', selected: false },
                    { label: 'N/A', value: 'na', selected: true },]
            },
            Question2:
            {
                Question: 'Do you have the correct tools, equipment and PPE for the job?',
                Options: [
                    { label: 'Yes', value: 'yes', selected: false },
                    { label: 'No', value: 'no', selected: false },
                    { label: 'N/A', value: 'na', selected: true },]
            },
            Question3:
            {
                Question: 'Are the method statement and permit details given correct?',
                Options: [
                    { label: 'Yes', value: 'yes', selected: false },
                    { label: 'No', value: 'no', selected: false },
                    { label: 'N/A', value: 'na', selected: true },]
            },
            Question4:
            {
                Question: 'Are power tools and leads PAT tested?',
                Options: [
                    { label: 'Yes', value: 'yes', selected: false },
                    { label: 'No', value: 'no', selected: false },
                    { label: 'N/A', value: 'na', selected: true },]
            },
            Question5:
            {
                Question: 'Is lifting gear and test equipment inspected/within calibration?',
                Options: [
                    { label: 'Yes', value: 'yes', selected: false },
                    { label: 'No', value: 'no', selected: false },
                    { label: 'N/A', value: 'na', selected: true },]
            }
        };
    }

    componentDidMount() {
    }

    handleCancel = () => {
        console.log('cancel');
        this.props.navigation.goBack();
    }

    handleSave = () => {
        console.log('save');
        this.saveSettings(this.state);
        this.props.navigation.goBack();
    }

    saveSettings = (settings) => {

        var riskAssessments = Array<RiskAssessment>();

        AsyncStorage.getItem(AsyncStorageKeys.riskAssessments, (error, result) => {
            console.log(result);
            if (result != null) {
                console.log('has data');
                riskAssessments = JSON.parse(result);
                console.log(riskAssessments);
                riskAssessments.push({
                    created: new Date(),
                    id: uuid(),
                    key: 'location' + riskAssessments.length,
                    location: this.state.text,
                    ref: this.state.ref,
                    submitted: new Date(),
                    task: this.state.task,
                    question1: false,
                    question2: true,
                    question3: null,
                    question4: true,
                    question5: false,
                });
                AsyncStorage.setItem(AsyncStorageKeys.riskAssessments, JSON.stringify(riskAssessments));
            }
            else {
                riskAssessments.push({
                    created: new Date(),
                    id: uuid(),
                    key: 'location0',
                    location: this.state.text,
                    ref: this.state.ref + ', AR20 Verifications Program - Verifications',
                    submitted: new Date(),
                    task: this.state.task,
                    question1: false,
                    question2: true,
                    question3: null,
                    question4: true,
                    question5: false,
                })
                AsyncStorage.setItem(AsyncStorageKeys.riskAssessments, JSON.stringify(riskAssessments));
            }

            //console.log(JSON.parse(result));
            this.setState({ riskAssessments: riskAssessments });

        });

    }

    renderTabGeneral = () => {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Enter general information for this Risk Assessment</Text>
                <View style={styles.rows}>
                    <View style={styles.row}>
                        <Text style={styles.textLabel}>Location</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter location here"
                            onChangeText={(text) => this.setState({ text })}
                            value={this.state.text}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.textLabel}>Task</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter task here"
                            onChangeText={(task) => this.setState({ task })}
                            value={this.state.task}
                        />
                    </View>
                    <View style={styles.row4}>
                        <Text style={styles.textLabel}>Q Number</Text>
                        <RNPickerSelect
                            placeholder={{}}
                            items={projects}
                            onValueChange={value => {
                                this.setState({
                                    ref: value,
                                });
                            }}
                            style={pickerSelectStyles}
                            value={this.state.ref}
                            useNativeAndroidPickerStyle={false}
                        />
                    </View>
                </View>
                <View style={styles.row3}>
                    <View style={styles.inputWrap}>
                        <Button title="Save" onPress={this.handleSave} />
                    </View>
                    <View style={styles.inputWrap}>
                        <Button title="Cancel" onPress={this.handleCancel} />
                    </View>
                </View>
            </View>
        );
    }

    onPress = (data) => {
        console.log('onPress()')
        console.log(data.e)
        let selectedButton = data.find(e => e.selected == true);
        console.log(selectedButton);
    }

    renderTabBeforeWork = () => {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Before you start work, please answer these</Text>
                <ScrollView>
                <View style={styles.rows}>

                    <Text style={styles.textLabel2}>{this.state.Question1.Question}</Text>
                    <View style={styles.row2}>
                        <RadioGroup
                            radioButtons={this.state.Question1.Options}
                            onPress={this.onPress}
                            flexDirection='row'
                        />
                    </View>
                    <Divider />
                    <Text style={styles.textLabel2}>{this.state.Question2.Question}</Text>
                    <View style={styles.row2}>
                        <RadioGroup
                            radioButtons={this.state.Question2.Options}
                            onPress={this.onPress}
                            flexDirection='row'
                        />
                    </View>
                    <Divider />
                    <Text style={styles.textLabel2}>{this.state.Question3.Question}</Text>
                    <View style={styles.row2}>
                        <RadioGroup
                            radioButtons={this.state.Question3.Options}
                            onPress={this.onPress}
                            flexDirection='row'
                        />
                    </View>
                    <Divider />
                    <Text style={styles.textLabel2}>{this.state.Question4.Question}</Text>
                    <View style={styles.row2}>
                        <RadioGroup
                            radioButtons={this.state.Question4.Options}
                            onPress={this.onPress}
                            flexDirection='row'
                        />
                    </View>
                    <Divider />
                    <Text style={styles.textLabel2}>{this.state.Question5.Question}</Text>
                    <View style={styles.row2}>
                        <RadioGroup
                            radioButtons={this.state.Question5.Options}
                            onPress={this.onPress}
                            flexDirection='row'
                        />
                    </View>
                    <Divider />
                </View>
                </ScrollView>
            </View>
        );
    }

    renderTabHazards = () => {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Add hazards here</Text>
                <Text>Hazard</Text>
                <Text>Prob before</Text>
                <Text>Severity before</Text>
                <Text>Resultant risk before</Text>
                <Text>Controls</Text>
                <Text>Prob after</Text>
                <Text>Severity after</Text>
                <Text>Resultant risk after</Text>
            </View>
        );
    }

    render() {
        return (

            <TabView

                renderTabBar={props =>
                    <TabBar
                        {...props}
                        indicatorStyle={{ backgroundColor: 'orange' }}
                        style={{ backgroundColor: 'white' }}
                        renderLabel={({ route }) => (
                            <Text style={{ color: 'grey', fontWeight: 'bold', margin: 8 }}>
                                {route.title}
                            </Text>
                        )}
                    />
                }

                navigationState={this.state}
                renderScene={({ route }) => {
                    switch (route.key) {
                        case 'General':
                            return this.renderTabGeneral();
                        case 'BeforeWork':
                            return this.renderTabBeforeWork();
                        case 'Hazards':
                            return this.renderTabHazards();
                        default:
                            return null;
                    }
                }}
                onIndexChange={index => this.setState({ index })}
                initialLayout={{ height: 25, width: Dimensions.get('window').width }}
            />

        );
    }
}

function GetQNumber() {
    return 'Q' + ('0000' + Math.floor(Math.random() * 9999)).slice(-4);
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    divider: {
        marginTop: 5,
        marginBottom: 10,
    },
    header: {
        backgroundColor: 'navy',
        color: 'orange',
        fontWeight: 'bold',
        padding: 12,
    },
    rows: {
        flex: 1,
        height: 100,
    },
    row: {
        flexDirection: "row",
        height: 30,
        padding: 10,
        // borderWidth: 1,
        // borderColor: '#ccc',
    },
    row2: {
        flexDirection: "row",
    },
    row3: {
        flexDirection: "row",
        padding: 10,
    },
    row4: {
        flexDirection: "row",
        padding: 10,
    },
    inputWrap: {
        flex: 1,
        margin: 5
    },
    textLabel: {
        fontWeight: 'bold',
        paddingTop: 9,
        width: 100,
        height: 35,
    },
    textLabel2: {
        fontWeight: 'bold',
        padding: 10,
        paddingTop: 8,
    },
    textInput: {
        flex: 1,
        // borderWidth: 1,
        // borderColor: '#ccc',
        height: 35,
        padding: 0,
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        paddingVertical: 9,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        paddingRight: 50, // to ensure the text is never behind the icon
        paddingTop: 4,
    },
});