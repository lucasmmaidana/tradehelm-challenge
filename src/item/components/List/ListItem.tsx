import React from "react";

import LoadingIcon from "../../../ui/icons/LoadingIcon";
import TrashIcon from "../../../ui/icons/TrashIcon";

import styles from "./ListItem.module.scss";

enum Status {
  Init = "init",
  Succes = "succes",
}

interface Props {
  onRemove: VoidFunction;
}

const ListItem: React.FC<Props> = ({children, onRemove}) => {
  const [status, setStatus] = React.useState<Status>(Status.Init);

  function deleteItem() {
    setStatus(Status.Succes);
    onRemove();
  }

  return (
    <li className={styles.container}>
      <span>{children}</span>
      <button onClick={() => deleteItem()}>
        <span className="hidden">Delete</span>
        {status === Status.Init ? <TrashIcon /> : <LoadingIcon />}
      </button>
    </li>
  );
};

export default ListItem;
