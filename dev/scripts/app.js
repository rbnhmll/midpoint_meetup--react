import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchForm from './components/search_form';
import ResultsMap from './components/results_map';
import Results from './components/results';
import SocialBox from './components/social_box';
import Modal from './components/modal';
import ModalToggle from './components/modal_toggle';

console.log('works!');

class App extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      show_modal: false,
      map: ""
    }

    this.setResults = this.setResults.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.displayVenues = this.displayVenues.bind(this);
  }

  render() {
    return (
      <div>
        <h1 className="animated bounceInDown">Let's Meet <span>Half</span>way!</h1>
        <SearchForm results={this.state.searchResults} setResults={this.setResults} displayVenues={this.displayVenues} />
        <ResultsMap results={this.state.results} map={this.state.map} />
        {
          this.state.results.length
            ? <Results results={this.state.results} />
            : null
        }
        <SocialBox />
        <ModalToggle toggleModal={this.toggleModal} />
        <Modal show_modal={this.state.show_modal} closeModal={this.closeModal} />
      </div>
    )
  }

  setResults(venueResult) {
    this.setState({results: venueResult});
    this.displayVenues();
  }

  toggleModal() {
    console.log("fire")
    if (!this.state.show_modal) {
      console.log("show modal")
      this.setState({show_modal: true});
    } else {
      console.log("hide modal")
      this.setState({show_modal: false});
    }
  }

  // Hide modal on click
  closeModal() {
    console.log("close modal")
    this.setState({ show_modal: false });
  }

  displayVenues() {
    L.Icon.Default.imagePath = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/images/"
    console.log(this.state.results)
    var self = this;
    this.state.results.forEach(function(result) {
      var v = result.venue;
      var address = v.location.formattedAddress[0];
      L.marker([v.location.lat, v.location.lng]).addTo(self.state.map).bindPopup(v.name + ":" + "<br>" + address);
    });
    this.state.map.setView([this.state.results[0].venue.location.lat, this.state.results[0].venue.location.lng], 15);
  }

  componentDidMount() {
    // Initialize mapbox
    var map = L.map('map').setView([43.65323,-79.38318
    ], 12);

    // Disable scrolling when hovering on map
    map.scrollWheelZoom.disable();

    // Some Mapbox specifics for on load [suplied by mapbox]
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        maxZoom: 18,
        id: 'rbnhmll.n1oca4ci',
        accessToken: "pk.eyJ1IjoicmJuaG1sbCIsImEiOiI3NjY4ZDk5NjFhMTYyMDMxMWFmMmM5YWEzMzlkMDgwZiJ9.Ep7u1zX_6SFI94jPki9O-w"
    }).addTo(map);
    
    this.setState({ map });
  }
}

ReactDOM.render(<App />, document.getElementById('app'));