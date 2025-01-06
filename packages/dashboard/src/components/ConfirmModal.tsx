import React, { FC } from "react";
import ParamLink from "./ParamLink";
import Button from "./Button";
import Modal from "./Modal";
import { Field, Input } from "./Fields";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/solid";
interface ConfirmModalProps {
  name: string;
  title: string;
  content: string;
  callBackButtonName?: string;
  callBack: () => void;
}
const ConfirmModal: FC<ConfirmModalProps> = ({
  name,
  title,
  content,
  callBack,
  callBackButtonName = "Confirm",
}) => {
  return (
      <Modal
        name={name}
        className=""
      >
        <div className="">
          <h1 className="text-xl font-bold">{title}</h1>
          <div className="w-full pt-4">
            <p className="text-neutral-700 mb-4">{content}</p>
            <div className="flex justify-end gap-4">
              <Button className="bg-red-600 text-white" onClick={callBack}>
                {callBackButtonName}
              </Button>
              <ParamLink params={{ [name]: "0" }}>
              <Button className="bg-gray-600 text-white">Cancel</Button>
              </ParamLink>
            </div>
          </div>
        </div>
      </Modal>
  );
};

export default ConfirmModal;
