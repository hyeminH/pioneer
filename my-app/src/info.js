import React, {PureComponent} from 'react';

export default class CityInfo extends PureComponent {

  render() {
    const {info, currWeather} = this.props;
    const displayName = `${info.city}`;

    let displayWeahter = "";
    let description = "";
    currWeather.list.forEach((element) => {
      if (element.id == info.id) {
        description = element.weather[0].description;
        let string1 ="";
        for (let property1 in element.main) {
          string1 += property1 + " : " + element.main[property1] + ", ";
        }
        displayWeahter = `${string1}`;
      }
    });

    return (
      <div className="popup-panel">
        <div>
          {displayName} | {`${description}`}
          <br></br>
          {displayWeahter} 
        </div>
      </div>
    );
  }
}