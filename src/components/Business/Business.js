import React from "react";
import "./Business.css";

class Business extends React.Component {
  render() {
    return (
      <div
        onMouseOver={() => this.props.hoverOver(this.props.business.id)}
        onMouseOut={this.props.hoverMapOut}
        className="Business"
      >
        {/* <button onMouseOut={this.props.test}>test</button> */}
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
              <h3 className="rating">
                {this.props.business.rating}{" "}
                <img className="img-star" src={require("../../star.png")}></img>
                <span className="font-normal">
                  ({this.props.business.reviewCount})
                </span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Business;
