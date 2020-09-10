export const wines = (state = [], action) => {
    switch (action.type){
        case 'SET_WINES':
            return [...action.wines];
        default:
            return state;
    }
};

export const currentWine = (state={wine:null}, action) => {
    switch (action.type){
        case 'SET_CURRENT_WINE':
            return Object.assign({}, state, {wine: action.wine});
        default:
            return state;
    }
}