import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd'

import { Container, Label } from './styles';

export default function Card({ data }) {
  const ref = useRef()

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'CARD', id: data.id },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, dropRef] = useDrop({
    accept: 'CARD',

    /* Este item, é qual o card está sendo arrastado */
    hover(item, monitor) {

      /* id do card que estou arrastando */
      console.log(item.id)
      /*  */
      console.log(data.id)
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
