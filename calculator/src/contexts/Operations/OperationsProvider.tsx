import { useApi } from "../../hooks/useApi";
import { useState } from "react";
import { RecordType } from "../../components/balanceTable/balanceTable";
import { OperationsContext } from "./OperationContext";

export const OperationsProvider = ({ children }: { children: JSX.Element }) => {
  const [balance, setBalance] = useState<number>(0);
  const [recordData, setRecordData] = useState<[RecordType] | []>([]);
  const api = useApi();

  const updateOperations = async () => {
    const data = await api.getUserCredit();
    setBalance(data);
    const recData = await api.getUserRecords();
    setRecordData(recData);
  };

  return (
    <OperationsContext.Provider
      value={{ balance, recordData, updateOperations }}
    >
      {children}
    </OperationsContext.Provider>
  );
};
