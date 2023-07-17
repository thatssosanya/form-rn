import { View, Text } from "react-native"
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import Button from "../components/Button"
import { NativeStackParamsList } from "../features/types"
import Layout from "../components/Layout"

const Success = ({ navigation, route }: NativeStackScreenProps<NativeStackParamsList, "Success">) => {
  const { name, email, phone } = route.params
  const nameInsert = name && (" " + name)
  const contactsInsert = [
    email && (" at " + email + " "),
    phone && (" on " + phone + " ")
  ].filter(Boolean).join("or") || " "

  return (
    <Layout>
      <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 8, paddingBottom: 32, gap: 16 }}>
        <Text style={{ textAlign: "center", fontSize: 24, lineHeight: 34, fontWeight: "600" }}>
          Success
        </Text>
        <Text style={{ textAlign: "center", fontSize: 15, lineHeight: 20, fontWeight: "400", color: "#60626D" }}>
          Thank you{nameInsert}!
          We will get back to you{contactsInsert}within the hour
        </Text>
      </View>
      <Button text="OK" onPress={() => navigation.navigate("Form")} style={{ marginTop: "auto" }} />
    </Layout>
  )
}

export default Success
