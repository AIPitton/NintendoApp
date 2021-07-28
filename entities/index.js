import Matter from "matter-js"
import Bird from "../components/Bird";
import Floor from "../components/Floor";
import Obstacle from "../components/Obstacle";
import { Dimensions } from 'react-native'
import { getPipeSizePosPair } from "../utils/random";

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width
export default restart => {
    let engine = Matter.Engine.create({ enableSleeping: false })
    let world = engine.world
    engine.gravity.y = 0.3;
    const pipeSizePosA = getPipeSizePosPair()
    const pipeSizePosB = getPipeSizePosPair(windowWidth * 1.2)    
    return {
        physics: { engine, world },
        Bird: Bird(world, 'black', { x: 20, y: 300 }, { height: 20, width: 20 }),
        ObstacleTop1: Obstacle(world, 'ObstacleTop1', 'green', pipeSizePosA.pipeTop.pos, pipeSizePosA.pipeTop.size),
        ObstacleBottom1: Obstacle(world, 'ObstacleBottom1', 'green', pipeSizePosA.pipeBottom.pos, pipeSizePosA.pipeBottom.size),
        ObstacleTop2: Obstacle(world, 'ObstacleTop2', 'green', pipeSizePosB.pipeTop.pos, pipeSizePosB.pipeTop.size),
        ObstacleBottom2: Obstacle(world, 'ObstacleBottom2', 'green', pipeSizePosB.pipeBottom.pos, pipeSizePosB.pipeBottom.size),
        Floor: Floor(world, 'black', { x: windowWidth / 2, y: windowHeight }, { height: 34, width: windowWidth })
    }
}