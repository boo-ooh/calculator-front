import { SearchOutlined } from "@ant-design/icons";
import React, { useRef, useState, useEffect, useContext } from "react";
import Highlighter from "react-highlight-words";
import type { InputRef } from "antd";
import { Button, Divider, Input, Modal, Space, Table, Tooltip } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { useApi } from "../../hooks/useApi";
import { OperationsContext } from "../../contexts/Operations/OperationContext";

export interface RecordType {
  id: number;
  operation: string;
  amount: number;
  userBalance: number;
  operationResponse: string;
  date: string;
}

type DataIndex = keyof RecordType;

const BalanceTable: React.FC = () => {
  const [data, setData] = useState<[RecordType] | []>([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const api = useApi();
  const operationsCtx = useContext(OperationsContext);
  const [infoModal, contextHolder] = Modal.useModal();

  useEffect(() => {
    api.getUserRecords().then((res) => {
      setData(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setData(operationsCtx.recordData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operationsCtx.recordData]);

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
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="A deleted record will no longer be displayed, but the amount expended won't return as credit!">
            <a
              onClick={() => {
                handleDelete(record);
              }}
            >
              Delete
            </a>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleDelete = (record: RecordType) => {
    Modal.confirm({
      title: "Delete",
      content: "Are you sure you want to delete operation record?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        api
          .deleteUserRecord(record.id)
          .then(() => {
            operationsCtx.updateOperations();
          })
          .catch((error) => {
            console.log(error);
            infoModal.error({
              title: "Error",
              content: <h4>Operation was not deleted. Try again later.</h4>,
            });
          });
      },
      onCancel: () => {},
    });
  };

  return (
    <>
      <Divider>Your balance</Divider>
      <Table columns={columns} dataSource={data} rowKey={"id"} />
      {contextHolder}
    </>
  );
};

export default BalanceTable;
