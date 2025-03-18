import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, TextField, Button, Grid, Box, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

const ByCurrency = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(false);
  const [allCurrencies, setAllCurrencies] = useState([]);
  const [openCurrenciesDialog, setOpenCurrenciesDialog] = useState(false);

  const fetchCurrency = async () => {
    if (!search) return;
    try {
      const res = await fetch(`https://restcountries.com/v3.1/currency/${search}`);
      const data = await res.json();
      if (data.status === 404 || data.length === 0) {
        setError(true);
        setCountries([]);
      } else {
        setCountries(data);
        setError(false);
      }
    } catch (err) {
      setError(true);
      setCountries([err]);
    }
  };

  const fetchAllCurrencies = async () => {
    try {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const data = await res.json();
      const currencies = new Set(data.flatMap(country => Object.keys(country.currencies || {})));
      setAllCurrencies(Array.from(currencies).map(currency => ({
        code: currency,
        name: data.find(country => country.currencies && country.currencies[currency])?.currencies[currency]?.name || ''
      })));
      setOpenCurrenciesDialog(true);
    } catch (err) {
      console.error("Error fetching all currencies:", err);
    }
  };

  return (
    <Grid container direction="column" alignItems="center" spacing={3} padding={3}>
      <Typography variant="h5" color="initial" padding={3}>En este apartado buscaras las divisas de los diferentes paises, conociendo sus diferentes tipos de cambio </Typography>
      <Grid item>
        <TextField
          label="Buscar divisa (ej. usd, eur)"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="contained" onClick={fetchCurrency} sx={{ ml: 2 }}>
          Buscar
        </Button>
        <Button variant="outlined" onClick={fetchAllCurrencies} sx={{ ml: 2 }}>
          Consultar todas las divisas
        </Button>
      </Grid>

      {error && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" color="error">
            No se encontraron coincidencias. Prueba con códigos como "usd", "eur", "jpy".
          </Typography>
        </Box>
      )}

      <Grid container spacing={3} justifyContent="center" padding={5}>
        {countries.map((country) => {
          const currencyKey = Object.keys(country.currencies || {})[0];
          return (
            <Grid item key={country.cca3} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia component="img" height="140" image={country.flags.svg} alt={country.name.common} />
                <CardContent>
                  <Typography variant="h6">{country.name.common}</Typography>
                  <Typography variant="body2">
                    Divisa: {currencyKey} ({country.currencies[currencyKey]?.symbol})
                  </Typography>
                  <Typography variant="body2">Nombre oficial: {country.name.official}</Typography>
                  <Typography variant="body2">Capital: {country.capital?.[0]}</Typography>
                  <Typography variant="body2">Región: {country.region}</Typography>
                  <Typography variant="body2">Idioma: {Object.values(country.languages || {}).join(", ")}</Typography>
                  <Typography variant="body2">Población: {country.population.toLocaleString()}</Typography>
                  <Link href={country.maps.googleMaps} target="_blank" rel="noopener">
                Ver en Google Maps
              </Link>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Dialog open={openCurrenciesDialog} onClose={() => setOpenCurrenciesDialog(false)}>
        <DialogTitle>Divisas de todos los países</DialogTitle>
        <DialogContent>
          <ul>
            {allCurrencies.map((currency, index) => (
              <li key={index}>{currency.code} - {currency.name}</li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCurrenciesDialog(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default ByCurrency;