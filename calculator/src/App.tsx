import "./App.css";
import BalanceTable from "./components/balanceTable/balanceTable";
import { Header } from "./components/header/header";
import OperationsBar from "./components/operationsBar/operationsBar";

function App() {
  return (
    <div className="container">
      <Header username="Bruna" />
      <OperationsBar />
      <BalanceTable />
    </div>
  );
}

export default App;
