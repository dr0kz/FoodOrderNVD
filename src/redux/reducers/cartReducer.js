let defaultState = {
    selectedItems: {items: [], restaurantName: ''}
}
let cartReducer = (state = defaultState, action) => {
    let newState = {...state};
    switch (action.type) {

        case 'ADD_TO_CART': {
            newState.selectedItems = {
                items: [...newState.selectedItems.items, action.payload],
                restaurantName: action.payload.restaurantName
            };
            return newState;
        }
        case 'REMOVE_FROM_CART': {
            newState.selectedItems = {
                items: [
                    ...newState.selectedItems
                        .items
                        .filter((item) => item.title !== action.payload.title)
                ],
                restaurantName: action.payload.restaurantName
            }
            return newState;
        }
        case 'CLEAR_CART':{
            newState.selectedItems = {
                items: [],
                restaurantName: ''
            };
            return newState;
        }
        default:
            return state;
    }
};
export default cartReducer;
