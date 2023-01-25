import { useEffect, useState } from 'react';
import './App.css';

function Weather() {

  const [searchWeather, setSearchWeather] = useState();
  const [searchCity, setSearchCity] = useState([]);
  const [data, setData] = useState();

  useEffect(() => {
    if (searchWeather) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchWeather}&appid=4899f968437a176c7964359daebaa732`).then(response => {
        console.log(response.status)
        if (response.status === 200) {
          return response.json()
        }
        throw new Error("Invalid City!!")

      }).then(data => setSearchCity([...searchCity, data])).catch(err => console.log(err))

    }
    else {
      console.log("Input city first!!");
      return
    }
  }, [searchWeather]);

  const weatherSearch = () => {
    setSearchWeather(data)
    setData("")
  }

  function deleteWeather(del) {
    const deleteCities = searchCity.filter((e, id) => {
      if (del !== id) {
        return true;
      };
    });
    setSearchCity(deleteCities);
  }


  return (
    <>
      <nav> CRUD Weather Application</nav>
      <main>
        <aside>
          <div>
            <button className='btn'>FetchWEather</button>
            <div>
              <select className='btn'>
                <option defaultValue hidden>City</option>
                {searchCity.map((city, idx) => {
                  return (
                    <option key={idx}>{city.name}</option>
                  )
                })
                }
              </select>
            </div>
          </div>
        </aside>

        <section>
          <div className='searchField'>
            <input type="search" value={data} className='input' placeholder='enter city' onChange={(e) => setData(e.target.value)} />
            <button className='search-btn' onClick={weatherSearch}>Search</button>
          </div>

          <table>
            <thead>
              <tr>
                <th>City</th>
                <th>Description</th>
                <th>Temparature(°C)</th>
                <th>Pressure</th>
                <th>Feels likes</th>
                <th></th>
              </tr>
            </thead>
          </table>
          {searchCity.length === 0 ? (
            <div>
              <p>No Data Found</p>
            </div>
          ) :
            (searchCity.map((item, index) => {
              return (
                <div className='data' key={index}>
                  <table>
                    <tr>
                      <td>{item.name}</td>
                      <td>{item.weather[0].description}</td>
                      <td>{item.main.temp} °C</td>
                      <td>{item.main.pressure}</td>
                      <td>{item.main.feels_like}</td>
                      <td>
                        <button className="delete-btn" onClick={() => deleteWeather(index)}>Remove</button></td>
                    </tr>
                  </table>

                </div>
              );
            })
            )}
        </section>
      </main>
    </>
  );
}

export default Weather;
