const getAdminIdentity = (organizationType) => {
    if (organizationType == "hospital") {
        return "admin";
    } else if (organizationType == "insurance") {
        return "admin2";
    } else {
        throw "Organization type must either from hospital or insurance"
    }
    
}

module.exports = {getAdminIdentity};