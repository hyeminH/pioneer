import React, { Component } from 'react';
import {render} from 'react-dom';
import MapGL, {Marker, Popup} from 'react-map-gl';

import CityPin from './pin';
import CityInfo from './info';
import CITIES from './data/cities.json';

const TOKEN = 'pk.eyJ1Ijoic2hhbmUtcGlvbmVlciIsImEiOiJjampyN2YwZ3MzeGQxM3JteGh6YWM3Yjg5In0.joFZOIVkzx9ZVpX5B0BsZA';

const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 37.785164,
        longitude: -100,
        zoom: 3,
        bearing: 0,
        pitch: 0,
        width: 500,
        height: 500,
      },
      popupInfo: null,
      weather: null
    };
  }

  componentDidMount() {
    fetch('https://api.openweathermap.org/data/2.5/group?&appid=ced4626228f5dba00d573b3d5efbb5cc&id=5419396,5809844,5128638')
    .then(results => {
      return results.json();
    }).then(data => this.setState({weather: data}));
    window.addEventListener('resize', this._resize);
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  _resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: this.props.width || window.innerWidth,
        height: this.props.height || window.innerHeight
      }
    });
  };

  _renderCityMarker = (city, index) => {
    return (
      <Marker key={`marker-${index}`}
        longitude={city.longitude}
        latitude={city.latitude}>
        <CityPin size={20} onClick={() => this.setState({popupInfo: city})} />
      </Marker>
    );
  }

  _renderPopup() {
    const {popupInfo, weather} = this.state;
    return popupInfo && (
      <Popup tipSize={5}
        anchor="top"
        longitude={popupInfo.longitude}
        latitude={popupInfo.latitude}
        onClose={() => this.setState({popupInfo: null})} >
        <CityInfo info={popupInfo} currWeather={weather} />
      </Popup>
    );
  }

  render() {
    const {viewport} = this.state;
    return (
      <MapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/basic-v9"
        mapboxApiAccessToken={TOKEN}>
        { CITIES.map(this._renderCityMarker) }
        {this._renderPopup()}
      </MapGL>
    );
  }

}
