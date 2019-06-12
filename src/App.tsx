import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import arrayToTree from 'array-to-tree'
import styled from 'styled-components'

import FormBuilder from './views/FormBuilder'
import Header from './common/components/Header'
import UserForm from './views/UserForm'

import { Provider } from 'react-redux'
import { store } from './utils/store'

import { storageService } from 'utils/storageService'

import { iRootState, Dispatch } from 'utils/store'

const AppWrapper = styled.div`
    display: grid;
    grid-template-columns: auto 50% auto;
    grid-template-areas: 'header header header' '. main .';
    grid-row-gap: 25px;
`

const Main = styled.main`
    grid-area: main;
`

type AppProps = ConnectedProps

const App: React.SFC<AppProps> = ({ showUserForm, questionList, toggleUserForm }): JSX.Element => {
    useEffect(() => {
        storageService.getAllQuestions()
    }, [])

    return (
        <AppWrapper>
            <Header />
            <Main>
                {!showUserForm ? (
                    <FormBuilder
                        questions={arrayToTree(questionList, {
                            parentProperty: 'parentId',
                        })}
                        toggleUserForm={toggleUserForm}
                    />
                ) : (
                    <UserForm
                        questions={arrayToTree(questionList, { parentProperty: 'parentId' })}
                        parentValue={undefined}
                    />
                )}
            </Main>
        </AppWrapper>
    )
}

const mapStateToProps = ({ form, view }: iRootState) => ({
    questionList: form.questionList,
    showUserForm: view.showUserForm,
})

//TODO: Action is loosing type due to rematch bug. Waiting for fix.
const mapDispatchToProps = ({ view }: Dispatch): any => ({
    toggleUserForm: view.toggleUserForm,
})

type ConnectedProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const ConnectedApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

const Root = () => (
    <Provider store={store}>
        <ConnectedApp />
    </Provider>
)

export default Root
