import './global.css'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react'

import QueryProvider from '@/providers/QueryProvider'
import { SelectedPackProvider } from '@/context/SelectedPack'

const system = createSystem(defaultConfig)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryProvider>
    <ChakraProvider value={system}>
      <SelectedPackProvider>
        <App />
      </SelectedPackProvider>
    </ChakraProvider>
  </QueryProvider>
)
