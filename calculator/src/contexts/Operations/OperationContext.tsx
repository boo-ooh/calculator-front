import { createContext } from "react";
import { RecordType } from "../../components/balanceTable/balanceTable";

export type OperationsContextType = {
  balance: number;
  recordData: [RecordType] | [];
  updateOperations: () => void;
};

export const OperationsContext = createContext<OperationsContextType>(null!);
