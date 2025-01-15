import { Card, CardMedia, CardContent, Typography, Button, Box, Modal, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const VideoCard = ({ video, categoryTitle, onEdit, onDelete }) => {
  const [openModal, setOpenModal] = useState(false);

  if (!video) return null;

  // Extraer el ID del video de la URL
  let videoId;
  if (video.video.includes('v=')) {
    videoId = video.video.split('v=')[1].split('&')[0];
  } else {
    videoId = video.video.split('/').pop();
  }

  const videoEmbedUrl = `https://www.youtube.com/embed/${videoId}`;

  // Colores según la categoría
  const categoryColors = {
    Frontend: '#6BD1FF',
    Backend: '#00C86F',
    Gestión: '#FFBA05',
  };

  const cardColor = categoryColors[video.category] || '#FFFFFF';

  return (
    <Box sx={{ marginBottom: '40px', fontFamily: 'Roboto, sans-serif' }}>
      {/* Título de la Categoría */}
      {categoryTitle && (
        <Box
          sx={{
            backgroundColor: categoryColors[categoryTitle] || '#FFFFFF',
            borderRadius: '8px',
            padding: '10px 15px',
            margin: '20px 0',
            textAlign: 'center',
            fontFamily: 'Roboto, sans-serif',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: '#FFFFFF',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              fontSize: '1.6rem',
            }}
          >
            {categoryTitle}
          </Typography>
        </Box>
      )}

      {/* Tarjeta del Video */}
      <Card
        sx={{
          maxWidth: 360,
          margin: '10px auto',
          border: `2px solid ${cardColor}`,
          borderRadius: '10px',
          boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
          backgroundColor: '#03122f',
          fontFamily: 'Roboto, sans-serif',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'scale(1.1)',
            boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.4)',
          },
        }}
        onClick={() => setOpenModal(true)}
      >
        {/* Video con icono de reproducción */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            paddingTop: '56.25%',
            overflow: 'hidden',
          }}
        >
          <CardMedia
            component="img"
            image={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt={video.title}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRight: `5px solid ${cardColor}`,
            borderBottom: `5px solid ${cardColor}`,
            borderLeft: `5px solid ${cardColor}`,
            borderRadius: '10px',
            boxShadow: `0px -4px 5px 3px ${cardColor}`,
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
        <CardContent>
          {/* Título del video */}
          <Typography
            variant="h6"
            sx={{
              color: cardColor,
              fontWeight: 'bold',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '1.5rem',
            }}
          >
            {video.title}
          </Typography>
          {/* Descripción */}
          <Typography
            variant="body2"
            sx={{
              color: '#FFFFFF',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '1.1rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {video.description}
          </Typography>
        </CardContent>
        {/* Botones de acción */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px 20px',
            backgroundColor: 'rgba(0, 0, 0, 0.90)',
            borderRight: `5px solid ${cardColor}`,
            borderBottom: `5px solid ${cardColor}`,
            borderLeft: `5px solid ${cardColor}`,
            borderRadius: '10px',
            boxShadow: `0px -4px 5px 3px ${cardColor}`,
          }}
        >
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(video);
            }}
            sx={{
              color: '#FFFFFF',
              fontWeight: 'bold',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '1rem',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              textTransform: 'uppercase',
              '&:hover': {
                color: '#A5A5A5',
                backgroundColor: 'none',
                transform: 'scale(1.3)'
              },
            }}
          >
            <img
              src="/aluraflix/editar.png"
              alt="Editar"
              style={{ width: '20px', marginRight: '5px' }}
            />
            Editar
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(video);
            }}
            sx={{
              color: '#FFFFFF',
              fontWeight: 'bold',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '1rem',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              textTransform: 'uppercase',
              '&:hover': {
                color: '#A5A5A5',
                backgroundColor: 'none',
                transform: 'scale(1.3)'
              },
            }}
          >
            <img
              src="/aluraflix/eliminar.png"
              alt="Eliminar"
              style={{ width: '20px', marginRight: '5px' }}
            />
            Eliminar
          </Button>
        </Box>
      </Card>

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
            border: `5px solid ${cardColor}`,
          }}
        >
          <IconButton
            sx={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              color: cardColor,
              zIndex: 10,
            }}
            onClick={() => setOpenModal(false)}
          >
            <CloseIcon sx={{ fontSize: '32px' }} />
          </IconButton>
          <iframe
            width="100%"
            height="100%"
            src={videoEmbedUrl}
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

VideoCard.propTypes = {
  video: PropTypes.shape({
    video: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    category: PropTypes.string.isRequired,
  }).isRequired,
  categoryTitle: PropTypes.string,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

VideoCard.defaultProps = {
  categoryTitle: null,
};

export default VideoCard;
