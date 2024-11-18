import React, { useState } from "react";
import axios from "axios";

const WeatherSearch = () => {
  const [city, setCity] = useState(""); // Nome da cidade
  const [weatherData, setWeatherData] = useState(null); // Dados meteorológicos
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const [error, setError] = useState(""); // Possíveis erros

  const apiKey = "c9db7926032f4cabe24a95f43bd7bdde";
  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    setWeatherData(null);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      setWeatherData(response.data);
    } catch (err) {
      setError("Cidade não encontrada ou erro ao buscar os dados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Pesquisa Meteorológica</h1>
      <div style={styles.form}>
        <input
          type="text"
          placeholder="Digite o nome da cidade"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={styles.input}
        />
        <button onClick={fetchWeather} style={styles.button}>
          Buscar
        </button>
      </div>

      {loading && <p>Carregando...</p>}

      {error && <p style={styles.error}>{error}</p>}

      {weatherData && (
        <div style={styles.weatherContainer}>
          <h2>{weatherData.name}</h2>
          <p>Temperatura: {weatherData.main.temp}°C</p>
          <p>Condição: {weatherData.weather[0].description}</p>
          <p>Umidade: {weatherData.main.humidity}%</p>
          <p>Velocidade do vento: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

// Estilos em JS para simplificar
const styles = {
  container: { textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif" },
  title: { fontSize: "2rem", marginBottom: "20px" },
  form: { display: "flex", justifyContent: "center", marginBottom: "20px" },
  input: { padding: "10px", fontSize: "16px", width: "300px", marginRight: "10px" },
  button: { padding: "10px 20px", fontSize: "16px", cursor: "pointer" },
  error: { color: "red", fontWeight: "bold" },
  weatherContainer: { marginTop: "20px", textAlign: "left", display: "inline-block" },
};

export default WeatherSearch;
