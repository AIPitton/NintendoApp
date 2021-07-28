import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, Button, Image, Stylesheet } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import entities from './entities/index';
import Physics from './physics/physics';
import Images  from './assets/Images'
import styles from './styles/styles'

export default function App() {
  const [running, setRunning] = useState(false)
  const [gameEngine, setGameEngine] = useState(null)
  const [currentPoints, setCurrentPoints] = useState(0)
  const [pause, setPause] = useState(false)
  const [restartLevel, setRestartLevel] = useState(true)
  useEffect(() => {
    setRunning(false)
    setPause(false)
    setRestartLevel(true)
  }, [])
  return (
    <View style={{ flex: 1, backgroundColor:"#008080" }}>
      <Image source={Images.background} style={styles.backgroundImage} resizeMode="stretch" />   
      <Text style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold', margin: 20 }}>{currentPoints}</Text>
      <GameEngine
        ref={(ref) => { setGameEngine(ref) }}
        systems={[Physics]}
        entities={entities()}
        running={running}
        onEvent={(e) => {
          switch (e.type) {
            case 'game_over':
              setRunning(false)
              setRestartLevel(true)
              gameEngine.stop()
              break;
            case 'new_point':
              setCurrentPoints(currentPoints + 1)
              break;
          }
        }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      >
      <Text style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold', margin: 20, color: 'red'}}>{currentPoints}</Text>
      <StatusBar style="auto" hidden={true} /> 
      </GameEngine>
      {!running && !pause ?
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity style={{ backgroundColor: 'red', borderRadius:10, paddingHorizontal: 30, paddingVertical: 10, borderWidth:3}}
          onPress={() => {
            setCurrentPoints(0)
            setRunning(true)
            setRestartLevel(false)
            gameEngine.swap(entities())
          }}>
        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 30 }}>START</Text>
        </TouchableOpacity>
      </View> 
      :
      <View>      
      {running && !restartLevel ? 
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity style={{ backgroundColor: 'red', borderRadius:10,  paddingHorizontal: 30, paddingVertical: 40, paddingTop:13, borderWidth:3}}
            onPress={() => {
              setRunning(false)
              setPause(true)
            }}>
        <Text style={{ fontWeight: 'bold', color: 'black', fontSize:20  }}>PAUSE</Text>
        </TouchableOpacity>
      </View>
      :
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>  
        <TouchableOpacity style={{ backgroundColor: 'red', borderRadius:10, paddingHorizontal: 30, paddingVertical: 40, paddingTop:13, borderWidth:3}}
          onPress={() => {
            setRunning(true)
            setPause(false)
          }}>
          <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 20,  }}>RESUME</Text>
        </TouchableOpacity>
      </View>  
      }   
      </View>
      }
    </View>
  )
}


