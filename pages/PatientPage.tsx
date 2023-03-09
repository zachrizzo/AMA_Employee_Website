import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import Header from '../components/Header'
import { useRouter } from 'next/router'
import MainButton from '../components/MainButton'
import {
  GetPatientAutoSaveInfo,
  GetPatientInfo,
  GetWeightLossSurveyPatient,
  SubmittedPacket,
} from '../firebase'
import { auth } from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import NewPatientPacketFullSubmission from '../components/formComponents/NewPatientPacketFullSubmission'
import { PacketInfo } from '../types/NewPatientPacketTypes'
import {
  selectWeightLossSurvey,
  setWeightLossSurvey,
} from '../redux/slices/companySlice'

const PatientPage: NextPage = () => {
  const router = useRouter()
  const [patientInfo, setPatientInfo] = useState<Info>()
  const [patientName, setPatientName] = useState('')
  const [patientAutoSaveInfo, setPatientAutoSaveInfo] = useState([] as any)
  const [submittedPacket, setSubmittedPacket] = useState<any>([])
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [noFoundPacket, setNoFoundPacket] = useState(false)
  // const [collapsedArray, setCollapsedArray] = useState()
  const [weightLossSurveyPatient, setWeightLossSurveyPatient] = useState(
    [] as any
  )
  // const [weightLossAutoSaveSubmission, setWeightLossAutoSaveSubmission] =
  //   useState<any>([])
  const [hasSubmittedWeightLoss, setHasSubmittedWeightLoss] = useState(false)
  const [noFoundWeightLoss, setNoFoundWeightLoss] = useState(false)
  const weightLossAutoSaveSubmission = useSelector(selectWeightLossSurvey)

  const dispatch = useDispatch()

  useEffect(() => {
    if (auth.currentUser?.email) {
      SubmittedPacket({
        email: auth.currentUser?.email,
        setSubmittedPacket: setSubmittedPacket,
      })
        .then(() => {
          if (submittedPacket.emailValue) {
            setHasSubmitted(true)
            setNoFoundPacket(false)
          }
        })
        .then(() => {
          if (submittedPacket.length === 0) {
            GetPatientAutoSaveInfo({
              email: auth.currentUser?.email,
              setPatientAutoSaveInfo: setPatientAutoSaveInfo,
              dispatch: dispatch,
            })
          }
        })
    }
  }, [auth.currentUser?.email])

  useEffect(() => {
    if (patientAutoSaveInfo?.emailValue) {
      setNoFoundPacket(false)
      setHasSubmitted(false)
    } else {
      setNoFoundPacket(true)
    }
  }, [submittedPacket, patientAutoSaveInfo])

  useEffect(() => {
    if (auth.currentUser?.email) {
      GetWeightLossSurveyPatient({
        email: auth.currentUser?.email,
        setWeightLossSurveyPatient: setWeightLossSurvey,
        dispatch: dispatch,
      })
      // .then(() => {
      //   if (weightLossAutoSaveSubmission.emailValue) {
      //     setHasSubmittedWeightLoss(true)
      //     setNoFoundWeightLoss(false)
      //   }
      // })
      // .then(() => {
      //   if (weightLossAutoSaveSubmission.length === 0) {
      //     GetWeightLossSurveyPatient({
      //       email: auth.currentUser?.email,
      //       setWeightLossSurveyPatient: setWeightLossSurveyPatient,
      //       dispatch: dispatch,
      //     })
      //   }
      // })
    }
  }, [auth.currentUser?.email])
  console.log('weightLossAutoSaveSubmission', weightLossAutoSaveSubmission)

  interface Info {
    email: string
  }

  useEffect(() => {
    if (!auth.currentUser?.email) {
      router.push('/PatientLogin')
    }
  }, [])

  useEffect(() => {
    if (auth.currentUser?.email != null) {
      GetPatientInfo({
        setPatientInfo: setPatientInfo,
        email: auth.currentUser?.email,
      })
    }
  }, [auth.currentUser?.email])

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Header selectCompany={'AMA'} routePatientsHome={false} />
      <div className="m-10 w-[50%] rounded-[30px] shadow-2xl">
        <div className="  item-center flex justify-end p-3">
          <p
            onClick={() => {
              router.push('/PatientHelpPage')
            }}
            className=" mx-10 cursor-pointer text-[#377adf] underline"
          >
            Need Help?
          </p>
        </div>
        <h1 className="m-2 text-center text-4xl font-bold text-[#377adf] opacity-100">
          Patient Page
        </h1>
        {patientInfo && (
          <div className="flex items-center justify-center">
            Welcome {patientInfo.email}!
          </div>
        )}
        <div className="flex flex-col items-center justify-center">
          <MainButton
            buttonText={
              submittedPacket?.emailValue
                ? hasSubmitted
                  ? 'Hide New Patient Packet'
                  : 'View New Patient Packet'
                : noFoundPacket
                ? 'Fill out New Patient Packet'
                : 'Resume New Patient Packet'
            }
            onClick={() => {
              if (submittedPacket.emailValue) {
                setHasSubmitted(!hasSubmitted)
              } else {
                router.push('/NewPatientPacket')
              }
            }}
          />

          {hasSubmitted && (
            <NewPatientPacketFullSubmission selectedPacket={submittedPacket} />
          )}

          <MainButton
            buttonText="Weight Loss Survey"
            onClick={() => {
              router.push('/WeightLossSurvey')
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default PatientPage
