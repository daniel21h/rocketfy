import React, { useRef, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd'

import BoardContext from '../Board/context'

import { Container, Label } from './styles';

export default function Card({ data, index, listIndex }) {
  const ref = useRef()
  const { move } = useContext(BoardContext)

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'CARD', index, listIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, dropRef] = useDrop({
    accept: 'CARD',

    /* Este item, é qual o card está sendo arrastado */
    hover(item, monitor) {
      const draggedListIndex = item.listIndex
      const targetListIndex = listIndex

      /* local e altura da troca de posição dentro da mesma lista */
      const draggedIndex = item.index
      const targetIndex = index
      
      if (draggedIndex === targetIndex && draggedListIndex === targetListIndex) {
        return
      }

      const targetSize = ref.current.getBoundingClientRect()
      const targetCenter = (targetSize.bottom - targetSize.top) / 2

      const draggedOffset = monitor.getClientOffset()
      const draggedTop = draggedOffset.y - targetSize.top

      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return
      }

      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return
      }

      //Definindo a troca
      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex)

      item.index = targetIndex
      item.listIndex = targetListIndex
    }
  })

  dragRef(dropRef(ref))

  return (
    <Container ref={ref} isDragging={isDragging}>
      <header> 
        {/* Rendering label */}
        {data.labels.map(label => <Label key={label} color={label} />)}
      </header>
      <p>{data.content}</p>

      {/* Verificação */}
      { data.user && <img src={data.user} alt=""/> }
    </Container>
  );
}
