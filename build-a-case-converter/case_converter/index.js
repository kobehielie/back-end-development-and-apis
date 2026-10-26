function getUpperCase(str) {
    return str.toUpperCase();
}

function getLowerCase (str) {
    return str.toLowerCase();
}

function getSentenceCase (str) {
    if (!str) {
        return ""
    }
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function getProperCase (str) {
    if (!str) {
        return "" ;
    }
    return str.split( "" ).map (mot => mot.charAt(0).toUpperCase() + mot.slice(1).toLowerCase()).join( "" ) ;
}

module.exports = {
  getUpperCase,
  getLowerCase,
  getSentenceCase,
  getProperCase

};

