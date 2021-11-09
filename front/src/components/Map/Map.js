import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 49.10,
      lng: 6.12
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '50vh', width: '70%', display : 'flex', alignSelf: 'center' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyB4aTtY_--LaxDHIy26pU2b2LgRI6KBRQc" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={49.1049442}
            lng={6.1263661}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;