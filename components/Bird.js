import Matter from 'matter-js'
import React from 'react'
import { View, Image } from 'react-native'
import Images  from '../assets/Images'
import styles from '../styles/styles'

const Bird = props => {
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y    
    const xBody = props.body.position.x - widthBody /2
    const yBody = props.body.position.y - heightBody /2
    const color = props.color;
    const imgBird = Images['bird']
    return(
        <Image style={{
            // borderWidth: 1,
            // backgroundColor: color,
            // borderStyle: 'solid',
            position: 'absolute',
            left: xBody,
            top: yBody,
            width: widthBody,
            height: heightBody
        }}  source={imgBird} resizeMode="stretch" />
    )
}
export default (world, color, pos, size) => {
   const initialBird = Matter.Bodies.rectangle(
       pos.x,
       pos.y,
       size.width,
       size.height,
       {label: 'Bird'}
   )
   Matter.World.add(world, initialBird)
   return {
       body: initialBird,
       color,
       pos,
       renderer: <Bird/>
   }
}

