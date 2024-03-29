import React, { useState, useEffect } from 'react'

import { NextPage } from 'next'
import MainButton from '../components/Buttons/MainButton'
import GreenCheckMark from '../components/formComponents/GreenCheckMark'
import CustomCheckBoxField from '../components/formComponents/CustomCheckBoxField'
import TextInput from '../components/userInput/TextInput'
import Header from '../components/navigation/Header'
import CustomYesOrNo from '../components/formComponents/CustomYesOrNo'
import { submitMentalHeathGroupSurvey } from '../firebase'
import { useRouter } from 'next/router'
import { auth } from '../firebase'

const MentalHealthQuestionnaire: NextPage<{}> = () => {
  const router = useRouter()
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [currentClient, setCurrentClient] = useState('')
  const [medication, setMedication] = useState('')
  const [OneonOne, setOneonOne] = useState('')
  const [interest, setInterest] = useState('')
  const [insuranceCoverage, setInsuranceCoverage] = useState('')
  const [focusArea, setFocusArea] = useState([])
  const [daysOfWeek, setDaysOfWeek] = useState([])
  const [timeOfDay, setTimeOfDay] = useState([])
  const [sessionLength, setSessionLength] = useState([])
  const [loading, setLoading] = useState(false)
  const [checkMark, setCheckMark] = useState(false)

  // Sets the required infomation to false and needs to be true in order to submit
  const [requiredAge, setRequiredAge] = useState(false)
  const [requiredGender, setRequiredGender] = useState(false)
  const [requiredCurrentClient, setRequiredCurrentClient] = useState(false)
  const [requiredMedication, setRequiredMedication] = useState(false)
  const [requiredOneonOne, setrequiredOneonOne] = useState(false)
  const [requiredInterest, setRequiredInterest] = useState(false)
  const [requiredInsuranceCoverage, setRequiredInsuranceCoverage] =
    useState(false)
  const [requiredFocusArea, setRequiredFocusArea] = useState(false)
  const [requiredDaysOfWeek, setRequiredDaysOfWeek] = useState(false)
  const [requiredTimeOfDay, setRequiredTimeOfDay] = useState(false)
  const [requiredSessionLength, setRequiredSessionLength] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center">
      <Header selectCompany={'AMA'} routePatientsHome={false} />
      <div className="mt-5">
        <div className="mb-5 text-center text-4xl">Mental Health Survey</div>

        <div className="flex">
          <TextInput
            id="age"
            placeHolder="Age"
            widthPercentage="w-2/4"
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setAge(text.target.value)
            }}
            required={requiredAge}
            value={age}
          />
        </div>

        <CustomCheckBoxField
          id="gender"
          checkBoxValues={gender}
          allowMultipleCheckBoxes={false}
          title="Please select your gender."
          setCheckBoxValues={setGender}
          required={requiredGender}
          checkBoxTitles={['Male', 'Female', 'Id prefer not to disclose']}
        />

        <CustomYesOrNo
          id="CurrentClientYesNo"
          text="Are you a current client at American Medical Associates?"
          CheckState={setCurrentClient}
          required={requiredCurrentClient}
        />

        <CustomYesOrNo
          id="Medication"
          text="Are you managing with Mental Health medication?"
          CheckState={setMedication}
          required={requiredMedication}
        />

        <CustomYesOrNo
          id="1on1"
          text="Are you currently engaged in 1 on 1 counseling sessions (AMA or other)?"
          CheckState={setOneonOne}
          required={requiredOneonOne}
        />

        <CustomYesOrNo
          id="Interest"
          text="Do you have interest in group counseling? Now or in the future?"
          CheckState={setInterest}
          required={requiredInterest}
        />

        {/* The list is in the email, impliment them when you can. */}
        <CustomCheckBoxField
          id="FocusArea"
          checkBoxValues={focusArea}
          allowMultipleCheckBoxes={true}
          title="If you joined in group therapy, which areas of focus might interest you most? (Select all that apply)"
          setCheckBoxValues={setFocusArea}
          required={requiredFocusArea}
          checkBoxTitles={[
            'Trauma',
            'Grief',
            'Communication Strategies',
            'Emotional Identification',
            'Relationship / Marriage / Family',
            'Stress / Anxiety Management',
            'Depression',
            'Anger Managment',
            'Social Skills',
            'Conflict Resolution',
            'Coping Skills',
            'Substance Use / Relapse Prevention',
          ]}
        />

        {/* Create a list of days with check boxes. */}
        <CustomCheckBoxField
          id="joinTherapy"
          checkBoxValues={daysOfWeek}
          allowMultipleCheckBoxes={true}
          title="If interested in joining group therapy, what days of the week would best fit your schedule? (Select all that apply)"
          setCheckBoxValues={setDaysOfWeek}
          required={requiredDaysOfWeek}
          checkBoxTitles={[
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
          ]}
        />

        {/* List of times are located in the email. */}
        <CustomCheckBoxField
          id="time"
          checkBoxValues={timeOfDay}
          allowMultipleCheckBoxes={true}
          title="If interested in joining group therapy, what times of the day would best fit your schedule? (Select all that apply)"
          setCheckBoxValues={setTimeOfDay}
          required={requiredTimeOfDay}
          checkBoxTitles={[
            'Morning',
            'Mid Morning',
            'Noon',
            'Early Afternoon',
            'Mid Afternoon',
            'Late Afternoon / Early Evening',
          ]}
        />

        {/* List can be found in email. */}
        <CustomCheckBoxField
          id="sessionLength"
          checkBoxValues={sessionLength}
          allowMultipleCheckBoxes={true}
          title="What length of group sessions would you be able and willing to commit to if pursuing group therapy? (Select all that apply)"
          setCheckBoxValues={setSessionLength}
          required={requiredSessionLength}
          checkBoxTitles={['60 Minutes', '90 Minutes', '120 Minutes']}
        />

        {/* YES or NO question. */}
        <CustomYesOrNo
          id="insuranceCoverage"
          text="If interested in group therapy, would you be more likely to join if covered by insurance?"
          CheckState={setInsuranceCoverage}
          required={requiredInsuranceCoverage}
        />
      </div>

      {checkMark && (
        <GreenCheckMark
          checkMarkText="Thank you!"
          bottomText="Your information has been submitted."
        />
      )}

      <MainButton
        onClick={() => {
          if (age === '') {
            alert('Please enter your age')
            setRequiredAge(true)
            router.push('/MentalHealthQuestionnaire/#age').then(() => {
              setTimeout(() => {
                window.scrollBy(0, -150)
              }, 100)
              //scroll up 200px
            })
            setLoading(false)
            return
          } else if (gender === '') {
            setRequiredGender(true)
            router.push('/MentalHealthQuestionnaire/#gender').then(() => {
              setTimeout(() => {
                window.scrollBy(0, -150)
              }, 100)
              //scroll up 200px
            })
            setLoading(false)
            return
          } else if (currentClient === '') {
            setRequiredCurrentClient(true)
            router
              .push('/MentalHealthQuestionnaire/#CurrentClientYesNo')
              .then(() => {
                setTimeout(() => {
                  window.scrollBy(0, -150)
                }, 100)
              })
            setLoading(false)
            return
          } else if (medication === '') {
            setRequiredMedication(true)
            router.push('/MentalHealthQuestionnaire/#Medication').then(() => {
              setTimeout(() => {
                window.scrollBy(0, -150)
              }, 100)
            })
            setLoading(false)
            return
          } else if (OneonOne === '') {
            setrequiredOneonOne(true)
            router.push('/MentalHealthQuestionnaire/#1on1').then(() => {
              setTimeout(() => {
                window.scrollBy(0, -150)
              }, 100)
            })
            setLoading(false)
            return
          } else if (interest === '') {
            setRequiredInterest(true)
            router.push('/MentalHealthQuestionnaire/#Interest').then(() => {
              setTimeout(() => {
                window.scrollBy(0, -150)
              }, 100)
            })
            setLoading(false)
            return
          } else if (focusArea.length <= 0) {
            setRequiredFocusArea(true)
            router.push('/MentalHealthQuestionnaire/#FocusArea').then(() => {
              setTimeout(() => {
                window.scrollBy(0, -150)
              }, 100)
            })
            setLoading(false)
            return
          } else if (daysOfWeek.length <= 0) {
            setRequiredDaysOfWeek(true)
            router.push('/MentalHealthQuestionnaire/#joinTherapy').then(() => {
              setTimeout(() => {
                window.scrollBy(0, -150)
              }, 100)
            })
            setLoading(false)
            return
          } else if (timeOfDay.length <= 0) {
            setRequiredTimeOfDay(true)
            router.push('/MentalHealthQuestionnaire/#time').then(() => {
              setTimeout(() => {
                window.scrollBy(0, -150)
              }, 100)
            })
            setLoading(false)
            return
          } else if (sessionLength.length <= 0) {
            setRequiredSessionLength(true)
            router
              .push('/MentalHealthQuestionnaire/#sessionLength')
              .then(() => {
                setTimeout(() => {
                  window.scrollBy(0, -150)
                }, 100)
              })
            setLoading(false)
            return
          } else if (insuranceCoverage === '') {
            setRequiredInsuranceCoverage(true)
            router
              .push('/MentalHealthQuestionnaire/#insuranceCoverage')
              .then(() => {
                setTimeout(() => {
                  window.scrollBy(0, -150)
                }, 100)
              })
            setLoading(false)
            return
          }

          setLoading(true)
          submitMentalHeathGroupSurvey({
            age: age,
            gender: gender,
            currentClient: currentClient,
            medication: medication,
            OneonOne: OneonOne,
            interest: interest,
            insuranceCoverage: insuranceCoverage,
            focusArea: focusArea,
            daysOfWeek: daysOfWeek,
            timeOfDay: timeOfDay,
            sessionLength: sessionLength,
          }).then(() => {
            setLoading(false)
            setCheckMark(true)
          })
        }}
        buttonText="Submit"
        loading={loading}
      />
    </div>
  )
}

export default MentalHealthQuestionnaire
