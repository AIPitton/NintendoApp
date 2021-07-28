import Matter from 'matter-js'
import React from 'react'
import { View, Image } from 'react-native'
import Images  from '../assets/Images'
import styles from '../styles/styles'

const Floor = props => {
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y
    const xBody = props.body.position.x - widthBody /2
    const yBody = props.body.position.y - heightBody /2
    const color = props.color;
    const imageRepeat = Math.ceil(widthBody / heightBody)
    return(
        <View style={{
            // borderWidth: 1,
            // backgroundColor: color,
            // borderStyle: 'solid',
            position: 'absolute',
            left: xBody,
            top: yBody,
            width: widthBody,
            height: heightBody,
            overflow: 'hidden',
            flexDirection:'row'
        }}>
        {/* {Array.apply(null, Array(imageRepeat)).map((el, idx) => {
            return <Image style={{width: widthBody, height: heightBody}} key={idx} resizeMode="stretch" source={Images.floor}/>           
        })} */}        
        </View>
    )
}
export default (world, color, pos, size) => {
   const initialFloor = Matter.Bodies.rectangle(
       pos.x,
       pos.y,
       size.width,
       size.height,
       {
           label: 'Floor',
           isStatic: true
        }
   )
   Matter.World.add(world, initialFloor)
   return {
       body: initialFloor,
       color,
       pos,
       renderer: <Floor/>
   }
}

