import React, { useState } from "react"
import { Text, View } from "react-native"
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import useValidatedState from "../features/hooks/useValidatedState"
import { emailValidator, nameValidator, phoneValidator } from "../features/validators"
import Button from "../components/Button"
import PhoneField from "../components/PhoneField"
import TextField from "../components/TextField"
import Checkbox from "../components/Checkbox"
import type { NativeStackParamsList } from "../features/types"
import Layout from "../components/Layout"

const Form = ({ navigation }: NativeStackScreenProps<NativeStackParamsList, "Form">) => {
  const [name, setName, nameError, setNameShouldValidate] = useValidatedState(
    nameValidator
  )
  const [email, setEmail, emailError, setEmailShouldValidate] = useValidatedState(
    emailValidator
  )
  const [countryCode, setCountryCode] = useState("+7")
  const [phone, setPhone, phoneError, setPhoneShouldValidate] = useValidatedState(
    phoneValidator
  )
  const [privacyAgreed, setPrivacyAgreed] = useState(false)

  const submitDisabled = !!nameError || !!emailError || !!phoneError || !privacyAgreed

  const submit = () => {
    fetch("https://postman-echo.com/post", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        phone: countryCode + phone,
      }),
    })
      .then((r) => r.json())
      .then(({ data }) => navigation.navigate("Success", JSON.parse(data)))
  }

  return (
    <Layout>
      <View style={{ paddingTop: 80, gap: 16, flex: 1 }}>
        <View style={{ paddingHorizontal: 8, paddingBottom: 32, gap: 16 }}>
          <Text style={{ textAlign: "center", fontSize: 24, lineHeight: 34, fontWeight: "600" }}>
            Book a slot
          </Text>
          <Text style={{ textAlign: "center", fontSize: 15, lineHeight: 20, fontWeight: "400", color: "#60626D" }}>
            Leave a request and we will get back to you within the hour
          </Text>
        </View>
        <TextField
          value={name}
          errorMessage={nameError}
          placeholder="Name"
          onChange={setName}
          onFocus={setNameShouldValidate}
        />
        <TextField
          value={email}
          errorMessage={emailError}
          placeholder="Email"
          keyboardType="email-address"
          onChange={setEmail}
          onFocus={setEmailShouldValidate}
        />
        <PhoneField
          countryCode={countryCode}
          phone={phone}
          phoneError={phoneError}
          onSelectCountryCode={setCountryCode}
          onChangePhone={setPhone}
          onFocusPhone={setPhoneShouldValidate}
        />
        <Button text="Submit" disabled={submitDisabled} onPress={submit} style={{ marginTop: "auto" }} />
        <Checkbox label="I agree to the privacy policy" selected={privacyAgreed} setSelected={setPrivacyAgreed} />
      </View>
    </Layout>
  )
}

export default Form
