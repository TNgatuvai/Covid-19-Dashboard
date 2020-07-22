import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select } from "@material-ui/core";
import InfoBox from './InfoBox';
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');

  // USEEFFECT = Runs a piece of code based on a given condition // 
  useEffect(() => {
    // The code inside here will will run once when the component loads and not again //
    // async -> send a request, wait for it, do something with it

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country,
            value: country.countryInfo.iso2, 
          }));
    
        setCountries(countries);
      });
    };

    getCountriesData();
  }, []);   

  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  };

  return (
    <div className="App">
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined" onChange={onCountryChange} value={country}>
            {/* Loop through all the countries and show a drop down list of the options */}
            <MenuItem value="worldwide">worldwide</MenuItem>
            {countries.map(country => (
                <MenuItem value={country.value}>{country.name}</MenuItem>

              ))}
          </Select>
        </FormControl>
      </div>

      <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={123} total={2000} />
          <InfoBox title="Recovered" cases={123} total={2000} />
          <InfoBox title="Deaths" cases={123} total={2000} />

      </div>

    
      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;
