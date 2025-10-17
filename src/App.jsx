import { useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";

const key = "0e765b1db802c8961005905c1a0f1fc0";

function App() {
  const [weather, setWeather] = useState(``);
  const [coords, setCoords] = useState();
  const [temp, setTemp] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const success = (pos) => {
    setCoords({
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
    });
  };
  const error = (err) => {
    alert(
      `${err}, el usuario bloqueo el acceso a la ubicación. Por favor active el permiso para acceder a la página`
    );
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  useEffect(() => {
    if (coords) {
      const { lat, lon } = coords;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
      axios
        .get(url)
        .then((res) => {
          const kel = res.data.main.temp;
          const cel = (kel - 273.15).toFixed(2);
          const fah = ((cel * 9) / 5 + 32).toFixed(2);
          setTemp({ cel: cel, fah: fah });
          setWeather(res.data);
        })

        .catch((err) => console.log(err))
        .finally(() => {
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        });
    }
  }, [coords, inputValue]);

  const weatherByCity = (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
    axios
      .get(url)
      .then((answer) => {
        setWeather(answer.data);
      })
      .catch((err) => {
        alert("Ciudad no encontrada. Intente nuevamente.");
        console.log(err);
      });
  };

  const backgroundImgByWeather = () => {
    const weatherBackgrounds = {
      "01d":
        "url('https://th.bing.com/th/id/R.5c72d24fb1d31f573e3cd53ea975d5e1?rik=nXKTr6aYj22jTA&pid=ImgRaw&r=0')",
      "01n":
        "url('https://www.icegif.com/wp-content/uploads/2021/12/icegif-1536.gif')",
      "02d": "url('https://j.gifs.com/yalkdM.gif')",
      "02n":
        "url('https://i.pinimg.com/originals/9b/79/28/9b79286ed658af4ae17e844334110c90.gif')",
      "03d":
        "url('https://image.freepik.com/free-photo/scattered-clouds_1204-15.jpg?1')",
      "03n":
        "url('https://th.bing.com/th/id/R.8606720b38927112fc122e483d322199?rik=8hN%2bi1NhXjMp5w&riu=http%3a%2f%2f1.bp.blogspot.com%2f-vRR7jTonh7w%2fTyoLM45PPyI%2fAAAAAAAAKYc%2fBDi3-2-vp7Y%2fs400%2fMoonNightSkyClouds.gif&ehk=xtx60PrwuU5PkOy2PBQNzBNwLXYzPmhhXb51vaRKeF0%3d&risl=&pid=ImgRaw&r=0')",
      "04d":
        "url('https://media.tenor.com/CMVagqkcsZwAAAAd/moving-clouds-world-meteorological-day.gif')",
      "04n": "url('https://media.tenor.com/f5mKLXp4HtkAAAAC/clouds-night.gif')",
      "09d":
        "url('https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWRwcnd5aXNsZDJtY2U3NGhjcGR4dTE1NXo0Zm91ZWFtamJsYzNrMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oz8xVUm3mOvsSRqUg/giphy.gif')",
      "09n": "url('https://giffiles.alphacoders.com/303/3032.gif')",
      "10d":
        "url('https://th.bing.com/th/id/R.4671fdac6da02e62b212de637ccb387c?rik=PfK%2bORG7fjnqwA&pid=ImgRaw&r=0')",
      "10n":
        "url('https://cdn.pixabay.com/animation/2023/05/09/23/24/23-24-59-615_512.gif')",
      "11d":
        "url('https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHJnYXIxc2V6YzNzbGwzcDR1MDh0cTJnYTk5c3RxbDhrYTh1aG5teCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qRY3cPYRkyQh2/giphy.gif')",
      "11n":
        "url('https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHJnYXIxc2V6YzNzbGwzcDR1MDh0cTJnYTk5c3RxbDhrYTh1aG5teCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qRY3cPYRkyQh2/giphy.gif')",
      "13d":
        "url('https://th.bing.com/th/id/R.464e244648bde93605e0de6191e32341?rik=emWcLpnYj5P0SA&riu=http%3a%2f%2fclipart-library.com%2fimg%2f1922199.gif&ehk=R6X6HyHvsQSNihxH4UTHIm9EFWXAcRtX4dbLh%2fagSrk%3d&risl=&pid=ImgRaw&r=0')",
      "50d":
        "url('https://64.media.tumblr.com/55ab69e8654f7b40c0f6855c8ca22961/tumblr_omjk2lVUt31tliyzbo1_540.gif')",
    };

    const icon = weather?.weather?.[0]?.icon;
    return {
      backgroundImage: weatherBackgrounds[icon],
    };
  };

  console.log(weather);

  return (
    <div style={backgroundImgByWeather()} className="app">
      {isLoading ? (
        <figure className="app__loading">
          <img
            src="/assets/loading-gift/clouds-spinner-loading.gif"
            alt="Cargando..."
          />
        </figure>
      ) : (
        <WeatherCard
          weather={weather}
          temp={temp}
          inputValue={inputValue}
          setInputValue={setInputValue}
          onSearch={weatherByCity}
        />
      )}
    </div>
  );
}

export default App;
