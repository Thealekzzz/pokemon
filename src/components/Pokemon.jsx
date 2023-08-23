import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  Container,
  Snackbar,
  Typography,
} from '@mui/material';

import { baseURL } from '../consts/urls';
import Header from './Header';

const Pokemon = () => {
  const [pokemons, setPokemons] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedPokemonData, setSelectedPokemonData] = useState(null);

  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);
  const [isSnackOpen, setIsSnackOpen] = useState(false);

  function handleChipClick(pokemon) {
    if (pokemon.name !== selectedPokemon?.name) {
      setIsImageLoading(true);
    }

    setSelectedPokemon(pokemon);
  }

  function handleImageLoaded() {
    setIsImageLoading(false);
  }

  function getImageUrlByPokemonUrl(pokemonUrl) {
    const pokemonID = parseInt(pokemonUrl.match(/\d+\/?$/));
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png`;
  }

  useEffect(() => {
    axios.get(`${baseURL}/pokemon?limit=10`)
      .then(({ data }) => {
        setPokemons(data.results);
      })
      .catch(() => {
        setIsSnackOpen(true);
        setErrorMessage('Ошибка при попытке получить список покемонов');
      });
  }, []);

  useEffect(() => {
    if (pokemons) {
      setIsImageLoading(true);
      setSelectedPokemon(pokemons[0]);
    }
  }, [pokemons]);

  useEffect(() => {
    setIsDataLoading(true);

    if (selectedPokemon) {
      axios.get(selectedPokemon.url)
        .then(({ data }) => {
          setIsDataLoading(false);
          setSelectedPokemonData(data);
        })
        .catch(() => {
          setIsSnackOpen(true);
          setErrorMessage('Ошибка при попытке получить данные покемона');
        });
    }
  }, [selectedPokemon]);

  return (
    <Container
      disableGutters
      sx={{
        boxSizing: 'border-box',
        py: 12.5,
        px: 18.75,
      }}
    >

      <Header />

      {!pokemons ? (
        <Box sx={{
          width: 'fit-content',
          my: 20,
          mx: 'auto'
        }}>
          <CircularProgress color='paper' />
        </Box>
      ) : (<>
        <Box
          sx={{
            display: 'flex',
            gap: 1.5,
            flexDirection: 'row',
            alignItems: 'center',

          }}
        >
          <Box
            sx={{
              width: 484,
              display: 'flex',
              flexWrap: 'wrap',
              rowGap: 1.25,
              columnGap: 0.75,
            }}
          >
            {pokemons.map((pokemon) => (
              <Chip
                key={pokemon.name}
                clickable
                onClick={() => handleChipClick(pokemon)}
                label={pokemon.name}
                color='primary'
                sx={{
                  py: 3.75,
                  px: 2.5,
                  borderRadius: 10,
                  fontWeight: 500,
                  fontSize: 20,
                  lineHeight: '100%',
                }}
              />
            ))}
          </Box>

          <Box
            sx={{
              boxSizing: 'border-box',
              height: 500,
              width: 484,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              gap: 5.5,
              p: 5.5,
              bgcolor: 'black'
            }}
          >
            <Typography
              color='text.light'
              variant='h3'
              fontWeight={700}
              lineHeight={1}
              textTransform='capitalize'
            >
              {selectedPokemon?.name || ''}
            </Typography>

            <Box
              sx={{
                width: 200,
                height: 200,
                marginX: 'auto',
              }}
            >
              {selectedPokemon && (<>
                <img
                  onLoad={handleImageLoaded}
                  src={getImageUrlByPokemonUrl(selectedPokemon.url)}
                  alt={`${selectedPokemon.name} photo`}
                  height='100%'
                  style={{
                    imageRendering: 'pixelated',
                    display: isImageLoading ? 'none' : 'initial',
                  }}
                />

                <Box
                  sx={{
                    width: 'fit-content',
                    mx: 'auto',
                    mt: 4,
                    display: isImageLoading ? 'block' : 'none',
                  }}
                >
                  <CircularProgress color='paper' />
                </Box>

              </>)}

            </Box>

            {selectedPokemonData && (<>
              <Box
                sx={{
                  display: isDataLoading ? 'none' : 'flex',
                  flexDirection: 'column',
                  gap: '',
                }}
              >
                <Typography
                  fontSize={17}
                  fontWeight={500}
                  color='text.light'
                >
                  {`id: ${selectedPokemonData.id}`}
                </Typography>
                <Typography
                  fontSize={17}
                  fontWeight={500}
                  color='text.light'
                >
                  {`height: ${selectedPokemonData.height}`}
                </Typography>
                <Typography
                  fontSize={17}
                  fontWeight={500}
                  color='text.light'
                >
                  {`attack: ${selectedPokemonData.stats[1].base_stat}`}
                </Typography>

              </Box>

              <Box
                sx={{
                  width: 'fit-content',
                  mt: 4,
                  display: isDataLoading ? 'block' : 'none',
                }}
              >
                <CircularProgress color='paper' size={20} />
              </Box>
            </>)}


          </Box>

        </Box>
      </>)}

      <Snackbar open={isSnackOpen} autoHideDuration={4000} onClose={() => setIsSnackOpen(false)}>
        <Alert severity="error" onClose={() => setIsSnackOpen(false)} >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Pokemon;