import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, TextField, Button, Grid, Box, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

const ByLanguage = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(false);
  const [allLanguages, setAllLanguages] = useState([]);
  const [openLanguagesDialog, setOpenLanguagesDialog] = useState(false);

  const fetchLanguage = async () => {
    if (!search) return;
    try {
      const res = await fetch(`https://restcountries.com/v3.1/lang/${search}`);
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

  const fetchAllLanguages = async () => {
    try {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const data = await res.json();
      const languages = new Set(data.flatMap(country => Object.values(country.languages || {})));
      setAllLanguages(Array.from(languages));
      setOpenLanguagesDialog(true);
    } catch (err) {
      console.error("Error fetching all languages:", err);
    }
  };

  return (
    <Grid container direction="column" alignItems="center" spacing={3} padding={3}>
      <Typography variant="h5" color="initial" padding={5}>En este apartado buscaras los idiomas de los diferentes paises, conociendo los idiomas que hablan en cada pais </Typography>
      <Grid item>
        <TextField
          label="Buscar lenguaje (ej. spanish, english)"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="contained" onClick={fetchLanguage} sx={{ ml: 2 }}>
          Buscar
        </Button>
        <Button variant="outlined" onClick={fetchAllLanguages} sx={{ ml: 2 }}>
          Consultar todos los lenguajes
        </Button>
      </Grid>

      {error && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" color="error">
            No se encontraron coincidencias. Prueba con nombres como "spanish", "english", "french".
          </Typography>
        </Box>
      )}

      <Grid container spacing={3} justifyContent="center" padding={5}>
        {countries.map((country) => {
          return (
            <Grid item key={country.cca3} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia component="img" height="140" image={country.flags.svg} alt={country.name.common} />
                <CardContent>

              <Typography variant="h4">{country.name.common}</Typography>
              <Typography variant="body1">Nombre oficial: {country.name.official}</Typography>
              <Typography variant="body1">Capital: {country.capital?.[0]}</Typography>
              <Typography variant="body1">Divisa: {Object.keys(country.currencies || {}).join(", ")} ({Object.values(country.currencies || {}).map(currency => currency.symbol).join(", ")})</Typography>
              <Typography variant="body1">Región: {country.region}</Typography>
              <Typography variant="body1">Idioma: {Object.values(country.languages || {}).join(", ")}</Typography>
              <Typography variant="body1">Población: {country.population.toLocaleString()}</Typography>
              <Link href={country.maps.googleMaps} target="_blank" rel="noopener">
                Ver en Google Maps
              </Link>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Dialog open={openLanguagesDialog} onClose={() => setOpenLanguagesDialog(false)}>
        <DialogTitle>Lenguajes de todos los países</DialogTitle>
        <DialogContent>
          <ul>
            {allLanguages.map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLanguagesDialog(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default ByLanguage;