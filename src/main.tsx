import { BrowserRouter } from "react-router";
// import { Provider } from "@/components/ui/provider"
import { ColorModeProvider } from "@/components/ui/color-mode"
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// import { Provider } from './components/ui/provider.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    {/* <Provider> */}
    <ChakraProvider value={defaultSystem} >
      <ColorModeProvider>

        <App />
      </ColorModeProvider>
    </ChakraProvider>

    {/* </Provider> */}
  </BrowserRouter>
)
