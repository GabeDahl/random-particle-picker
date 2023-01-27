import { List } from '@mui/material'
import { useAppSelector } from '@/redux/store'
import { OptionListItem } from './OptionListItem'
export const OptionsList = () => {
  const options = useAppSelector((state) => state.options.options)
  return (
    <List sx={{ maxHeight: '60vh' }}>
      {options.map((option, i) => (
        <OptionListItem option={option} index={i} key={i} />
      ))}
    </List>
  )
}
