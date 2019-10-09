import React from "react";
import "./SearchBar.css";

class SearchBar2 extends React.Component {
  render() {
    return (
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>{this.props.renderSortByOptions}</ul>
        </div>
        <div className="SearchBar-fields-container">
          <div className="SearchBar-fields">
            <div className="SearchBar-field-left">
              <div className="SearchBar-submit">
                <a className="serach-btn-left">Find</a>

                <input
                  placeholder="Search your favourite restaurant or type of food"
                  onChange={this.props.handleTermChange}
                  onKeyUp={this.props.handleKeyPress}
                  type="text"
                />
              </div>
            </div>

            <div className="SearchBar-field-right">
              <div className="SearchBar-submit">
                <input
                  placeholder="Where"
                  onChange={this.props.handleLocationChange}
                  onKeyUp={this.props.handleKeyPress}
                  value={this.props.location}
                />

                {this.props.renderAutoCompletion}

                <a className="serach-btn-right" onClick={this.props.handleSearch}>
                  Go
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar2;
