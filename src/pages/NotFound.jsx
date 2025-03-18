import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        404 - Página no encontrada
      </Typography>
      <Typography variant="h6" component="p" gutterBottom>
        La página que estás buscando no existe.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Volver al inicio
      </Button>
    </Box>
  );
};

export default NotFound;