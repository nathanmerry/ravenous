import React from "react";
import "./BusinessList.css";
import Business from "../Business/Business";

class BusinessList extends React.Component {
  render() {
    return (
      <div className="BusinessList">
        {this.props.theBusinesses.map(business => (
          <Business
            hoverOver={this.props.hoverOver}
            hoverMapOut={this.props.hoverMapOut}
            key={business.id}
            business={business}
          />
        ))}
      </div>
    );
  }
}

export default BusinessList;
