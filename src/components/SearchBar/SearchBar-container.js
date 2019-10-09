import React from "react";
import "./SearchBar.css";
import SearchBar2 from "./SearchBar-2.js";
//import Autocomplete from "../Autocomplete-search/autocomplete-search";

const cities = [
  "Bath",
  "Birmingham",
  "Bradford",
  "Brighton and Hove",
  "Bristol",
  "Cambridge",
  "Canterbury",
  "Carlisle",
  "Chester",
  "Chichester",
  "Coventry",
  "Derby",
  "Durham",
  "Ely",
  "Exeter",
  "Gloucester",
  "Hereford",
  "Kingston upon Hull",
  "Lancaster",
  "Leeds",
  "Leicester",
  "Lichfield",
  "Lincoln",
  "Liverpool",
  "The City of London",
  "Manchester",
  "Newcastle upon Tyne",
  "Norwich",
  "Nottingham",
  "Oxford",
  "Peterborough",
  "Plymouth",
  "Portsmouth",
  "Preston",
  "Ripon",
  "Salford",
  "Salisbury",
  "Sheffield",
  "Southampton",
  "St Albans",
  "Stoke-on-Trent",
  "Sunderland",
  "Truro",
  "Wakefield",
  "Wells",
  "Westminster",
  "Winchester",
  "Wolverhampton",
  "Worcester",
  "York"
];

class SearchBarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      term: "",
      location: "",
      sortBy: "best_match",
      locationAutoComp: [],
      currentLocation: "",
      header: ""
    };
    this.sortByOptions = {
      "Best Match": "best_match",
      "Highest Rated": "rating",
      "Most Reviewed": "review_count"
    };
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleAutoComplete = this.handleAutoComplete.bind(this);
    this.handleLocationSearch = this.handleLocationSearch.bind(this);
    this.renderAutoCompletion = this.renderAutoCompletion.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.showPosition = this.showPosition.bind(this);
    //this.renderLocationTitle = this.renderLocationTitle.bind(this)
    //this.test = this.test.bind(this);
  }

  getSortByClass(sortByOption) {
    if (this.state.sortBy === sortByOption) {
      return "active";
    } else {
      return "";
    }
  }

  handleSortByChange(sortByOptionValue) {
    this.setState(
      {
        sortBy: sortByOptionValue
      },
      () => {
        this.props.searchYelp(
          this.state.term,
          this.state.location,
          this.state.sortBy
        );
      }
    );
  }

  handleTermChange(event) {
    this.setState({
      term: event.target.value
    });
  }

  handleLocationSearch(event) {
    this.setState({
      location: event.target.value
    });
  }

  handleAutoComplete(arr, query) {
    const autoArr = arr.filter(item => {
      return item.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    this.setState({
      locationAutoComp: [autoArr]
    });

    return autoArr;
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        locationAutoComp: []
      });
    }
  }

  renderAutoCompletion(arr) {
    if (arr[0] === undefined) {
      console.log("hello");
    } else {
      if (this.state.location) {
        const listItems = arr[0].map(item => {
          const handleAutoLocationClick = () => {
            this.setState({
              location: item
            });
            this.setState({
              locationAutoComp: []
            });
          };

          return (
            <li
              onClick={handleAutoLocationClick}
              className="search-dropdown-item"
              key={item}
            >
              {item}
            </li>
          );
        });

        return (
          <ul className="SearchBar-dropdown" ref={this.setWrapperRef}>
            {listItems.slice(0, 10)}
          </ul>
        );
      }
    }
  }

  handleLocationChange(event) {
    this.handleLocationSearch(event);
    this.handleAutoComplete(cities, this.state.location);
  }

  handleSearch(event) {
    this.props.searchYelp(
      this.state.term,
      this.state.location,
      this.state.sortBy
    );
    event.preventDefault();
  }

  renderSortByOptions() {
    return Object.keys(this.sortByOptions).map(sortByOption => {
      let sortByOptionValue = this.sortByOptions[sortByOption];
      return (
        <li
          key={sortByOptionValue}
          className={this.getSortByClass(sortByOptionValue)}
          onClick={this.handleSortByChange.bind(this, sortByOptionValue)}
        >
          {sortByOption}
        </li>
      );
    });
  }

  handleKeyPress(e) {
    const handleSearchNoPv = () => {
      this.props.searchYelp(
        this.state.term,
        this.state.location,
        this.state.sortBy
      );
    };

    if (e.key === "Enter") {
      handleSearchNoPv();
    }
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    }
  }

  showPosition(position) {
    this.setState({
      currentLocation:
        "Latitude: " +
        position.coords.latitude +
        "<br>Longitude: " +
        position.coords.longitude
    });
  }

  render() {
    return (
      <div>
        <SearchBar2
          renderSortByOptions={this.renderSortByOptions()}
          handleTermChange={this.handleTermChange}
          handleKeyPress={this.handleKeyPress.bind(this)}
          location={this.state.location}
          renderAutoCompletion={this.renderAutoCompletion(
            this.state.locationAutoComp
          )}
          handleLocationChange={this.handleLocationChange}
          handleKeyPress={this.handleKeyPress.bind(this)}
          handleSearch={this.handleSearch}
        />
        <p>
          <br />
          {this.state.currentLocation}
        </p>
        {/* <button onClick={this.getLocation}>Display current location</button>
        <button onClick={this.renderLocationTitle}>o2wne</button> */}
      </div>
    );
  }
}

export default SearchBarContainer;
