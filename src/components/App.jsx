import { Container } from '@mui/material';
import Pokemon from './Pokemon';
import Header from './Header';

function App() {
  return (
    <>
      <Container
        disableGutters
        sx={{
          boxSizing: 'border-box',
          py: {
            xs: 5,
            md: 12.5
          },
          px: {
            xs: 1,
            md: 6,
            lg: 18.75
          },
        }}
      >
        <Header />
        <Pokemon />
      </Container>
    </>
  )
}

export default App
