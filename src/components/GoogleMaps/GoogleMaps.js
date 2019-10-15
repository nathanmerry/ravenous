import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import "./GoogleMaps.css";

const style = {
  width: "565px",
  height: "650px"
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      searchTrue: false
    };
    this.test = this.test.bind(this);
    this.renderComponent = this.renderComponent.bind(this);
  }

  setLocations() {
    return this.props.locations.map((item, index) => {
      const blueMarker =
        "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
      const yellowMarker =
        "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";

      let markerStyle = {
        color: item.id === this.props.businessHover ? yellowMarker : blueMarker,
        size:
          item.id === this.props.businessHover
            ? new this.props.google.maps.Size(50, 50)
            : new this.props.google.maps.Size(30, 30)
      };

      let InfoWindowHtml = (
        <div className="marker-container">
          <div className="marker-column">
            <img className="img-small" src={item.imageSrc} />
          </div>
          <div className="marker-column">
            <h4 className="header-small">{item.name}</h4>
            <div className="marker-row">
              <p>{item.address}</p>
              <p>
                {item.city} {item.zipCode}
              </p>
            </div>
            <div className="marker-row">
              <p className="strong">{item.category}</p>
              <p>
                {item.rating}
                <img className="img-star" src={require("../../star.png")}></img>
                {item.reviewCount} reviews
              </p>
            </div>
          </div>
        </div>
      );

      return (
        <Marker
          key={index}
          id={item.id}
          position={{
            lat: item.latitude,
            lng: item.longitude
          }}
          onClick={this.onMarkerClick}
          onMouseover={() => {
            return this.onMarkerClick;
          }}
          icon={{
            url: markerStyle.color,
            scaledSize: markerStyle.size
          }}
          name={InfoWindowHtml}
        />
      );
    });
  }

  test() {
    alert("hello");
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  renderComponent() {
    if (this.props.search === true) {
      return (
        <div className="map-container">
          <Map
            google={this.props.google}
            zoom={12}
            style={style}
            center={{ lat: this.props.lat, lng: this.props.lon }}
            initialCenter={{ lat: this.props.lat, lng: this.props.lon }}
          >
            {this.setLocations()}

            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
            >
              <div>
                <h4>{this.state.selectedPlace.name}</h4>
              </div>
            </InfoWindow>
          </Map>
        </div>
      );
    }
  }

  render() {
    return <div className="google-maps">{this.renderComponent()}</div>;
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyA9fGhDgZIQHN-JOKK2LnbWdWEzXQySsOc"
})(MapContainer);
