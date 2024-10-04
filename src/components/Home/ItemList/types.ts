import React from "react";

export interface ItemListProps<Item> {
  items: Item[];
  renderCallback: (item: Item) => React.ReactNode;
}
