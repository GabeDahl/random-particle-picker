import React, { useState, useEffect } from 'react'
import {
  Button,
  Modal,
  Drawer,
  Typography,
  Stack,
  IconButton,
} from '@mui/material'
import { OptionsList } from '../options/OptionsList'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { closeOptions } from '@/redux/features/layoutSlice'
import { Close } from '@mui/icons-material'
import CreateOption from '../options/CreateOption'
import { useIsLargeViewport } from '@/hooks/useIsLargeViewport'

export const OptionsDrawer = () => {
  const isBeeegScreen = useIsLargeViewport()
  const dispatch = useAppDispatch()
  const drawerOpen = useAppSelector((state) => state.layout.optionsOpen)
  const handleDrawerClose = () => {
    dispatch(closeOptions())
  }
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const handleCreateOpen = () => setIsCreateOpen(true)
  const handleCreateClose = () => setIsCreateOpen(false)

  return (
    <Drawer
      anchor='bottom'
      keepMounted
      open={drawerOpen}
      onClose={handleDrawerClose}
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
          background: 'rgba(0,0,0,0.9)',
          borderTop: '1px solid white',

          maxWidth: isBeeegScreen ? 350 : null,
        },
      }}>
      <Stack direction='row' justifyContent='space-between' spacing={3} p={2}>
        <Typography variant='h5'>Options</Typography>
        <Button
          sx={{ pointerEvents: 'all' }}
          onClick={handleCreateOpen}
          fullWidth
          size='small'
          variant='outlined'>
          New Option
        </Button>
        <IconButton
          color='error'
          sx={{ pointerEvents: 'all' }}
          size='small'
          onClick={handleDrawerClose}>
          <Close />
        </IconButton>
      </Stack>
      <OptionsList />
      <Modal open={isCreateOpen} onClose={handleCreateClose}>
        <CreateOption close={handleCreateClose} />
      </Modal>
    </Drawer>
  )
}
