import { ControlsDrawer } from './ControlsDrawer'
import { OptionsDrawer } from './OptionsDrawer'
import { LayoutControls } from '../controls/layout/LayoutControls'

const Layout = ({ children, ...props }) => {
  return (
    <div style={{ backgroundColor: 'rgba(0,0,0,0)' }}>
      <LayoutControls />
      <ControlsDrawer />
      {children}
      <OptionsDrawer />
    </div>
  )
}
Layout.displayName = 'Layout'

export default Layout
