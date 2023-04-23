import { FormEvent, Suspense, useState, lazy } from "react"
import Loading from "./Loading.js";
import { Button } from 'react-bootstrap';
import { ErrorBoundary } from "react-error-boundary";

const WeatherOutput = lazy(() => delayForDemo(import('./WeatherOutput.js')));


function App() {

  const [city, setCity] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState([]);

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
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          response.json().then((data) => {
            setError(data);
          });
        })
        .then(response => setResponse(response))
        .catch(err => setError(err));
    });

  }
  const fallbackRender = () => {
    console.log("error is:"+ error.keys);
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        {error.map(e => <div>{e}</div>)}
      </div>
    );
  }
  
  return (

    <>
    <ErrorBoundary fallbackRender={fallbackRender}>
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
      </ErrorBoundary>
    </>
  )
}

// Add a fixed delay so you can see the loading state
async function delayForDemo(promise: Promise<typeof import("./WeatherOutput.js")>) {
  await new Promise(resolve => {
    setTimeout(resolve, 5000);
  });
  return await promise;
}


export default App
