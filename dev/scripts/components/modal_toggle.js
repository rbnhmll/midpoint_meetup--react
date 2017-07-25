import React, { Component } from 'react';

class ModalToggle extends Component {
  render() {
    return (
      <div onClick={this.props.toggleModal} className="show-button"><span className="fa fa-info"></span></div>
    )
  }
}

export default ModalToggle;