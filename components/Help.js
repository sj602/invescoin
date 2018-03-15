import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

export default class Help extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Modal isVisible={this.props.isVisible}>
          <View style={{ flex: 1 }}>
            <Text>Hello!</Text>
            <TouchableOpacity onPress={this._toggleModal}>
              <Text>Hide me!</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}
