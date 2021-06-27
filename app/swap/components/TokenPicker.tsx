import { HStack, Input, Select, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { TokenData } from '../models/models'

interface TokenPickerProps {
  active?: TokenData
  disabled?: TokenData
  setActive: (token: TokenData) => void
  tokens: TokenData[]
}

export default function TokenPicker({ active, disabled, setActive, tokens }: TokenPickerProps) {
  const borderColor = useColorModeValue('blackAlpha.300', 'whiteAlpha.500')
  const placeholderColor = useColorModeValue('blackAlpha.600', 'whiteAlpha.600')
  const textColor = useColorModeValue('blackAlpha.700', 'whiteAlpha.800')
  const focusColor = useColorModeValue('teal.600', 'teal.100')

  const selectionHandler = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      event.preventDefault()
      const {
        currentTarget: { value },
      } = event
      const newToken = value && tokens.find(({ id }: TokenData) => id === value)
      if (newToken) {
        setActive(newToken)
      }
    },
    [setActive]
  )

  const tokenOptions = React.useMemo(
    () =>
      tokens.map(({ id, name }: TokenData) => (
        <option disabled={disabled?.id === id} key={id} value={id}>
          {name}
        </option>
      )),
    [disabled, tokens]
  )

  return (
    <HStack spacing="10px">
      <Select
        _hover={{ borderColor: focusColor }}
        _placeholder={{ color: placeholderColor }}
        borderColor={borderColor}
        focusBorderColor={focusColor}
        onChange={selectionHandler}
        placeholder="Select token"
        textColor={textColor}
        value={active?.id}
      >
        {tokenOptions}
      </Select>
      <Input
        _hover={{ borderColor: focusColor }}
        _placeholder={{ color: placeholderColor }}
        borderColor={borderColor}
        focusBorderColor={focusColor}
        placeholder="Amount"
        step={parseFloat(`0.${'0'.repeat(Math.min(8, active?.decimals || 1))}1`)}
        textColor={textColor}
        type="number"
        w="220px"
      />
    </HStack>
  )
}
