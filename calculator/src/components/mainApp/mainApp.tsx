import { OperationsProvider } from "../../contexts/Operations/OperationsProvider";
import BalanceTable from "../balanceTable/balanceTable";
import { Header } from "../header/header";
import OperationsBar from "../operationsBar/operationsBar";

export function MainApp() {
  return (
    <OperationsProvider>
      <div className="container">
        <Header />
        <OperationsBar />
        <BalanceTable />
      </div>
    </OperationsProvider>
  );
}
