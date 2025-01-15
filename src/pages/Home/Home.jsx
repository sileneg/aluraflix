import { useState, useEffect, useRef } from 'react';
import api from '../../services/api';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import VideoCard from '../../components/VideoCard';
import Banner from '../../components/Banner';
import VideoModal from '../../components/VideoModal';
import { Box, Typography, Grid, CircularProgress, Alert, Snackbar, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showScroll, setShowScroll] = useState(false);

  const videoSectionRef = useRef(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await api.get('/videos');
        if (response.status === 200) {
          setVideos(response.data);
        } else {
          console.error('Error: La respuesta no fue exitosa', response.status);
        }
      } catch (error) {
        console.error('Error al obtener los videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredVideos = videos
    .filter(
      (video) =>
        video.title.toLowerCase().includes(searchTerm) ||
        video.category?.toLowerCase().includes(searchTerm)
    )
    .filter((video) => (categoryFilter ? video.category === categoryFilter : true));

  const groupedVideos = filteredVideos.reduce((acc, video) => {
    const category = video.category || 'Sin categoría';
    if (!acc[category]) acc[category] = [];
    acc[category].push(video);
    return acc;
  }, {});

  // Funciones para manejar la edición y eliminación de videos
  const handleEditVideo = (video) => {
    setCurrentVideo(video);
    setIsFormOpen(true);
  };

  const handleNewVideo = () => {
    setCurrentVideo(null);
    setIsFormOpen(true);
  };

  const handleDeleteVideo = async (video) => {
    const confirm = window.confirm(
      `¿Estás seguro de eliminar el video "${video.title}"?`
    );
    if (confirm) {
      try {
        const response = await api.delete(`/videos/${video.id}`);
        if (response.status === 200) {
          setVideos((prev) => prev.filter((v) => v.id !== video.id));
          setSuccessMessage('¡Video eliminado exitosamente!');
        } else {
          console.error('Error al eliminar el video:', response.status);
        }
      } catch (error) {
        console.error('Error al eliminar el video:', error);
      }
    }
  };

  const handleSaveVideo = async (videoData) => {
    if (currentVideo) {
      // Editar video existente
      try {
        const response = await api.put(`/videos/${currentVideo.id}`, videoData);
        if (response.status === 200) {
          setVideos((prev) =>
            prev.map((v) => (v.id === currentVideo.id ? response.data : v))
          );
          setIsFormOpen(false);
          setCurrentVideo(null);
          setSuccessMessage('¡Video actualizado exitosamente!');
        } else {
          console.error('Error al actualizar el video:', response.status);
        }
      } catch (error) {
        console.error('Error al actualizar el video:', error);
      }
    } else {
      // Agregar nuevo video
      try {
        const response = await api.post('/videos', videoData);
        if (response.status === 201) {
          setVideos((prev) => [...prev, response.data]);
          setIsFormOpen(false);
          setSuccessMessage('¡Video agregado exitosamente!');
        } else {
          console.error('Error al guardar el video:', response.status);
        }
      } catch (error) {
        console.error('Error al guardar el video:', error);
      }
    }
  };

  return (
    <Box>
      <Header onNewVideoClick={handleNewVideo} />
      <Banner
        setCategoryFilter={setCategoryFilter}
        videoSectionRef={videoSectionRef}
        sx={{ marginBottom: 3 }}
      />

      {/* Input de búsqueda */}
      <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center' }}>
        <TextField
          variant="outlined"
          placeholder="Buscar videos..."
          value={searchTerm}
          onChange={handleSearch}
          sx={{
            width: '50%',
            backgroundColor: '#03122F',
            marginTop: '30px',
            borderRadius: '25px',
            color: '#FFFFFF',
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 'bold',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#6BD1FF',
                animation: 'bordeAnimado 3s infinite',
              },
              '&:hover fieldset': {
                borderColor: '#00C86F',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#FFBA05',
              },
            },
            '@keyframes bordeAnimado': {
              '0%': {
                borderColor: '#6BD1FF',
                boxShadow: '0px 0px 15px 5px rgba(107, 209, 255, 0.7), 0px 0px 20px rgba(255, 186, 5, 0.5), 0px 0px 25px rgba(0, 200, 111, 0.7)',
              },
              '50%': {
                borderColor: '#FFBA05',
                boxShadow: '0px 0px 20px 7px rgba(255, 186, 5, 0.7), 0px 0px 25px rgba(0, 200, 111, 0.5), 0px 0px 30px rgba(107, 209, 255, 0.7)',
              },
              '100%': {
                borderColor: '#00C86F',
                boxShadow: '0px 0px 15px 5px rgba(107, 209, 255, 0.7), 0px 0px 20px rgba(255, 186, 5, 0.5), 0px 0px 25px rgba(0, 200, 111, 0.7)',
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#6BD1FF' }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSuccessMessage('')}
          severity="success"
          sx={{ width: '100%'}}
        >
          {successMessage}
        </Alert>
      </Snackbar>

      <Box component="main" sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom ref={videoSectionRef} />

        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '200px',
            }}
          >
            <CircularProgress />
          </Box>
        ) : Object.keys(groupedVideos).length > 0 ? (
          Object.entries(groupedVideos).map(([category, videos]) => (
            <Box key={category} sx={{ marginBottom: 4 }}>
              <Box
                sx={{
                  backgroundColor: {
                    Frontend: '#6BD1FF',
                    Backend: '#00C86F',
                    Gestión: '#FFBA05',
                  }[category] || '#FFFFFF',
                  borderRadius: '8px',
                  padding: '15px',
                  margin: '10px 20px',
                  textAlign: 'center',
                  maxWidth: '300px',
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                  }}
                >
                  {category}
                </Typography>
              </Box>
              <Grid container spacing={2}>
                {videos.map((video) => (
                  <Grid item xs={12} sm={6} md={4} key={video.id}>
                    <VideoCard
                      video={video}
                      onEdit={handleEditVideo}
                      onDelete={handleDeleteVideo}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))
        ) : (
          <Typography variant="body1">No hay videos disponibles</Typography>
        )}
      </Box>
      <Footer />

      {/* Flecha para subir */}
      {showScroll && (
        <Box
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#03122F',
            color: '#6BD1FF',
            borderRadius: '50%',
            padding: '10px',
            cursor: 'pointer',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
            '&:hover': {
              backgroundColor: '#6BD1FF',
              color: '#03122F',
            },
          }}
        >
          <KeyboardArrowUpIcon fontSize="large" />
        </Box>
      )}

      <VideoModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setCurrentVideo(null);
        }}
        onSave={handleSaveVideo}
        video={currentVideo}
      />
    </Box>
  );
};

export default Home;
