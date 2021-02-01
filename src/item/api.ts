import {Item} from "./types";

export default {
  list: (): Promise<Item[]> => {
    return new Promise<Item[]>((resolve, reject) => {
      try {
        const localItems: Item[] = JSON.parse(localStorage.getItem("itemList") as string) || [];

        setTimeout(() => {
          resolve(localItems);
        }, 1000);
      } catch (error) {
        reject(error);
      }
    });
  },
  create: (text: Item["text"]): Promise<Item> => {
    return new Promise<Item>((resolve, reject) => {
      try {
        const localItems: Item[] = JSON.parse(localStorage.getItem("itemList") as string) || [];

        const newItem = {id: +new Date(), text};

        localItems.push(newItem);
        localStorage.setItem("itemList", JSON.stringify(localItems));

        setTimeout(() => {
          resolve({id: +new Date(), text});
        }, 1000);
      } catch (error) {
        reject(error);
      }
    });
  },
  remove: (id: Item["id"]): Promise<Item["id"]> => {
    return new Promise<Item["id"]>((resolve, reject) => {
      try {
        const localItems: Item[] = JSON.parse(localStorage.getItem("itemList") as string) || [];

        const newItems = localItems.filter((item) => item.id !== id);

        localStorage.setItem("itemList", JSON.stringify(newItems));

        setTimeout(() => {
          resolve(id);
        }, 1000);
      } catch (error) {
        reject(error);
      }
    });
  },
};
