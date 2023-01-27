import { useAppSelector } from '@/redux/store'
import { Card, CardContent, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import tinycolor from 'tinycolor2'

export const SelectionDisplay = () => {
  const { optionName, color, index } = useAppSelector(
    (state) => state.options.selectedParticle,
  )
  const [textColor, setTextColor] = useState('white')
  useEffect(() => {
    if (!color || !tinycolor.mostReadable) {
      setTextColor('white')
    }
    setTextColor(
      tinycolor
        .mostReadable(color, ['#fff', '#00'], {
          includeFallbackColors: true,
        })
        .toHexString(),
    )
  }, [color])

  return (
    <Card
      sx={{
        background: 'transparent',
        backgroundColor: color || null,
        maxWidth: 400,
      }}>
      <CardContent>
        <Typography color={textColor} align='center' variant='h5'>
          {optionName || 'Nothing Selected'}
        </Typography>
        <Typography color={textColor} align='center' variant='body1'>
          {index ? `Particle ${index}` : '-'}
        </Typography>
      </CardContent>
    </Card>
  )
}
