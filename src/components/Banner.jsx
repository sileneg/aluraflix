import { useState, useEffect } from 'react';
import { Box, Typography, Button, Modal, IconButton } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

const Banner = ({ setCategoryFilter, videoSectionRef }) => {
  const [video, setVideo] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(
          'https://my-json-server.typicode.com/sileneg/aluraflix-database/videos'
        );
        if (response.ok) {
          const data = await response.json();
          setVideo(data[0]);
        } else {
          console.error('Error fetching video:', response.status);
        }
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };

    fetchVideo();
  }, []);

  if (!video) {
    return <Typography>Cargando...</Typography>;
  }

  let videoId;
  if (video.video.includes('v=')) {
    videoId = video.video.split('v=')[1].split('&')[0];
  } else {
    videoId = video.video.split('/').pop();
  }

  const videoThumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  const handleCategoryClick = () => {
    setCategoryFilter('Frontend');
    if (videoSectionRef && videoSectionRef.current) {
      videoSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100vw',
        height: '550px',
        backgroundImage: `url('fondobanner.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    >
      {/* Línea divisoria azul */}
      <Box
        sx={{
          width: '100%',
          height: '5px',
          borderBottom: '4px solid var(--Blue, #2271D1)',
          background: '#262626',
          boxShadow: '20px 10px 30px 5px rgba(34, 113, 209, 0.70)',
        }}
      />

      {/* Contenido principal del Banner */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          height: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '30px',
          padding: '20px',
          boxSizing: 'border-box',
        }}
      >
        {/* Sección de texto */}
        <Box
          sx={{
            color: 'white',
            maxWidth: '700px',
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          <Button
            variant="contained"
            onClick={handleCategoryClick}
            sx={{
              backgroundColor: '#6BD1FF',
              color: 'white',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              fontSize: { xs: '16px', sm: '18px' },
              fontFamily: 'Roboto, sans-serif',
              marginBottom: '16px',
              borderRadius: '15px',
              padding: '10px 20px',
              marginX: { xs: 'auto', sm: '0' },
              border: '1px solid #6BD1FF',
              boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.5)',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#fff',
                color: '#6BD1FF',
                transform: 'scale(1.05)',
                boxShadow: '0px 12px 20px rgba(0, 0, 0, 0.7)',
              },
            }}
          >
            Frontend
          </Button>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '32px', sm: '46px' },
              fontFamily: "'Roboto', 'Arial', sans-serif",
              fontWeight: 400,
              marginBottom: '16px',
              textShadow: '1px 1px 4px rgba(0,0,0,0.5)',
              color: '#F5F5F5',
              WebkitTextStrokeWidth: '1px',
              WebkitTextStrokeColor: '#6BD1FF',
            }}
          >
            Challenge React
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '16px', sm: '18px' },
              fontFamily: "'Roboto', 'Arial', sans-serif",
              fontWeight: 300,
              lineHeight: '1.6',
              color: '#F5F5F5',
              WebkitTextStrokeWidth: '1px',
              WebkitTextStrokeColor: '#6BD1FF',
            }}
          >
            Este challenge es una forma de aprendizaje. Es un mecanismo donde
            podrás comprometerte en la resolución de un problema para poder
            aplicar todos los conocimientos adquiridos en la formación React.
          </Typography>
        </Box>

        {/* Sección del video */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: '600px',
            aspectRatio: '16/9',
            borderRadius: '15px',
            overflow: 'hidden',
            border: '5px solid #6BD1FF',
            backgroundColor: 'black',
            marginX: { xs: 'auto', sm: '0' },
            boxShadow: '0px 0px 17px 8px rgba(107, 209, 255, 0.6)',
            transition: 'box-shadow 0.3s ease',
            '&:hover': {
              boxShadow: '0px 8px 24px rgba(107, 209, 255, 0.9)',
            },
          }}
          onClick={() => setOpenModal(true)}
        >
          <img
            src={videoThumbnailUrl}
            alt="Thumbnail"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <PlayCircleOutlineIcon
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '64px',
              color: 'white',
              opacity: 0.9,
              transition: 'opacity 0.3s ease',
              '&:hover': { opacity: 1 },
            }}
          />
        </Box>
      </Box>

      {/* Modal del video */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '95%',
            maxWidth: '960px',
            aspectRatio: '16/9',
            backgroundColor: 'black',
            borderRadius: '15px',
            overflow: 'hidden',
            border: '5px solid #6BD1FF',
          }}
        >
          <IconButton
            sx={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              color: '#6BD1FF',
              zIndex: 10,
            }}
            onClick={() => setOpenModal(false)}
          >
            <CloseIcon sx={{ fontSize: '32px' }} />
          </IconButton>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Box>
      </Modal>
    </Box>
  );
};

Banner.propTypes = {
    setCategoryFilter: PropTypes.func.isRequired,
    videoSectionRef: PropTypes.object.isRequired,
};

export default Banner;
