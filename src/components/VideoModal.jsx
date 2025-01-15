import { useState, useEffect } from 'react';
import {
  Box,
  Modal,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
} from '@mui/material';
import PropTypes from 'prop-types';

const VideoModal = ({ isOpen, onClose, onSave, video }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    image: '',
    video: '',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (video) {
      setFormData(video);
      setErrors({}); // Reiniciar errores al abrir el modal para editar
    } else {
      setFormData({
        title: '',
        category: '',
        image: '',
        video: '',
        description: '',
      });
      setErrors({}); // Reiniciar errores al abrir el modal para un nuevo video
    }
  }, [video]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'El título es obligatorio';
    if (!formData.category) newErrors.category = 'Selecciona una categoría';
    if (!/^https?:\/\/.+$/.test(formData.image))
      newErrors.image = 'Ingresa una URL válida para la imagen';
    if (!/^https?:\/\/.+$/.test(formData.video))
      newErrors.video = 'Ingresa una URL válida para el video';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 3000);
    }
  };

  return (
    <>
      <Modal open={isOpen} onClose={onClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: '400px' },
            maxHeight: '90vh',
            overflowY: 'auto',
            overflowX: 'hidden',
            backgroundColor: '#03122f',
            padding: '15px 20px',
            border: '5px solid transparent',
            borderRadius: '15px',
            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
            fontFamily: 'Roboto, sans-serif',
            animation: 'bordeAnimado 3s linear infinite',
            color: '#FFF',
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
        >
          <Typography
            sx={{
              textAlign: 'center',
              color: '#6BD1FF',
              fontSize: '24px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              marginBottom: '13px',
            }}
          >
            {video ? 'Editar Video' : 'Nuevo Video'}
          </Typography>
          <Button
            sx={{
              position: 'absolute',
              top: '15px',
              right: '-20px',
              fontSize: '2.2rem',
              cursor: 'pointer',
              color: '#6BD1FF',
              background: 'none',
              border: 'none',
              transition: 'transform 0.3s ease, color 0.3s ease',
              '&:hover': {
                transform: 'rotate(180deg) scale(1.3)',
                color: '#FFBA05',
              },
            }}
            onClick={onClose}
          >
            ×
          </Button>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Título"
              name="title"
              value={formData.title}
              onChange={handleChange}
              error={!!errors.title}
              helperText={errors.title}
              margin="normal"
              InputLabelProps={{
                sx: {
                  color: '#6BD1FF',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                },
              }}
              InputProps={{
                sx: {
                  backgroundColor: '#000',
                  border: '2px solid #6BD1FF',
                  borderRadius: '5px',
                  color: '#FFF',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  '&:hover': {
                    borderColor: '#FFBA05',
                  },
                },
              }}
            />
            <FormControl fullWidth margin="normal" error={!!errors.category}>
              <InputLabel
                sx={{
                  color: '#6BD1FF',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  '&.Mui-focused': { color: '#6BD1FF' },
                }}
              >
                Categoría
              </InputLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                sx={{
                  backgroundColor: '#000',
                  border: '2px solid #6BD1FF',
                  borderRadius: '5px',
                  color: '#FFF',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  '&:hover': {
                    borderColor: '#FFBA05',
                  },
                }}
              >
                <MenuItem value="Frontend">Frontend</MenuItem>
                <MenuItem value="Backend">Backend</MenuItem>
                <MenuItem value="Gestión">Innovación y Gestión</MenuItem>
              </Select>
              <Typography variant="caption" color="error">
                {errors.category}
              </Typography>
            </FormControl>
            <TextField
              fullWidth
              label="Imagen (URL)"
              name="image"
              value={formData.image}
              onChange={handleChange}
              error={!!errors.image}
              helperText={errors.image}
              margin="normal"
              InputLabelProps={{
                sx: {
                  color: '#6BD1FF',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                },
              }}
              InputProps={{
                sx: {
                  backgroundColor: '#000',
                  border: '2px solid #6BD1FF',
                  borderRadius: '5px',
                  color: '#FFF',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  '&:hover': {
                    borderColor: '#FFBA05',
                  },
                },
              }}
            />
            <TextField
              fullWidth
              label="Video (URL)"
              name="video"
              value={formData.video}
              onChange={handleChange}
              error={!!errors.video}
              helperText={errors.video}
              margin="normal"
              InputLabelProps={{
                sx: {
                  color: '#6BD1FF',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                },
              }}
              InputProps={{
                sx: {
                  backgroundColor: '#000',
                  border: '2px solid #6BD1FF',
                  borderRadius: '5px',
                  color: '#FFF',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  '&:hover': {
                    borderColor: '#FFBA05',
                  },
                },
              }}
            />
            <TextField
              fullWidth
              label="Descripción"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={3}
              margin="normal"
              InputLabelProps={{
                sx: {
                  color: '#6BD1FF',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                },
              }}
              InputProps={{
                sx: {
                  backgroundColor: '#000',
                  border: '2px solid #6BD1FF',
                  borderRadius: '5px',
                  color: '#FFF',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  '&:hover': {
                    borderColor: '#FFBA05',
                  },
                },
              }}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 2,
              }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: 'transparent',
                  color: '#FFF',
                  border: '2px solid #FFF',
                  borderRadius: '8px',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  width: '160px',
                  height: '45px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#2271D1',
                    color: '#2271D1',
                    boxShadow: '0px 4px 15px rgba(34, 113, 209, 0.7)',
                  },
                }}
              >
                Guardar
              </Button>
              <Button
                variant="outlined"
                onClick={() =>
                  setFormData({
                    title: '',
                    category: '',
                    image: '',
                    video: '',
                    description: '',
                  })
                }
                sx={{
                  backgroundColor: 'transparent',
                  color: '#FFF',
                  border: '2px solid #FFF',
                  borderRadius: '8px',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  width: '160px',
                  height: '45px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#2271D1',
                    color: '#2271D1',
                    boxShadow: '0px 4px 15px rgba(34, 113, 209, 0.7)',
                  },
                }}
              >
                Limpiar
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
      <Snackbar
        open={showSuccess}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          sx={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
          }}
        >
          ¡Video guardado exitosamente!
        </Alert>
      </Snackbar>
    </>
  );
};

VideoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  video: PropTypes.object,
};

VideoModal.defaultProps = {
  video: null,
};

export default VideoModal;
