import { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const ByName = () => {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(false);
  const [allCountries, setAllCountries] = useState([]);
  const [openCountriesDialog, setOpenCountriesDialog] = useState(false);
  const fetchCountry = async () => {
    if (!search) return;
    try {
      const res = await fetch(`https://restcountries.com/v3.1/name/${search}`);
      const data = await res.json();
      if (data.status === 404) {
        setError(true);
        setCountry(null);
      } else {
        setCountry(data[0]);
        setError(false);
      }
    } catch (err) {
      setError(true);
      setCountry([err]);
    }
  };

  const fetchAllCountries = async () => {
    try {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const data = await res.json();
      setAllCountries(data.map((country) => country.name.common));
      setOpenCountriesDialog(true);
    } catch (err) {
      console.error("Error fetching all countries:", err);
    }
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      spacing={3}
      padding={8}
    >
      <Typography variant="h5" color="initial">
        En este apartado buscaras a los paises, conociendo diferentes datos
        interesantes{" "}
      </Typography>
      <Grid item>
        <TextField
          label="Buscar país"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="contained" onClick={fetchCountry} sx={{ ml: 2 }}>
          Buscar
        </Button>
        <Button variant="outlined" onClick={fetchAllCountries} sx={{ ml: 2 }}>
          Consultar nombres de todos los países
        </Button>
      </Grid>

      {error && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" color="error">
            No se encontraron coincidencias. Prueba con nombres como "Spain",
            "France" o "Mexico".
          </Typography>
        </Box>
      )}

      {country && (
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={country.flags.svg}
              alt={country.name.common}
            />
            <CardContent>
              <Typography variant="h4">{country.name.common}</Typography>
              <Typography variant="body1">
                Nombre oficial: {country.name.official}
              </Typography>
              <Typography variant="body1">
                Capital: {country.capital?.[0]}
              </Typography>
              <Typography variant="body1">
                Divisa: {Object.keys(country.currencies || {}).join(", ")} (
                {Object.values(country.currencies || {})
                  .map((currency) => currency.symbol)
                  .join(", ")}
                )
              </Typography>
              <Typography variant="body1">Región: {country.region}</Typography>
              <Typography variant="body1">
                Idioma: {Object.values(country.languages || {}).join(", ")}
              </Typography>
              <Typography variant="body1">
                Población: {country.population.toLocaleString()}
              </Typography>
              <Link
                href={country.maps.googleMaps}
                target="_blank"
                rel="noopener"
              >
                Ver en Google Maps
              </Link>
            </CardContent>
          </Card>
        </Grid>
      )}

      <Dialog
        open={openCountriesDialog}
        onClose={() => setOpenCountriesDialog(false)}
      >
        <DialogTitle>Nombres de todos los países</DialogTitle>
        <DialogContent>
          <ul>
            {allCountries.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCountriesDialog(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default ByName;
