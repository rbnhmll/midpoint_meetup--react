import React, { Component } from 'react';

class SocialBox extends Component {
  render() {
    return (
      <div className="social-box">
        <a href="https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Flocalhost%3A8000%2F&amp;ref_src=twsrc%5Etfw&amp;text=Find%20a%20mutual%20meet-up%20spot%20for%20you%20%26%20a%20friend%20using%20Midpoint%20Meetup!%20%2F%2F&amp;tw_p=tweetbutton&amp;url=http%3A%2F%2Fmidpointmeetup.com&amp;via=rbnhmll" className="twitter-btn" id="b"><i className="fa fa-twitter"></i><span className="label" id="l">Tweet</span></a>
      </div>
    )
  }

  componentDidMount() {
    twttr.widgets.load()
  }
}

export default SocialBox;