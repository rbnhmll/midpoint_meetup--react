import React, { Component } from 'react';

class Modal extends Component {
  constructor() {
    super();
    console.log(this)
  }
  render() {
    if(!this.props.show_modal) {
      return null;
    }
    return (
      <div className="modal-container show">
        <div className="overlay"></div>
        <div className="modal">
          <button onClick={this.props.closeModal} className="close-button"><i className="fa fa-times"></i></button>
          <p>Find a mutual meet-up spot for you and your friend, halfway between your two locations using Midpoint Meetup!</p>
          <p>Simply enter the addresses of you and your friend, choose if you want to meet up for coffee or beers, and hit the Meet Up button.</p>
          <p>Through the wonders of the internet, a midpoint will be calculated, and local results will appear.</p>
          <h5>Created by <a href="http://robinhamill.com">Robin Hamill</a> using the Mapbox &amp; Foursquare APIs</h5>
        </div>
      </div>
    )
  }

  componentDidMount() {
    // Hide modal on Esc
    var self = this;
    document.addEventListener("keydown", function(e) {
      if (e.keyCode == 27) {
        self.props.closeModal();
      }
    });
  }
}

export default Modal;