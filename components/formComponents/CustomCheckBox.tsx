import React from 'react'
import CheckBox from '../CheckBox'
import { useEffect } from 'react'

const CustomCheckBox: React.FC<{
  isChecked: boolean
  checkedState?: Function
  text: string
  doYouWantToSetCheckToBoxValue?: boolean
  id?: string
}> = ({ isChecked, checkedState, text, doYouWantToSetCheckToBoxValue, id }) => {
  return (
    <div className=" my-[1px] flex grid-cols-2 flex-row">
      <div id={id}>
        <CheckBox isChecked={isChecked} checkedState={checkedState} />
      </div>
      <div className="  flex  flex-row items-center justify-start  text-left ">
        <p className=" text-left"> {text}</p>
      </div>
    </div>
  )
}
export default CustomCheckBox
