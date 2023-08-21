import BalanceTable from "../balanceTable/balanceTable";
import { Header } from "../header/header";
import OperationsBar from "../operationsBar/operationsBar";

export function MainApp() {
  return (
    <div className="container">
      <Header />
      <OperationsBar />
      <BalanceTable />
    </div>
  );
}
