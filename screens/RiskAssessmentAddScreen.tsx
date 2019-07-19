import React from 'react';

import { AsyncStorage, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button, CheckBox, Divider } from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select';
import { NavigationScreenProp } from 'react-navigation';

import uuid from 'uuid/v1';

import AsyncStorageKeys from '../constants/AsyncStorageKeys';
import RiskAssessment from '../interfaces/RiskAssessment'

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
                    id: uuid(),
                    key: 'location' + riskAssessments.length,
                    text: '',
                    location: this.state.text,
                    created: new Date(),
                    ref: this.state.ref,
                    task: this.state.task,
                    submitted: new Date(),
                });
                AsyncStorage.setItem(AsyncStorageKeys.riskAssessments, JSON.stringify(riskAssessments));
            }
            else {
                riskAssessments.push({
                    id: uuid(),
                    key: 'location0',
                    location: this.state.text,
                    text: '',
                    created: new Date(),
                    ref: this.state.ref + ', AR20 Verifications Program - Verifications',
                    task: this.state.task,
                    submitted: new Date(),
                })
                AsyncStorage.setItem(AsyncStorageKeys.riskAssessments, JSON.stringify(riskAssessments));
            }

            //console.log(JSON.parse(result));
            this.setState({ riskAssessments: riskAssessments });

        });

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>This is where we add a new Risk Assessment.</Text>
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

                    <Divider style={styles.divider} />
                    <Text style={styles.textLabel2}>Are you aware of the site safety rules and fire procedures?</Text>
                    <View style={styles.row2}>
                        <CheckBox title='Yes' checked={this.state.checkedYes} onPress={() => this.setState({ checkedYes: !this.state.checkedYes })} />
                        <CheckBox title='No' checked={this.state.checkedNo} onPress={() => this.setState({ checkedNo: !this.state.checkedNo })} />
                        <CheckBox title='N/A' checked={this.state.checkedNA} onPress={() => this.setState({ checkedNA: !this.state.checkedNA })} />
                    </View>
                    <Text style={styles.textLabel2}>Do you have the correct tools, equipment and PPE for the job?</Text>
                    <View style={styles.row2}>
                        <CheckBox checked={false} title='Yes' />
                        <CheckBox checked={false} title='No' />
                        <CheckBox checked={false} title='N/A' />
                    </View>
                    <Text style={styles.textLabel2}>Are the method statement and permit details given correct?</Text>
                    <View style={styles.row2}>
                        <CheckBox checked={false} title='Yes' />
                        <CheckBox checked={false} title='No' />
                        <CheckBox checked={false} title='N/A' />
                    </View>
                    {/* <Text style={styles.textLabel2}>Are power tools and leads PAT tested?</Text>
                    <View style={styles.row2}>
                        <CheckBox title='Yes' />
                        <CheckBox title='No' />
                        <CheckBox title='N/A' />
                    </View>
                    <Text style={styles.textLabel2}>Is lifting gear and test equipment inspected/within calibration?</Text>
                    <View style={styles.row2}>
                        <CheckBox title='Yes' />
                        <CheckBox title='No' />
                        <CheckBox title='N/A' />
                    </View> */}
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