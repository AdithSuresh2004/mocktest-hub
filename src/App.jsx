import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react' 
import { ToastProvider } from '@/hooks/common/useToast'
import ToastContainer from '@/components/common/ToastContainer'
import LoadingSpinner from '@/components/common/LoadingSpinner'

import Layout from '@/components/layout/Layout'

const App = () => {
  const [isAppReady, setIsAppReady] = useState(false)

  useEffect(() => {
    setIsAppReady(true)
  }, [])

  if (!isAppReady) {
    return <LoadingSpinner fullScreen message="Loading application..." />
  }

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
