import "./App.css";
import ScannerComponent from "./components/ScannerComponent";
// import ScannerComponent from "./components/Aloha";

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
      <ScannerComponent
        started={true}
        onResult={getBarcode}
        showButtons={true}
      />
    </div>
  );
}

export default App;
