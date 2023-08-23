import { Typography, Box } from '@mui/material';

import clickIcon from '../assets/click.svg';

const Header = () => {
  return (
    <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 6.75,
        }}
      >
        <Typography
          color='text.white'
          variant='overline'
          sx={{
            lineHeight: '100%',
            fontWeight: 500,
            border: 1,
            p: 0.875,
          }}
        >
          Покемоны API
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.25,  
          }}
        >
          <img src={clickIcon} alt="" />
          <Typography
            color='text.white'
            maxWidth={114}
            fontSize={12}
            fontWeight={600}
            lineHeight={1}
          >
            Нажмите на нужного Покемона
          </Typography>
        </Box>

      </Box>
  );
};

export default Header;