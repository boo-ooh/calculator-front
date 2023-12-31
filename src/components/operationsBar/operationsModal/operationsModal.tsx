import { Modal } from "antd";
import { OpTypes, Operation } from "../../../types/Operation";
import { InputNumber } from "antd";
import { useState, useContext, useEffect } from "react";
import { useApi } from "../../../hooks/useApi";
import { OperationsContext } from "../../../contexts/Operations/OperationContext";

type OperationsModalProps = {
  operation: Operation | null;
  isModalOpen: boolean;
  setIsModalOpen: (status: boolean) => void;
};

const zeroParametersOp = [OpTypes.random_string];
const oneParameterOp = [OpTypes.square_root];

const OperationsModal: React.FC<OperationsModalProps> = (props) => {
  const [paramOne, setParamOne] = useState<number>(0);
  const [paramTwo, setParamTwo] = useState<number>(0);
  const [resultModal, contextHolder] = Modal.useModal();
  const api = useApi();
  const operationsCtx = useContext(OperationsContext);

  useEffect(() => {
    setParamOne(0);
    setParamTwo(0);
  }, [props.isModalOpen]);

  const handleCancel = () => {
    props.setIsModalOpen(false);
  };

  const onChangeOne = (value: number | null) => {
    if (value == null) {
      value = 0;
    }
    setParamOne(value);
  };

  const onChangeTwo = (value: number | null) => {
    if (value == null) {
      value = 0;
    }
    setParamTwo(value);
  };
  const handleOk = () => {
    Modal.confirm({
      title: "Add",
      content:
        "This operation will cost you $" + props.operation?.cost + ". Proceed?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        props.setIsModalOpen(false);
        if (props.operation != null) {
          api
            .performOperation(props.operation, paramOne, paramTwo)
            .then((response) => {
              resultModal.info({
                title: "Your result:",
                content: <h2>{response}</h2>,
              });
              operationsCtx.updateOperations();
            })
            .catch((error) => {
              resultModal.error({
                title: "Error",
                content: <h2>{error.response.data}</h2>,
              });
            });
        }
      },
      onCancel: () => {},
    });
  };

  function isZeroParametersOp() {
    return (
      props.operation != null &&
      zeroParametersOp.includes(props.operation?.type)
    );
  }

  function isOneParameterOp() {
    return (
      props.operation != null && oneParameterOp.includes(props.operation?.type)
    );
  }

  return (
    <div className="operations-modal">
      <Modal
        open={props.isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Calculate"
      >
        <h1>{props.operation?.displayName}</h1>
        <div className="parameters">
          {!isZeroParametersOp() && (
            <div>
              <InputNumber value={paramOne} onChange={onChangeOne} />
            </div>
          )}
          {!isZeroParametersOp() && !isOneParameterOp() && (
            <div>
              <h4>AND</h4>
              <InputNumber value={paramTwo} onChange={onChangeTwo} />
            </div>
          )}
        </div>
      </Modal>
      {contextHolder}
    </div>
  );
};

export default OperationsModal;
