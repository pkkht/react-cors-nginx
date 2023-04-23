import { FormEvent, Suspense, useState } from "react"
import WeatherOutput from "./WeatherOutput.js"
import Loading from "./Loading.js";
import { Button } from 'react-bootstrap';

function App() {

  const [city, setCity] = useState('');
  const [response, setResponse] = useState(null);

  const handleWeather = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTimeout(() => {
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '4645860cd7mshadf8a06cd38ddd3p19d798jsn2e650d3b2f6b',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
      };

      fetch('https://weatherapi-com.p.rapidapi.com/current.json?q=' + city, options)
        .then(response => response.json())
        .then(response => setResponse(response))
        .catch(err => console.error(err));
    }, 8000);

  }

  return (

    <>
      <Suspense fallback={<Loading />}>
        <form onSubmit={(e) => handleWeather(e)}>
          <div className="container py-4 px-3 mx-auto">
            <label htmlFor="city">City name</label>
            <input type="city" className="form-control" id="city" placeholder="Enter city" value={city} maxLength={25}
              onChange={e => { setCity(e.target.value.trim()); setResponse(null) }} />
            <div className="container py-4 px-3 mx-auto">
              <Button variant="outline-primary" type="submit">Submit</Button>
            </div>
          </div>
        </form>
        {
          response !== null &&
          <WeatherOutput response={response} />
        }
      </Suspense>
    </>
  )
}

export default App

