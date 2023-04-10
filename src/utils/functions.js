export const formatAddress = (address) => {
    if (address) {
        let shortenedStr = address.substring(0, 4) + " ... " + address.substring(address.length - 4);
        return shortenedStr;
    }
    
    return "Invalid Address";
}