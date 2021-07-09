import { CLEAR, SET_USER_TEMPLATES } from "../actions/types"

const initialState = {
    templates: []
}

export const templatesReducer = (state= initialState, action) => {
    switch (action.type) {
        case SET_USER_TEMPLATES: 
            return {
                ...state,
                templates: action.templates
            }
        case CLEAR:
            return initialState
        default: 
            return state
    }
}