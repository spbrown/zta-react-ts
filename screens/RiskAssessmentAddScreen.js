import React from 'react';
import { Button, Header, ListItem, withTheme } from 'react-native-elements';
import { AsyncStorage, FlatList, Picker, TouchableOpacity, SectionList, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import Moment from 'moment';
import AsyncStorageKeys from '../constants/AsyncStorageKeys';
import uuid from 'uuid/v1';
import { ScrollView } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';

const projects = [
    {
        label: 'Please select...',
        value: '',
    },
    {
        label: 'Q1231',
        value: 'Q1231',
    },
    {
        label: 'Q1232',
        value: 'Q1232',
    },
    {
        label: 'Q1233',
        value: 'Q1233',
    },
    {
        label: 'Q1234',
        value: 'Q1234',
    },
    {
        label: 'Q1236',
        value: 'Q1236',
    },
    {
        label: 'Q1237',
        value: 'Q1237',
    },
    {
        label: 'Q1238',
        value: 'Q1238',
    },
    {
        label: 'Q1239',
        value: 'Q1239',
    },
    {
        label: 'Q1240',
        value: 'Q1240',
    }
];

export default class RiskAssessmentAddScreen extends React.Component {
    static navigationOptions = {
        title: 'Add Risk Assessment'
    };

    constructor(props) {
        super(props);

        this.state = {
            text: 'hello',
            ref: '',
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
                    location: this.state.text,
                    created: new Date(),
                    ref: this.state.ref + ', AR20 Verifications Program - Verifications',
                    task: 'Annual Verification',
                    submitted: new Date(),
                });
                AsyncStorage.setItem(AsyncStorageKeys.riskAssessments, JSON.stringify(riskAssessments));
            }
            else {
                riskAssessments.push({
                    id: uuid(),
                    key: 'location0',
                    location: this.state.text,
                    created: new Date(),
                    ref: this.state.ref + ', AR20 Verifications Program - Verifications',
                    task: 'Annual Verification',
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
                {/* <View style={styles.detailWrapper}> */}
                {/* </View> */}

                <View>
                        <Text>Expiration date</Text>
                        <TextInput style={{flexGrow:1}}/>                  
                </View>


                <View style={styles.detailWrapper}>
                    <Text style={styles.detailHeader}>location</Text>
                    <TextInput
                        //style={styles.textInput}
                        onChangeText={(text) => this.setState({ text })}
                        value={this.state.text}
                    />
                </View>
                <View style={styles.detailWrapper}>
                    <Text style={styles.detailHeader}>Q Number</Text>
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
                    />
                </View>
                <View style={styles.detailWrapper}>
                </View>
                <TouchableOpacity
                    style={{ color: 'white', marginTop: 50, padding: 10, backgroundColor: 'blue' }}
                    onPress={this.handleSave}>
                    <Text style={{ color: 'white' }}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ color: 'white', marginTop: 50, padding: 10, backgroundColor: 'blue' }}
                    onPress={this.handleCancel}>
                    <Text style={{ color: 'white' }}>Cancel</Text>
                </TouchableOpacity>
                {/* <Button style={{ width: '50%' }} onPress={this.handleSave} title="Save" />
                <Button style={{ width: '50%' }} onPress={this.handleCancel} title="Cancel" /> */}
            </View>
        );
    }
}

function GetQNumber() {
    return 'Q' + ('0000' + Math.floor(Math.random() * 9999)).slice(-4);
}

const styles = StyleSheet.create({

    row: {
        flex: 1,
        flexDirection: "row"
    },
    inputWrap: {
        flex: 1,
        borderColor: "#cccccc",
        borderBottomWidth: 1,
        marginBottom: 10
    },
    inputdate: {
        fontSize: 14,
        marginBottom: -12,
        color: "#6a4595",
        flexGrow: 1
    },
    inputcvv: {
        fontSize: 14,
        marginBottom: -12,
        color: "#6a4595"
    },


    container: {
        flex: 1,
    },
    header: {
        padding: 12,
    },
    detailWrapper: {
        height: 60,
        margin: 10,
        //borderBottomWidth: 1,
        //borderBottomColor: '#ddd',
        // backgroundColor:'#eee'
    },
    detailHeader: {
        height: 30,
        //backgroundColor:'red'
    },
    detailItem: {
        fontWeight: 'bold',
        height: 30,
        //backgroundColor:'blue'
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
    inputContainer: {
        paddingTop: 15
    },
    textInput: {
        borderColor: '#CCCCCC',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        height: 50,
        fontSize: 25,
        paddingLeft: 20,
        paddingRight: 20
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        //borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'blue',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});