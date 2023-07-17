import { View } from "react-native"
import Select from "./Select"
import TextField from "./TextField"


const PhoneField = ({
  countryCode,
  phone,
  phoneError,
  onSelectCountryCode,
  onChangePhone,
  onFocusPhone,
}: Props) => {

  return (
    <View style={{ flexDirection: "row", gap: 4 }}>
      <Select
        options={options}
        value={countryCode}
        roundedLeft={true}
        onSelect={onSelectCountryCode}
        style={{ width: 56 }}
      />
      <TextField
        value={phone}
        errorMessage={phoneError}
        placeholder="Phone"
        keyboardType="phone-pad"
        roundedLeft={false}
        noLabel={true}
        onChange={onChangePhone}
        onFocus={onFocusPhone}
        mask={(v) => v.match(/([0-9]{1,3})([0-9]{1,3})?([0-9]{1,2})?([0-9]{1,2})?([0-9]{1,2})?([0-9])?/)?.slice(1)?.filter(Boolean)?.join(" ") || ""}
        unmask={(v) => v.replaceAll(" ", "").slice(0, 13)}
        style={{ flexGrow: 1 }}
      />
    </View>
  )
}

const options = ["+1", "+7"].map((o) => ({ label: o, value: o }))

type Props = {
  countryCode: string,
  phone: string,
  phoneError: string,
  onSelectCountryCode: (value: string) => void,
  onChangePhone: (value: string) => void,
  onFocusPhone: () => void,
}

export default PhoneField
