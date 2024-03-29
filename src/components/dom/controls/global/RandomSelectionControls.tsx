import {
  clearSelectedParticle,
  updateSelectedParticle,
} from '@/redux/features/optionsSlice'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { Button, Grid, Stack } from '@mui/material'

export default function SelectionControls() {
  const dispatch = useAppDispatch()
  const options = useAppSelector((state) => state.options.options)
  const selectRandomParticle = () => {
    const total = options.reduce(
      (acc, option) => (acc += option.numParticles),
      0,
    )
    const randomIndex = Math.floor(Math.random() * (total - 0) + 0)
    let accumulator = 0
    let selectedColor
    let localIndex
    let optionName
    options.forEach((option) => {
      if (selectedColor) return
      if (randomIndex < accumulator + option.numParticles) {
        selectedColor = option.color
        optionName = option.name
        localIndex = randomIndex - accumulator
        return
      } else {
        accumulator += option.numParticles
      }
    })

    dispatch(
      updateSelectedParticle({
        name: `${optionName}_${localIndex}`,
        color: selectedColor,
        optionName,
        index: localIndex,
      }),
    )
    return
  }
  return (
    <Grid container sx={{ pointerEvents: 'all' }} alignItems='center'>
      <Grid item xs={3}>
        <Button
          size='small'
          color='error'
          onClick={() => {
            dispatch(clearSelectedParticle())
          }}>
          Clear
        </Button>
      </Grid>
      <Grid item xs={9}>
        <Button
          variant='outlined'
          size='large'
          color='primary'
          
          onClick={selectRandomParticle}>
          SELECT RANDOM PARTICLE
        </Button>
      </Grid>
    </Grid>
  )
}
