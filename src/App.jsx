import { Outlet } from 'react-router-dom'

import { ThemeProvider } from '@/contexts/ThemeContext'
import { ToastProvider } from '@/hooks/common/useToast'
import ToastContainer from '@/components/common/ToastContainer'

import Layout from '@/components/layout/Layout'

const App = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Layout>
          <Outlet />
        </Layout>
        <ToastContainer />
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App
