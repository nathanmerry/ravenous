import React from "react";
import "./Business.css";

class Business extends React.Component {
  render() {
    return (

      <div className="Business">
        <div className="image-container">
          <a
            className="item-links"
            href={this.props.business.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={this.props.business.imageSrc} alt="" />
          </a>
        </div>
        <a
          className="item-links"
          href={this.props.business.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>{this.props.business.name}</h2>
        </a>
        <div className="Business-information">
          <div className="Business-address">
            <a
              className="item-links"
              href={
                "http://www.google.com/maps/place/" +
                this.props.business.latitude +
                "," +
                this.props.business.longitude
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <p>{this.props.business.address}</p>
              <p>{this.props.business.city}</p>
              <p>
                {this.props.business.state} {this.props.business.zipCode}
              </p>
            </a>
          </div>
          <div className="Business-reviews">
            <h3>{this.props.business.category}</h3>
            <div>
              <h3 className="rating">{this.props.business.rating} stars</h3>
              <h3 className="rating">({this.props.business.reviewCount})</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Business;
