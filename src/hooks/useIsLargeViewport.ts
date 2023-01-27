import { useMediaQuery } from '@mui/material'

export const useIsLargeViewport = () => {
  return useMediaQuery('(min-width:600px)')
}
