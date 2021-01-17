import './App.css';
import Shortener from './component/Shortener'
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import theme from './theme'

function App () {
  return (
    <ThemeProvider theme={ theme }>
      <div className="App">
        <div className="page--wrapper">
          <header className="App-header">
            URL Shortener
          </header>
          <Shortener/>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
