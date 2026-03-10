import { ThemeProvider } from './components/ThemeProvider.jsx';
import Home from './pages/Home.jsx';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      <Home />
    </ThemeProvider>
  );
}

export default App;
