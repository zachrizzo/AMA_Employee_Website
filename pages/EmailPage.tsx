import { NextPage } from 'next'
import router from 'next/router'
import React, { useEffect } from 'react'
import TextInput from '../components/TextInput'
import { auth } from '../firebase'

useEffect(() => {
  if (!auth.currentUser?.email) {
    router.push('/PatientLogin')
  }
}, [])

const EmailPage: NextPage<{}> = () => {
  return (
    <div>
      <TextInput
        // ref={filePicker}
        type="file"
        widthPercentage="w-[50%]"
        placeHolder="Upload a Pdf"
        onChange={(text: any) => {
          //   uploadimage({ e: text })
        }}
      />
    </div>
  )
}
export default EmailPage
