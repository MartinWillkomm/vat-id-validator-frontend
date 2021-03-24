import './App.css';
import VatIdValidationForm from './validation/VatIdValidationForm';
import * as Constants from './constants/Constants'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h4>React Demo App using a Spring Boot rest backend to validate VAT-IDs</h4>
        <br/>
        <VatIdValidationForm></VatIdValidationForm>
      </header>
    </div>
  );
}
export default App;
