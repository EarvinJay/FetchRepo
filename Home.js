import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { View, Button, Text, TextInput, ListView, Image, TouchableOpacity, Alert } from "react-native";
import * as Progress from 'react-native-progress';
import { requestApiData } from "./actions";
import CheckBox from 'react-native-check-box'
import { Actions } from 'react-native-router-flux';

var check_items = [], checked_data = [], itemData = [];
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
let value, dataSource = ds.cloneWithRows([]), totalStars = 0;

class Home extends React.Component {

  constructor() {
    super();

    this.state = {
      text: '',
      checkInput: false,
      totalStars: 0,
      indeterminate: false,
      checked: []
    }
  }

  componentWillReceiveProps(props) {
    if (typeof props.data.items === 'undefined') {
      this.setState({ indeterminate: false });
    }
    else {
      itemData = props.data.items;
      props.data.items.forEach((folder) => {
        check_items.push(false)
      })
      this.setState({
        checked: check_items
      })
    }
  }

  handleChange(i) {
    this.setState({ text: i })
    if (/[A-Z]/.test(i)) {
      this.setState({ checkInput: true });
    }
    else {
      this.setState({ indeterminate: true, checkInput: false });
      value = i
      this.props.requestApiData();
    }
  }

  handleCheckChange(index, rowData) {
    this.setState({
      checked: !this.state.checked
    })
    if (check_items[index] == false) {
      check_items[index] = true
      checked_data.push(rowData);
      totalStars = totalStars + parseInt(rowData.stargazers_count)
      this.setState({
        checked: check_items,
        totalStars: totalStars
      })
    } else {
      check_items[index] = false;
      totalStars = totalStars - parseInt(rowData.stargazers_count)
      checked_data = checked_data.filter(item => item !== rowData);
      this.setState({
        checked: check_items,
        totalStars: totalStars
      })
    }
  }

  handleClick() {
    Actions.repolist({ listItems: checked_data });
  }

  triggerAlert(rowData, index) {
    Alert.alert(
      'Alert',
      'Delete this item?',
      [
        { text: 'Cancel', onPress: () => { }, style: 'cancel' },
        {
          text: 'OK', onPress: () => {
          }
        },
      ],
      { cancelable: false }
    )
  }

  render() {
    const { items = [] } = this.props.data;
    dataSource = ds.cloneWithRows(items);

    return (
      <View>
        <TextInput
          placeholder={'Search'}
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(text) => this.handleChange(text)}
          value={this.state.text}
        />
        {
          this.state.checkInput === true ?
            <Text style={{ color: 'red' }}>Input must not contain UpperCase Letters</Text> :
            <Text />
        }

        {
          items.length > 0 ?
            <ListView
              style={{ height: '78%' }}
              dataSource={dataSource}
              renderRow={(rowData, rowID, index) =>
                <TouchableOpacity onPress={() => { this.triggerAlert(rowData, index) }}>
                  <View style={{ padding: 10, borderColor: 'gray', borderWidth: 1, marginBottom: 5, flex: 1, flexDirection: 'row' }}>
                    <Image
                      style={{ width: 50, height: 50, margin: 10 }}
                      source={{ uri: rowData.owner.avatar_url }} />
                    <View style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'stretch',
                    }}>
                      <CheckBox
                        style={{ height: 20, width: 20 }}
                        onClick={() => { this.handleCheckChange(index, rowData); }}
                        isChecked={this.state.checked[index]}
                      />
                      <Text>Name/Repository: {rowData.full_name}</Text>
                      <Text>Stars: {rowData.stargazers_count}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              }
            />
            :
            <Progress.Bar style={{ alignSelf: 'center', marginBottom: 10 }} width={200} indeterminate={this.state.indeterminate} />
        }

        <Text style={{ padding: 10, fontWeight: 'bold', backgroundColor: 'yellow' }}>TOTAL STARS: {this.state.totalStars}</Text>

        <Button
          onPress={this.handleClick}
          title="PROCEED"
          color="#4286f4" />

      </View >
    );
  }
}

export function inputValue() {
  return value;
}

const mapStateToProps = state => ({ data: state.data });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestApiData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
