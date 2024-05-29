export const checkAndClearExpiredData = () => {
    const expirationTime = localStorage.getItem("expirationTime")

    if (expirationTime) {
        const currentTime = new Date().getTime();
        if (currentTime > expirationTime) {
            localStorage.clear(); 
            sessionStorage.clear();
            console.log('Local storage data expired and removed.');
        }
    }
};