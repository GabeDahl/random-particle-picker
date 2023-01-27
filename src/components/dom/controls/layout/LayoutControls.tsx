import {
  Button,
  Typography,
  Stack,
  IconButton,
  useMediaQuery,
  Link,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import {
  closeControls,
  closeOptions,
  openControls,
  openOptions,
} from '@/redux/features/layoutSlice'
import { GitHub, LinkedIn } from '@mui/icons-material'

export const LayoutControls = () => {
  const isNotMobile = useMediaQuery('(min-width:600px)')
  const dispatch = useAppDispatch()
  const { controlsOpen, optionsOpen } = useAppSelector((state) => state.layout)
  const handleControlsClick = () => {
    if (controlsOpen) {
      dispatch(closeControls())
    } else {
      dispatch(openControls())
    }
  }
  const handleOptionsClick = () => {
    if (optionsOpen) {
      dispatch(closeOptions())
    } else {
      dispatch(openOptions())
    }
  }
  return (
    <Stack
      sx={{
        position: 'absolute',
        zIndex: 10000,
        top: 0,
        left: 0,
        width: isNotMobile ? 450 : '100%',
        backgroundColor: 'rgba(0,0,0,0.9)',
        p: 3,
      }}
      spacing={1}>
      <Typography variant='h4'>Random Particle Picker</Typography>
      <Stack direction='row' alignItems='center'>
        <Typography fontWeight={100} variant='h6' pt={0.5}>
          By Gabriel Dahl
        </Typography>
        <Link
          target='_blank'
          href='https://github.com/GabeDahl/random-particle-picker'
          rel='noopener'>
          <IconButton size='small' sx={{ ml: 2 }}>
            <GitHub />
          </IconButton>
        </Link>
        <Link
          target='_blank'
          href='https://linkedin.com/in/gabrieldahl/'
          rel='noopener'>
          <IconButton size='small' sx={{ ml: 2 }}>
            <LinkedIn />
          </IconButton>
        </Link>
      </Stack>
      <Stack direction='row' spacing={3}>
        <Button
          variant='outlined'
          color='primary'
          onClick={handleControlsClick}>
          {controlsOpen ? 'Close' : 'Open'} Controls
        </Button>
        <Button variant='outlined' color='primary' onClick={handleOptionsClick}>
          {optionsOpen ? 'Close' : 'Open'} Options
        </Button>
      </Stack>
    </Stack>
  )
}
