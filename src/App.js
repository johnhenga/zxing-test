import "./App.css";
// import ScannerComponent from './components/ScannerComponent';
import Aloha from "./components/aloha";
import ScannerComponent from "./components/ScannerComponent";

const getBarcode = (barcode, err) => {
  console.log('handleBarcode', barcode, err);
  
  if (err) {
    return;
  }
  // setBarcode(barcode.text);
  // history.goBack();
};

function App() {
  return (
    <div className="App">
      {/* <Aloha started={false}  showButtons={true} /> */}
      <ScannerComponent
        started={true}
        onResult={getBarcode}
        showButtons={true}
      />
    </div>
  );
}

export default App;
