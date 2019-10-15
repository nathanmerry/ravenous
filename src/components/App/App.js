import React from "react";
import "./App.css";
import BusinessList from "../BusinessList/BusinessList";
import SearchBarContainer from "../SearchBar/SearchBar-container";
import MapContainer from "../GoogleMaps/GoogleMaps";
import Yelp from "../../util/Yelp";

let meeting = {
  hello: "hello"
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      header: "",
      regionLat: "",
      regionLon: "",
      searchClicked: false,
      businesessHoverId: false
    };
    this.searchYelp = this.searchYelp.bind(this);
    this.hoverMapOver = this.hoverMapOver.bind(this);
    this.hoverMapOut = this.hoverMapOut.bind(this)
    this.test = this.test.bind(this);
  }

  searchYelp(term, location, sortBy) {
    Yelp.search2(term, location, sortBy).then(item =>
      this.setState({
        businesses: item.businesses,
        header: "You searched for " + term + " in " + location,
        regionLat: item.region.latitude,
        regionLon: item.region.longitude,
        searchClicked: true
      })
    );
  }

  hoverMapOver(id) {
    this.setState({ businesessHoverId: id });

  }

  hoverMapOut(term) {
    this.setState({ businesessHoverId: "" });

  }


  test() {
    alert('hello')
  }

  render() {
    return (
      <div className="App">
        <h1 className="header-secondary">ravenous</h1>
        <SearchBarContainer searchYelp={this.searchYelp} test={this.test} />
        <a onMouseEnter={this.hoverMapOver} onMouseOut={this.hoverMapOut}>test</a>
        <div className="main">
          <div className="column-small">
            <div className="sticky">
              <MapContainer
                locations={this.state.businesses}
                lat={this.state.regionLat}
                lon={this.state.regionLon}
                search={this.state.searchClicked}
                businessHover={this.state.businesessHoverId}
              />
            </div>
          </div>
          <div class="column-large">
            <h2 className="header-Secondary">{this.state.header}</h2>
            <BusinessList
              hoverOver={this.hoverMapOver}
              hoverMapOut={this.hoverMapOut}
              theBusinesses={this.state.businesses}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
