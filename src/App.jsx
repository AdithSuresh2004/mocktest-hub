import { Outlet } from 'react-router-dom'

import { ToastProvider } from '@/hooks/common/useToast'
import ToastContainer from '@/components/common/ToastContainer'

import Layout from '@/components/layout/Layout'

const App = () => {
  return (
    <ToastProvider>
      <Layout>
        <Outlet />
      </Layout>
      <ToastContainer />
    </ToastProvider>
  )
}

export default App
