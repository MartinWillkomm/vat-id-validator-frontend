import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import FormComponent from './FormComponent';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          <h3>Demo Application using a rest backend to validate VAT-IDs</h3>
        </p>
        <FormComponent></FormComponent>
      </header>
    </div>
  );
}
export default App;
