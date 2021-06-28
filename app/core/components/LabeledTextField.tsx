import React from 'react'
import { FormControl, FormLabel, Input, FormErrorMessage, useColorModeValue } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

export interface LabeledTextFieldProps {
  name: string
  label: string
  isRequired?: boolean
  placeholder?: string
  type?: 'text' | 'password' | 'email' | 'number'
}

export default function LabeledTextField({ isRequired, label, name, placeholder, type }: LabeledTextFieldProps) {
  const borderColor = useColorModeValue('blackAlpha.300', 'whiteAlpha.500')
  const placeholderColor = useColorModeValue('blackAlpha.600', 'whiteAlpha.600')
  const textColor = useColorModeValue('blackAlpha.700', 'whiteAlpha.800')
  const focusColor = useColorModeValue('teal.600', 'teal.100')
  const {
    clearErrors,
    formState: { isSubmitting, errors, touchedFields },
    register,
  } = useFormContext()
  const isTouched = touchedFields[name]
  const error = Array.isArray(errors[name]) ? errors[name].join(', ') : errors[name]?.message || errors[name]

  return (
    <FormControl id={name} isRequired={isRequired} isInvalid={error && isTouched}>
      <FormLabel>{label}</FormLabel>
      <Input
        {...register(name)}
        _placeholder={{ color: placeholderColor }}
        borderColor={borderColor}
        focusBorderColor={focusColor}
        isDisabled={isSubmitting}
        name={name}
        onFocus={() => clearErrors(name)}
        textColor={textColor}
        type={type}
        placeholder={placeholder}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  )
}
