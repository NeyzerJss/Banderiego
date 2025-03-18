import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#136adf' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img src="./mundo-removebg-preview.png" alt="mundo" style={{ height: '40px', marginRight: '10px' }} />
          <Typography variant="h4">
            Banderiego
          </Typography>
        </Box>
        <Button color="inherit" component={Link} to="/">Inicio</Button>
        <Button color="inherit" component={Link} to="/por-nombre">Buscar por nombre</Button>
        <Button color="inherit" component={Link} to="/por-divisa">Buscar por divisa</Button>
        <Button color="inherit" component={Link} to="/por-idioma">Buscar por idioma</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;