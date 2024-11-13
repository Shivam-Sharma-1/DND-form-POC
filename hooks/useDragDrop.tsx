"use client";

import { useState } from "react";

export interface Data {
  id: string;
  title: string;
}

export const useDragAndDrop = (initialState: Data[]) => {
  const [isDragging, setIsDragging] = useState(false);
  const [listItems, setListItems] = useState<Data[]>(initialState);

  const handleUpdateList = (id: string, title: string) => {
    setListItems((prev: Data[]) => [...prev, { id, title }]);
  };

  const handleDragging = (dragging: boolean) => setIsDragging(dragging);

  return {
    isDragging,
    listItems,
    handleUpdateList,
    handleDragging,
  };
};
