
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Form from "./pages/Form"
import useOrientation from "./features/hooks/useOrientation"
import OrientationContext from "./features/OrientationContext"
import Success from "./pages/Success"
import { NativeStackParamsList } from "./features/types"

const App = () => {
  const isAlbum = useOrientation()

  return (
    <OrientationContext.Provider value={{ isAlbum }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "transparent" } }}>
          <Stack.Screen name="Form" component={Form} />
          <Stack.Screen name="Success" component={Success} />
        </Stack.Navigator>
      </NavigationContainer>
    </OrientationContext.Provider>
  )
}

const Stack = createNativeStackNavigator<NativeStackParamsList>()

export default App
