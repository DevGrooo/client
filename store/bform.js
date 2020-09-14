export const state = () => ({
    forms: {},
    formActive: '',
    formValidates: {}
})

export const mutations = {
    addForm (state, formName) {
        state.forms[formName] = {
            inputs: {}
        }
        state.formActive = formName
        return state.forms[formName]
    },
    addInput (state, input) {
        state.forms[state.formActive].inputs[input.name] = input.value
        return state.forms[state.formActive].inputs[input.name]
    },
    updateInput (state, params) {
        state.forms[params.formName].inputs[params.inputName] = params.inputValue
    },
    addFormValidate (state, params) {
        state.formValidates[params.formName] = params.vuelidate
        state.formActive = params.formName
    }
}
