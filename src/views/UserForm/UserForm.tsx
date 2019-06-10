import React, { useState } from 'react'

import { QuestionConditionTypes } from 'utils/helpers'
import { Question } from 'common/models'

import FormBlock from './components/UserQuestion'

interface UserFormProps {
    questions: Question[]
    parentValue?: string
}

function UserForm({ questions, parentValue }: UserFormProps) {
    const [formInputValue, setFormInputValue] = useState('')

    const checkCondition = (
        conditionType: string,
        conditionValue: string,
        level: number,
        formInputValue?: string
    ) => {
        if (level === 0) return true

        //eslint-disable-next-line
        if (conditionType === QuestionConditionTypes.Equals && formInputValue == conditionValue)
            return true
        if (
            conditionType === QuestionConditionTypes.Less &&
            formInputValue !== '' &&
            parseInt(formInputValue!) < parseInt(conditionValue, 10)
        )
            return true
        if (
            conditionType === QuestionConditionTypes.Greater &&
            parseInt(formInputValue!) > parseInt(conditionValue, 10)
        )
            return true

        return false
    }

    return (
        <>
            {questions.map(e => (
                <div key={e.id}>
                    {checkCondition(e.conditionType!, e.conditionValue!, e.level, parentValue) && (
                        <>
                            <FormBlock
                                data={e}
                                setFormInputValue={({
                                    target,
                                }: React.ChangeEvent<HTMLInputElement>) =>
                                    setFormInputValue(target.value)
                                }
                            />
                            {e.children && (
                                <UserForm questions={e.children} parentValue={formInputValue} />
                            )}
                        </>
                    )}
                </div>
            ))}
        </>
    )
}

export default UserForm
