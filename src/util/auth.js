const AKKey = "ACCESS-TOKEN";

const RKKey = "REFRESH-Token";

const getAK = () => {
	return window.localStorage.getItem(AKKey);
};

const getRK = () => {
	return window.localStorage.getItem(AKKey);
};

const setAK = (ak) => {
	return window.localStorage.setItem(AKKey, ak);
};

const setRK = (rk) => {
	return window.localStorage.setItem(RKKey, rk);
};

const removeAK = () => {
	return window.localStorage.removeItem(AKKey);
};

const removeRK = () => {
	return window.localStorage.removeItem(RKKey);
};

export { getAK, getRK, setAK, setRK, removeAK, removeRK };
