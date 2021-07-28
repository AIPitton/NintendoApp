import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width
export default styles = StyleSheet.create({
    backgroundImage: {
      position:"absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: windowHeight,
      height: windowHeight,
    }
})



