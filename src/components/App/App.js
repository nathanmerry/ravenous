import React from "react";
import "./App.css";

import BusinessList from "../BusinessList/BusinessList";

import SearchBarContainer from "../SearchBar/SearchBar-container";

import Yelp from "../../util/Yelp";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      header: ""
    };
    this.searchYelp = this.searchYelp.bind(this);
  }

  searchYelp(term, location, sortBy) {
    Yelp.search(term, location, sortBy).then(businesses =>
      this.setState({ businesses: businesses })
    );
    this.setState({
      header: "You searched for " + term + " in " + location
    });
  }

  render() {
    return (
      <div className="App">
        <h1 className="header-secondary">ravenous</h1>
        <SearchBarContainer searchYelp={this.searchYelp} />
        <h2 className="header-Secondary">{this.state.header}</h2>{" "}
        <BusinessList theBusinesses={this.state.businesses} />
      </div>
    );
  }
}

export default App;
