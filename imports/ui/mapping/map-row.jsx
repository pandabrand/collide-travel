import React, { Component } from 'react';

export default class MapRow extends Component {
  render() {
    return (
      <tr>
        <td><img src="http://lorempixel.com/100/100/fashion/1"/></td>
        <td key="{this.props.key}">{this.props.name}</td>
      </tr>
    );
  }
}
