import { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Typography, Grid, Link, Box, Container } from "@mui/material";

const Home = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const data = await res.json();
      setCountries(data);
    };
    fetchCountries();
  }, []);

  return (
    <Container>
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Bienvenido a Banderiego
        </Typography>
        <Typography variant="h6" component="p" gutterBottom>
          Explora información detallada sobre todos los países del mundo.
        </Typography>
      </Box>
      <Grid container spacing={3} padding={3}>
        {countries.map((country) => (
          <Grid item key={country.cca3} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={country.flags.svg}
                alt={`Bandera de ${country.name.common}`}
              />
              <CardContent>
                <Typography variant="h6">{country.name.common}</Typography>
                <Typography variant="body2">Capital: {country.capital?.[0]}</Typography>
                <Link href={country.maps.googleMaps} target="_blank" rel="noopener">
                  Ver en Google Maps
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
