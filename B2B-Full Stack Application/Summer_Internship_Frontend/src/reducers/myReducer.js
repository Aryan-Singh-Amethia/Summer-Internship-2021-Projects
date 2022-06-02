const initState = {
	opena: false,
	opend: false,
	opene: false,
	loading: false,
	error: false,
	hasmore: false
};
const myReducer = (state = initState, action) => {
	switch (action.type) {
		case "OPEN_AMODAL":
			return {
				...state,
				opena: true
			};
		case "CLOSE_AMODAL":
			return {
				...state,
				opena: false
			};
		case "OPEN_DMODAL":
			return {
				...state,
				opend: true
			};
		case "CLOSE_DMODAL":
			return {
				...state,
				opend: false
			};
		case "OPEN_EMODAL":
			return {
				...state,
				opene: true
			};
		case "CLOSE_EMODAL":
			return {
				...state,
				opene: false
			};

		case "LOADING":
			return {
				...state,
				loading: true
			};
		case "NOT_LOADING":
			return {
				...state,
				loading: false
			};
		case "HAS_ERROR":
			return {
				...state,
				error: true
			};
		case "NO_ERROR":
			return {
				...state,
				error: false
			};
		case "HAS_MORE":
			return {
				...state,
				hasmore: true
			};
		case "HAS_NO_MORE":
			return {
				...state,
				hasmore: false
			};
		default:
			return state;
	}
};
export default myReducer;