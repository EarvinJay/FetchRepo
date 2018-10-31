import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { View, Button, Text, TextInput, ListView, Image, TouchableOpacity, Linking } from "react-native";
import * as Progress from 'react-native-progress';
import { requestApiData } from "./actions";
import CheckBox from 'react-native-check-box'

let items = []
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
let value, dataSource = ds.cloneWithRows([]);

class RepoList extends React.Component {

  constructor() {
    super();

    this.state = {
    }
  }
  itemClick(url) {
    Linking.openURL(url);
  }

  render() {
    console.log(this.props);
    items = this.props.listItems;
    dataSource = ds.cloneWithRows(items);

    return (
      <View>
        {
          items.length > 0 ?
            <View>
              <Text style={{ alignSelf: 'center', fontSize: 20, padding: 10 }}>SELECTED ITEMS</Text>
              <ListView
                style={{ height: '100%' }}
                dataSource={dataSource}
                renderRow={(rowData) =>
                  <TouchableOpacity onPress={() => { this.itemClick(rowData.html_url) }}>
                    <View style={{ padding: 10, borderColor: 'gray', borderWidth: 1, marginBottom: 5, flex: 1, flexDirection: 'row' }}>
                      <Image
                        style={{ width: 50, height: 50, margin: 10 }}
                        source={{ uri: rowData.owner.avatar_url }} />
                      <View style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'stretch',
                      }}>
                        <Text>Name/Repository: {rowData.full_name}</Text>
                        <Text>Stars: {rowData.stargazers_count}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                }
              />
            </View>
            :
            <Text style={{ alignSelf: 'center', marginTop: '50%', fontSize: 20 }}>NO DATA</Text>
        }
      </View >
    );
  }
}

export default (RepoList);
