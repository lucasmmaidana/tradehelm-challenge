import * as React from "react";

import {Item} from "../item/types";
import Button from "../ui/controls/Button";
import api from "../item/api";
import Modal, {ModalFooter} from "../ui/controls/Modal";
import TextField from "../ui/controls/TextField";
import PlusIcon from "../ui/icons/PlusIcon";
import List, {ListItem} from "../item/components/List";

import styles from "./App.module.scss";
import LoadingIcon from "./../ui/icons/LoadingIcon";

enum Status {
  Init = "init",
  Succes = "succes",
}

interface Form extends HTMLFormElement {
  text: HTMLInputElement;
}

const App: React.FC = () => {
  const [items, setItems] = React.useState<Item[]>([]);
  const [status, setStatus] = React.useState<Status>(Status.Init);
  const [isModalVisible, toggleModal] = React.useState<boolean>(false);

  function remove(id: Item["id"]) {
    api.remove(id).then(() => setItems((items) => items.filter((item) => item.id !== id)));
  }

  function add(event: React.FormEvent<Form>) {
    event.preventDefault();

    const text = event.currentTarget.text.value.trim();

    if (!text) return;

    event.currentTarget.text.disabled = true;
    event.currentTarget.add.disabled = true;
    event.currentTarget.add.value = "Adding...";
    api.create(text).then((item) => {
      setItems((items) => items.concat(item));
      toggleModal(false);
    });
  }

  React.useEffect(() => {
    api.list().then((items) => {
      setItems(items);
      setStatus(Status.Succes);
    });
  }, []);

  if (status === Status.Init) {
    return <LoadingIcon />;
  }

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>Supermarket List</h1>
        <h3>{items.length} item(s)</h3>
      </header>
      <List>
        {items.map((item) => (
          <ListItem key={item.id} onRemove={() => remove(item.id)}>
            {item.text}
          </ListItem>
        ))}
      </List>
      <Button autoFocus colorScheme="primary" onClick={() => toggleModal(true)}>
        <PlusIcon />
        Add item
      </Button>
      {isModalVisible && (
        <Modal onClose={() => toggleModal(false)}>
          <form onSubmit={add}>
            <h2>Add item</h2>
            <TextField autoFocus required name="text" type="text" />
            <ModalFooter>
              <Button type="button" onClick={() => toggleModal(false)}>
                Cancel
              </Button>
              <Button colorScheme="primary" name="add" type="submit">
                <PlusIcon />
                Add
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      )}
    </main>
  );
};

export default App;
