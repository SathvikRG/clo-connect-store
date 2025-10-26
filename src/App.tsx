import { Provider } from 'react-redux'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { store } from './store'
import { theme } from './theme'
import StorePage from './features/store/StorePage'

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <StorePage />
      </ThemeProvider>
    </Provider>
  );
}

export default App
