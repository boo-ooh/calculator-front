import { SearchOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import type { InputRef } from "antd";
import { Button, Divider, Input, Space, Table } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";

interface RecordType {
  id: number;
  operation: string;
  amount: number;
  userBalance: number;
  operationResponse: string;
  date: string;
}

type DataIndex = keyof RecordType;

const data: RecordType[] = [
  {
    id: 1,
    operation: "addition",
    amount: 5,
    userBalance: 995,
    operationResponse: "44",
    date: new Date().toISOString(),
  },
  {
    id: 2,
    operation: "subtraction",
    amount: 5,
    userBalance: 990,
    operationResponse: "4",
    date: new Date().toISOString(),
  },
  {
    id: 3,
    operation: "division",
    amount: 10,
    userBalance: 980,
    operationResponse: "55",
    date: new Date().toISOString(),
  },
  {
    id: 4,
    operation: "square_root",
    amount: 15,
    userBalance: 965,
    operationResponse: "2",
    date: new Date().toISOString(),
  },
  {
    id: 4,
    operation: "square_root",
    amount: 15,
    userBalance: 965,
    operationResponse: "2",
    date: new Date().toISOString(),
  },
  {
    id: 4,
    operation: "square_root",
    amount: 15,
    userBalance: 965,
    operationResponse: "2",
    date: new Date().toISOString(),
  },
  {
    id: 4,
    operation: "square_root",
    amount: 15,
    userBalance: 965,
    operationResponse: "2",
    date: new Date().toISOString(),
  },
  {
    id: 4,
    operation: "square_root",
    amount: 15,
    userBalance: 965,
    operationResponse: "2",
    date: new Date().toISOString(),
  },
  {
    id: 4,
    operation: "square_root",
    amount: 15,
    userBalance: 965,
    operationResponse: "2",
    date: new Date().toISOString(),
  },
  {
    id: 4,
    operation: "square_root",
    amount: 15,
    userBalance: 965,
    operationResponse: "2",
    date: new Date().toISOString(),
  },
  {
    id: 4,
    operation: "square_root",
    amount: 15,
    userBalance: 965,
    operationResponse: "2",
    date: new Date().toISOString(),
  },
  {
    id: 4,
    operation: "square_root",
    amount: 15,
    userBalance: 965,
    operationResponse: "2",
    date: new Date().toISOString(),
  },
  {
    id: 4,
    operation: "square_root",
    amount: 15,
    userBalance: 965,
    operationResponse: "2",
    date: new Date().toISOString(),
  },
  {
    id: 4,
    operation: "square_root",
    amount: 15,
    userBalance: 965,
    operationResponse: "2",
    date: new Date().toISOString(),
  },
];

const BalanceTable: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<RecordType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<RecordType> = [
    {
      title: "Operation",
      dataIndex: "operation",
      key: "operation",
      ...getColumnSearchProps("operation"),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      ...getColumnSearchProps("amount"),
      sorter: (a, b) => a.amount - b.amount,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "User Balance",
      dataIndex: "userBalance",
      key: "userBalance",
      ...getColumnSearchProps("userBalance"),
      sorter: (a, b) => a.userBalance - b.userBalance,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Operation Response",
      dataIndex: "operationResponse",
      key: "operationResponse",
      ...getColumnSearchProps("operationResponse"),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      ...getColumnSearchProps("date"),
    },
  ];

  return (
    <>
      <Divider>Your balance</Divider>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default BalanceTable;
