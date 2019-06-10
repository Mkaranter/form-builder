import React, { useState } from 'react'

import { Question as QuestionModel } from 'common/models'

import Question from '../Question'

interface QuestionListProps {
    questions: QuestionModel[]
    parentQuestion?: QuestionModel
    parentValueType?: string
}

function QuestionList({ questions, parentQuestion, parentValueType }: QuestionListProps) {
    const [parentValueTypeUpdated, setParentValueType] = useState('')

    return (
        <>
            {questions.map(question => (
                <div key={question.id}>
                    <Question
                        question={question}
                        setParentValueType={setParentValueType}
                        parentValueType={parentQuestion ? parentQuestion.type : parentValueType}
                    />
                    {question.children && (
                        <QuestionList
                            questions={question.children}
                            parentQuestion={question}
                            parentValueType={parentValueTypeUpdated}
                        />
                    )}
                </div>
            ))}
        </>
    )
}

export default QuestionList
