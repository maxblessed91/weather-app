import React, { Component } from 'react';

import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyCvpz8i4gReY_PHw8W1A5w9dfSK8gUB1Jw");
Geocode.setLanguage("en");
Geocode.setRegion("ru");


export default class CityGeo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loc: null,
      loc1: null,
      loc1Str: null,
      isLoaded: false
    };
  }

  componentDidMount() {

    this.setState ({
      isLoaded: false
    })
    const getLocation = () => new Promise(
      (resolve, reject) => {
        window.navigator.geolocation.getCurrentPosition(
          position => {
            const location = {
              lat:position.coords.latitude,
              long:position.coords.longitude
            };
            resolve(location); // Resolve with location. location can now be accessed in the .then method.
          },
          err => reject(err) // Reject with err. err can now be accessed in the .catch method.
        );
      }
    );

    getLocation()
    .then(location => {
      let loc1 = Object.values(location);
      let latitude = String(loc1[0]);
      let longitude = String(loc1[1]);
      let city = '',
          cState = '',
          country = '';

      this.setState({
        loc1,
        latitude,
        longitude,
        city,
        cState,
        country
      })

      Geocode.fromLatLng(latitude, longitude).then(
        (response) => {
          for (let i = 0; i < response.results[0].address_components.length; i++) {
            for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
              switch (response.results[0].address_components[i].types[j]) {
                case "locality":
                  city = response.results[0].address_components[i].long_name;
                  break;
                case "administrative_area_level_1":
                  cState = response.results[0].address_components[i].long_name;
                  break;
                case "country":
                  country = response.results[0].address_components[i].long_name;
                  break;
              }
            }
          }
          this.setState ({
            isLoaded: true,
            city,
            cState,
            country
          })
        },
        (error) => {
          console.error(error);
        }
      )
    })
    .catch(error => console.log(error));

  }

  render() {

    const { city, cState, country } = this.state;
    return (
        <div>
          { this.state.isLoaded ? <p className='user-location'>{city}, {cState}, {country}</p> : <p></p> }
        </div>
    );
  }
}
