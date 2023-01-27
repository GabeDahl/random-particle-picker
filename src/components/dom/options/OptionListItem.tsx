import {
  Option,
  forceRerender,
  removeOption,
  updateOption,
} from '@/redux/features/optionsSlice'
import { useAppDispatch } from '@/redux/store'
import {
  Delete,
  LightMode,
  PaletteOutlined,
  Replay,
  RestartAlt,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material'
import {
  ListItem,
  TextField,
  IconButton,
  Popover,
  Box,
  Slider,
  Stack,
  SliderThumb,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { MouseEvent, SyntheticEvent, useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { debounce } from 'debounce'
import tinycolor from 'tinycolor2'
interface OptionListItemProps {
  option: Option
  index: number
}
export const OptionListItem = ({ option, index }: OptionListItemProps) => {
  const { name, numParticles, brightness, color, isRendering } = option
  const dispatch = useAppDispatch()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const [brightnessValue, setBrightnessValue] = useState(option.brightness)
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleRestart = () => {
    dispatch(forceRerender({ index }))
  }

  const handleBrightnessChange = (
    event: Event | SyntheticEvent<Element, Event>,
    value: number,
  ) => {
    dispatch(
      updateOption({
        index,
        option: { ...option, brightness: value },
      }),
    )
  }

  const handleColorChange = debounce((color) => {
    dispatch(updateOption({ index, option: { ...option, color } }))
  }, 200)
  const toggleVisibility = () => {
    dispatch(
      updateOption({
        index,
        option: { ...option, isRendering: !isRendering },
      }),
    )
  }
  const handleRefresh = () => {
    dispatch(updateOption({ index, option: { ...option, isRendering: true } }))
  }
  return (
    <ListItem
      sx={{
        backgroundColor: getBackgroundColor(color),
      }}>
      <Stack direction='row' spacing={3}>
        <Stack direction='column'>
          <TextField
            label='Name'
            variant='standard'
            sx={{ maxWidth: 200 }}
            size='small'
            onChange={(e) => {
              dispatch(
                updateOption({
                  index,
                  option: { ...option, name: e.target.value },
                }),
              )
            }}
            value={name}
          />

          <Stack
            spacing={2}
            direction='row'
            justifyContent='space-between'
            alignItems={'center'}>
            <IconButton onClick={handleClick} size='medium'>
              <PaletteOutlined />
            </IconButton>

            <Popover open={open} anchorEl={anchorEl} onClose={handleClose}>
              <Box p={1}>
                <HexColorPicker color={color} onChange={handleColorChange} />
              </Box>
            </Popover>
            <BrightnessSlider
              min={0.1}
              slots={{ thumb: BrightnessThumbComponent }}
              step={0.1}
              max={30}
              sx={{ width: '100%', color }}
              aria-label={`${name}-Brightness`}
              value={brightnessValue}
              onChange={(e, v: number) => {
                setBrightnessValue(v)
              }}
              onChangeCommitted={handleBrightnessChange}
            />
          </Stack>
        </Stack>
        <Stack direction='column'>
          <TextField
            type='number'
            label='Particles'
            variant='standard'
            sx={{ maxWidth: 160 }}
            size='small'
            onChange={(e) => {
              if (Number(e.target.value) > 1000000) return
              dispatch(
                updateOption({
                  index,
                  option: { ...option, numParticles: Number(e.target.value) },
                }),
              )
            }}
            value={numParticles}
          />
          <Stack direction='row' justifyContent='flex-start'>
            <IconButton onClick={handleRestart} size='small'>
              <RestartAlt />
            </IconButton>
            <IconButton onClick={toggleVisibility} size='medium'>
              {isRendering ? <Visibility /> : <VisibilityOff />}
            </IconButton>

            <IconButton
              size='small'
              onClick={() => dispatch(removeOption(index))}
              color='error'
              aria-label={`Delete-${name}`}>
              <Delete />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </ListItem>
  )
}

const getBackgroundColor = (color: string) => {
  if (tinycolor(color).getBrightness() < 75)
    return tinycolor(color).darken(20).toString()
  return tinycolor(color).darken(30).toString()
}

const BrightnessSlider = styled(Slider)(({ theme }) => ({
  '& .MuiSlider-thumb': {
    height: 27,
    width: 27,
    // backgroundColor: 'white',
  },
}))

interface BrightnessThumbComponentProps extends React.HTMLAttributes<unknown> {
  color: 'string'
}

function BrightnessThumbComponent(props: BrightnessThumbComponentProps) {
  const { children, color, ...other } = props
  return (
    <SliderThumb {...other}>
      {children}
      <LightMode sx={{ color: 'white' }} />
    </SliderThumb>
  )
}
