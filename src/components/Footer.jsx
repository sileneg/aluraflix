import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <>
      {/* Línea divisoria superior del footer */}
      <Box
         sx={{
          width: '100%',
          height: '5px',
          borderBottom: '4px solid var(--Blue, #2271D1)',
          background: '#262626',
          boxShadow: '20px 10px 30px 5px rgba(34, 113, 209, 0.70)',
        }}
      />
      <Box
        component="footer"
        sx={{
          backgroundColor: '#000',
          color: '#fff',
          textAlign: 'center',
          padding: 2,
          marginTop: 'auto',
        }}
      >
        <img
          src="/logo.png"
          alt="AluraFlix Logo"
          style={{ height: '40px', marginBottom: '10px' }}
        />
        <Typography variant="body2" fontFamily={'Roboto, sans-serif'} fontWeight={'bold'} fontSize={'0.8rem'}>
          Desafío AluraFlix. &copy; 2025 Creado por: Silene González Quiroz.
          Todos los derechos reservados.
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
