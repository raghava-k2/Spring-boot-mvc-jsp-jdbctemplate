const homeReducer = (state = {show:false}, action) => {
    switch (action.type) {
        case 'SHOW_MENU':
            return {show: action.show}
        default:
            return state
    }
}
export default homeReducer