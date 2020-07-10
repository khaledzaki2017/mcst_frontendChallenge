import { SETDATA } from '../actions/setData';
const initState = {};
export default function setData(state = initState, action = {}) {
    switch (action.type) {
        case SETDATA:
            return Object.assign({}, initState, { Data: action.data });
        default:
            return initState;
    }
}