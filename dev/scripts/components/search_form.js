import React, { Component } from 'react';
import Axios from 'axios';
import Turf from 'turf';

class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      yourLocation: "",
      friendLocation: "",
      venueType: "",
      centerPtResult: "",
      clientId: "RUPFMKH0N5PWTIS43LH20C1AWZCMSRJOF02L1Q0PBXEVXIR0",
      clientSecret: "YRFJZOCG0J3RAJCLGTTAPORHLNBHRNO0X0DSBTBRNA21HMFS",
      mapBoxKey: "pk.eyJ1IjoicmJuaG1sbCIsImEiOiI3NjY4ZDk5NjFhMTYyMDMxMWFmMmM5YWEzMzlkMDgwZiJ9.Ep7u1zX_6SFI94jPki9O-w"
    }

    this.getUserInputs = this.getUserInputs.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.convertToGeo = this.convertToGeo.bind(this);
    this.getGeocode = this.getGeocode.bind(this);
    this.getMidpoint = this.getMidpoint.bind(this);
    this.getVenues = this.getVenues.bind(this);
  }
  render() {
    return (
      <form className="submitForm" onSubmit={this.getUserInputs}>
        <div className="inputContainer">    
          <div className="input input1">
            <label htmlFor="yourLocation" className="locationLabel">Your Location</label>
            <input onChange={this.handleChange} value={this.state.yourLocation} type="text" name="yourLocation" className="yourLocation userInputField" placeholder="Your address (e.g. 100 Queen Street West, Toronto)" />
          </div>
          <div className="input input2">
            <label htmlFor="friendLocation" className="locationLabel">Friend's location</label>
            <input onChange={this.handleChange} value={this.state.friendLocation} type="text" name="friendLocation" className="friendLocation userInputField" placeholder="Friend's address (e.g. 1 Yonge Street, Toronto)" />
          </div>
        </div>
          <div className="button-container  animated fadeIn">
            <div className="chooserContainer">
              <input checked={this.state.venueType === 'coffee'} onChange={this.handleChange} id="coffeeRadio" type="radio" name="venueType" value="coffee" />
              <label htmlFor="coffeeRadio">Coffee</label>
              <input checked={this.state.venueType === 'beer'} onChange={this.handleChange} id="beerRadio" type="radio" name="venueType" value="beer" />
              <label htmlFor="beerRadio">Beer</label>
            </div>
            
            <input type="submit" value="Meet up!" name="meetUp" className="submitBtn" />
          </div>

        </form>
    )
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  getUserInputs(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.yourLocation == "" && this.state.friendLocation == "") {
      alert("Please fill in the two location fields!");
    }
    else if (this.state.yourLocation == "") {
      alert("Please fill in your location!");
    }
    else if (this.state.friendLocation == "") {
      alert("Please fill in your friend's location!");
    }
    else if ( this.state.venueType == ""  ) {
      alert("Please choose either Coffee or Beer!");
    }
    else {
      // $('html, body').animate({
      //     scrollTop: $("#map").offset().top
      // }, 800);
      // $(".resultsContainer").removeClass("hide").addClass("animated bounceInUp");
      this.convertToGeo();
      }
  };

  convertToGeo() {
    const userEntry1 = this.state.yourLocation.split(" ");
    const userEntry2 = this.state.friendLocation.split(" ");
    this.getGeocode(userEntry1, userEntry2);
  };

  getGeocode(userEntry1, userEntry2) {
    let self = this;

    function firstLocation() {
      return Axios.get(`https://api.mapbox.com/v4/geocode/mapbox.places/${userEntry1}.json?access_token=${self.state.mapBoxKey}`
        ).then(function(response) {
          return response;
        }).catch(function(error) {
          console.error(error);
          return error;
        });
    }

    function secondLocation() {
      return Axios.get(`https://api.mapbox.com/v4/geocode/mapbox.places/${userEntry2}.json?access_token=${self.state.mapBoxKey}`
        ).then(function(response) {
          return response;
        }).catch(function(error) {
          console.error(error);
          return error;
        });
    }

    Axios.all([firstLocation(), secondLocation()])
      .then(Axios.spread(function(res1,res2){
        const coords1 = res1.data.features[0].geometry.coordinates;
        const coords2 = res2.data.features[0].geometry.coordinates;
        // reverse the array order.
        coords1.reverse();
        coords2.reverse();
        self.getMidpoint(coords1,coords2);
    }));
  };

  getMidpoint(coords1,coords2) {
    const features = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Point",
            "coordinates": coords1
          }
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Point",
            "coordinates": coords2
          }
        }
      ]
    };
    const centerPt = Turf.center(features);
    let centerPtResult = centerPt.geometry.coordinates;
    
    centerPtResult = `${centerPtResult[0]},${centerPtResult[1]}`;
    this.setState({centerPtResult});
    this.getVenues();
  }

  getVenues() {
    var self = this;
    if (this.state.venueType === "coffee") {
      var sectionSelect = "coffee";
      var querySelect = "coffee";
    }
    else if (this.state.venueType === "beer") {
      var sectionSelect = "drinks";
      var querySelect = "beer";
    };

  //Foursquare API call
    Axios.get("https://api.foursquare.com/v2/venues/explore", {
      params: {
        ll: this.state.centerPtResult,
        client_id: this.state.clientId,
        client_secret: this.state.clientSecret,
        v: 20150722,
        radius: 3000,
        section: sectionSelect,
        openNow: 1,
        venuePhotos: 1,
        query: querySelect,
        limit: 6,
        sortByDistance: 1,
        format: "json"
      }
    }).then(function(res3) {
      var venueResult = res3.data.response.groups[0].items;
      self.showResults = true;
      self.props.setResults(venueResult);
      // self.props.displayVenues();
    }).catch(function(error) {
      console.error(error);
    });
  }
}

export default SearchForm;
