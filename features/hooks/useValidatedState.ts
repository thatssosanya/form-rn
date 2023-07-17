import { useEffect, useState } from "react"

const useValidatedState = (validator: Validator): ReturnValue => {
  const [value, _setValue] = useState("")
  const [error, setError] = useState<ErrorMessage>("")
  const [shouldValidate, setShouldValidate] = useState(false)
  useEffect(() => {
    if (shouldValidate) {
      setError(validator(value))
    }
  }, [shouldValidate])
  const setValue = (text: string) => {
    _setValue(text)
    if (shouldValidate) {
      setError(validator(text))
    }
  }

  return [value, setValue, error, () => setShouldValidate(true)]
}

type ErrorMessage = string
type Validator = (text: string) => ErrorMessage
type ReturnValue = [string, (text: string) => void, ErrorMessage, () => void]

export default useValidatedState
