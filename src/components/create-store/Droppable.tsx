
import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export function Droppable(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    opacity: isOver ? 1 : 1,

  };

  return (
    <div ref={setNodeRef} style={style} className='flex flex-col border-dashed border border-dashed border-gray-800 p-8 mt-4'>
      {props.children}
    </div>
  );
}

