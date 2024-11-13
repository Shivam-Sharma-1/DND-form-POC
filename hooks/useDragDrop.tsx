"use client";

import { useState } from "react";

export interface Data {
  id: string;
  title: string;
}

export const useDragAndDrop = (initialState: Data[]) => {
  const [isDragging, setIsDragging] = useState(false);
  const [listItems, setListItems] = useState<Data[]>(initialState);

  const handleUpdateList = (id: string, title: string, position?: number) => {
    if (position !== undefined) {
      if (listItems.find((item) => item.id === id)) {
        setListItems((prev: Data[]) => prev.filter((item) => item.id !== id));
      }
      setListItems((prev: Data[]) => [
        ...prev.slice(0, position),
        { id, title },
        ...prev.slice(position),
      ]);
    } else setListItems((prev: Data[]) => [...prev, { id, title }]);
  };

  const handleDragging = (dragging: boolean) => setIsDragging(dragging);

  return {
    isDragging,
    listItems,
    handleUpdateList,
    handleDragging,
  };
};
