import React from "react";
import { ItemListProps } from "./types";

function ItemList<Item>({ items, renderCallback }: ItemListProps<Item>) {
  return (
    <>
      {items.map((item: Item, i: number) => (
        <React.Fragment key={i}>{renderCallback(item)}</React.Fragment>
      ))}
    </>
  );
}
export default ItemList;
