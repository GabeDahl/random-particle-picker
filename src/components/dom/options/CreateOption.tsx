import {
  Button,
  Card,
  CardContent,
  Typography,
  Stack,
  TextField,
  InputAdornment,
} from '@mui/material'
import React, { forwardRef, useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { Palette } from '@mui/icons-material'
import CardActions from '@mui/material/CardActions'
import { useTheme } from '@mui/system'
import { useAppDispatch } from '@/redux/store'
import { addOption } from '@/redux/features/optionsSlice'

const hexRegex = /^#([0-9a-f]{3}){1,2}$/i

interface CreateOptionProps {
  close: () => void
}
const CreateOption = forwardRef(({ close }: CreateOptionProps, ref) => {
  const dispatch = useAppDispatch()
  const [name, setName] = useState('')
  const [nameErr, setNameErr] = useState(false)
  const [color, setColor] = useState('#ffffff')
  const [colorErr, setColorErr] = useState(false)
  const [numParticles, setNumParticles] = useState(1000)
  const [numParticlesErr, setNumParticlesErr] = useState(false)
  const handleSubmit = () => {
    dispatch(
      addOption({
        name,
        color,
        numParticles: Number(numParticles),
        isRendering: true,
        brightness: 2,
        forceRerenderCounter: 0,
      }),
    )
    close()
  }

  const theme = useTheme()

  return (
    <Card
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '5vh',
      }}>
      <CardContent>
        <Stack spacing={3} alignItems={'center'}>
          <Typography sx={{ width: '100%' }} variant='h5'>
            Create Option
          </Typography>
          <TextField
            fullWidth
            size='small'
            label='Name'
            required
            value={name}
            error={nameErr}
            onChange={(e) => {
              if (e.target.value === '') {
                setName(e.target.value)
                setNameErr(true)
              } else {
                setName(e.target.value)
                setNameErr(false)
              }
            }}
          />
          <TextField
            fullWidth
            size='small'
            name='numParticles'
            label='Number of Particles'
            required
            value={numParticles}
            type='number'
            error={numParticlesErr}
            helperText={
              numParticlesErr ? 'Max 1 million particles per option' : null
            }
            onChange={(e) => {
              if (Number(e.target.value) > 1000000) {
                setNumParticlesErr(true)
                return
              } else {
                setNumParticles(Number(e.target.value))
                setNumParticlesErr(false)
              }
            }}
          />
          <TextField
            size='small'
            value={color}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Palette sx={{ color: color }} />
                </InputAdornment>
              ),
              error: colorErr,
            }}
            error={colorErr}
            helperText={
              colorErr ? (
                <Typography
                  variant='body2'
                  component='span'
                  sx={{ color: theme.palette.error.main }}>
                  Valid hex code required
                </Typography>
              ) : null
            }
            label='Color (hexadecimal)'
            required
            onChange={(e) => {
              if (hexRegex.test(e.target.value)) {
                setColorErr(false)
                setColor(e.target.value)
              } else {
                setColor(e.target.value)
                setColorErr(true)
              }
            }}
          />
          <HexColorPicker color={color} onChange={setColor} />
        </Stack>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          variant='outlined'
          color='error'
          onClick={() => close()}>
          Cancel
        </Button>
        <Button
          disabled={colorErr || nameErr || numParticlesErr}
          fullWidth
          onClick={handleSubmit}
          variant='outlined'
          color='primary'
          type='submit'>
          Create
        </Button>
      </CardActions>
    </Card>
  )
})

CreateOption.displayName = 'CreateOption'
export default CreateOption
