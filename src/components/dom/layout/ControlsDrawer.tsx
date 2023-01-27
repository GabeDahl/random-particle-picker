import React, { useState, useEffect } from 'react'
import { Typography, Stack, Drawer, IconButton } from '@mui/material'
import { Controls } from '../controls/global/GlobalControls'
import { SelectionDisplay } from '../SelectionDisplay'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { closeControls } from '@/redux/features/layoutSlice'
import { Close } from '@mui/icons-material'
import { useIsLargeViewport } from '@/hooks/useIsLargeViewport'

export const ControlsDrawer = () => {
  const isBeeegScreen = useIsLargeViewport()
  const open = useAppSelector((state) => state.layout.controlsOpen)
  const dispatch = useAppDispatch()
  const handleClose = (event: React.KeyboardEvent | React.MouseEvent) => {
    dispatch(closeControls())
  }

  return (
    <Drawer
      keepMounted
      anchor='bottom'
      open={open}
      onClose={handleClose}
      hideBackdrop
      ModalProps={{
        slots: { backdrop: 'div' },
        slotProps: {
          root: {
            style: {
              position: 'absolute',
              top: 'unset',
              bottom: 'unset',
              left: 'unset',
              right: 'unset',
            },
          },
        },
      }}
      PaperProps={{
        sx: {
          pointerEvents: 'none',
          background: 'rgba(0,0,0,0.8)',
          borderTop: 'solid white 1px',

          maxWidth: isBeeegScreen ? 370 : null,
        },
      }}>
      <Stack
        p={1}
        spacing={3}
        sx={{
          minWidth: '17vw',
          backgroundColor: 'rgba(0,0,0,0)',
        }}>
        <Stack direction='row' justifyContent='space-between' spacing={3} p={1}>
          <Typography variant='h5'>Controls</Typography>

          <IconButton
            sx={{ pointerEvents: 'all' }}
            size='small'
            onClick={handleClose}>
            <Close />
          </IconButton>
        </Stack>
        <SelectionDisplay />
        <Controls />
      </Stack>
    </Drawer>
  )
}
