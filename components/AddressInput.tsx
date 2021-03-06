import React from 'react'
import TextInput from './TextInput'

const AddressInput: React.FC<{
  addressValue: String
  addressValue2: String
  addressState: any
  addressState2: any
  cityState: any
  cityValue: String
  zipCodeState: any
  zipCodeValue: String
  USStateState: any
  USStateValue: String
}> = ({
  addressValue,
  addressValue2,
  addressState,
  addressState2,
  cityState,
  cityValue,
  zipCodeState,
  zipCodeValue,
  USStateState,
  USStateValue,
}) => {
  return (
    <div className=" my-12">
      <TextInput
        type="Address"
        widthPercentage="w-[80%]"
        placeHolder="Address"
        onChange={(text: any) => {
          addressState(text.target.value)
        }}
        value={addressValue}
      />
      <TextInput
        type="Address 2"
        widthPercentage="w-[50%]"
        placeHolder="Address 2"
        onChange={(text: any) => {
          addressState2(text.target.value)
        }}
        value={addressValue2}
      />
      <div className=" flex grid-cols-2">
        <TextInput
          widthPercentage="w-[50%]"
          placeHolder="City"
          onChange={(text: any) => {
            cityState(text.target.value)
          }}
          value={cityValue}
        />

        <TextInput
          widthPercentage="w-[60%]"
          placeHolder="State"
          onChange={(text: any) => {
            USStateState(text.target.value)
          }}
          value={USStateValue}
        />
      </div>
      <TextInput
        widthPercentage="w-[60%]"
        placeHolder="Zip Code"
        onChange={(text: any) => {
          zipCodeState(text.target.value)
        }}
        value={zipCodeValue}
      />
    </div>
  )
}
export default AddressInput
