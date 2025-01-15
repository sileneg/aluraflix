import { AppBar, Toolbar, Typography, Button, Box, useTheme, useMediaQuery } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Header = ({ onNewVideoClick }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar
      position="static"
      sx={{
        background: theme.palette.background.default,
        boxShadow: '0px 10px 30px rgba(34, 113, 209, 0.7)',
        height: isSmallScreen ? '60px' : '80px',
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          paddingX: 2,
          height: '100%',
        }}
      >
        {/* Logo con efecto al pasar el mouse */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img
            src="/aluraflix/logo.png"
            alt="AluraFlix Logo"
            style={{
              height: isSmallScreen ? '40px' : '60px',
              marginRight: '10px',
              transition: 'filter 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.filter = 'drop-shadow(0px 4px 10px rgba(107, 209, 255, 0.7))';
            }}
            onMouseLeave={(e) => {
              e.target.style.filter = 'none';
            }}
          />
          {!isSmallScreen && (
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontSize: '1.5rem',
                fontWeight: theme.typography.h1.fontWeight,
                color: theme.palette.text.primary,
              }}
            >
              {}
            </Typography>
          )}
        </Box>

        {/* Menú con efectos en fila */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Button
            href={`${process.env.PUBLIC_URL}/`}
            startIcon={<HomeIcon sx={{ fontSize: '1.5rem' }} />}
            sx={{
              fontFamily: theme.typography.fontFamily,
              color: theme.palette.text.primary,
              textTransform: theme.typography.button.textTransform,
              fontWeight: theme.typography.button.fontWeight,
              fontSize: isSmallScreen ? '0' : '1.2rem',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '& .MuiButton-startIcon': {
                marginRight: isSmallScreen ? 0 : '8px',
              },
              '&:hover': {
                color: theme.palette.primary.main,
                transform: 'scale(1.1)',
                boxShadow: '0px 10px 20px rgba(107, 209, 255, 0.5)',
              },
            }}
          >
            {!isSmallScreen && 'Home'}
          </Button>
          <Button
            onClick={onNewVideoClick}
            startIcon={<AddIcon sx={{ fontSize: '1.5rem' }} />}
            sx={{
              fontFamily: theme.typography.fontFamily,
              color: theme.palette.text.primary,
              textTransform: theme.typography.button.textTransform,
              fontWeight: theme.typography.button.fontWeight,
              fontSize: isSmallScreen ? '0' : '1.2rem',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '& .MuiButton-startIcon': {
                marginRight: isSmallScreen ? 0 : '8px',
              },
              '&:hover': {
                color: theme.palette.primary.main,
                transform: 'scale(1.1)',
                boxShadow: '0px 10px 20px rgba(107, 209, 255, 0.5)',
              },
            }}
          >
            {!isSmallScreen && 'Nuevo Video'}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  onNewVideoClick: PropTypes.func.isRequired,
};

export default Header;
