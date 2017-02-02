import * as types from '../../const/actionTypes'
import * as entityTypes from  '../../const/entityTypes'
import Immutable from 'immutable'

const DEFAULT_X_POSITION = 100
const DEFAULT_Y_POSITION = 100
const DEFAULT_WIDTH = 50
const DEFAULT_HEIGHT = 50
const DEFAULT_COLOR = 'red'

let counter = 0

const initialState = Immutable.fromJS({
    entities: {},
    selectedEntityId: null
})

export default function editorsReducer(state = initialState, action = undefined) {

    switch (action.type) {
    case types.ADD_NEW_ENTITY:
        let newEntity = createEntity(action.entityType)
        state = state.setIn(['entities', newEntity.get('id')], newEntity)
        return state.set('selectedEntityId', newEntity.get('id'))
    case types.SAVE_ENTITY:
        return state
    case types.ADD_NEW_METHOD:
        return state.setIn(['entities', action.entityId, 'methods', action.methodName], 'put code here!')
    case types.SELECT_METHOD:
        return state.setIn(['entities', action.entityId, 'selectedMethod'], action.methodName)
        return state
    default:
        return state
    }

}

function createEntity(entityType) {
    switch (entityType) {
    case entityTypes.SQUARE:
        return createSquare()
    default:
        return {}
    }
}

function createSquare() {
    return Immutable.fromJS({
        id: counter,
        key: counter++,
        entityType: entityTypes.SQUARE,
        properties: {
            leftRight: DEFAULT_X_POSITION + counter * DEFAULT_WIDTH * 2,
            upDown   : DEFAULT_Y_POSITION,
            width    : DEFAULT_WIDTH,
            height   : DEFAULT_HEIGHT,
            color    : DEFAULT_COLOR
        },
        methods: {},
        selectedMethod: ''

    })
}


