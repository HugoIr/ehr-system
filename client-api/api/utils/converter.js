const EHRParser = (obj) => {
    console.log("OBJH ", obj)
    console.log("obj[0]['Record'] ", obj[0]['Record'])
    obj[0]['Record']["vitalSign"]= JSON.parse(obj[0]['Record']["vitalSign"]);
    obj[0]['Record']["medicalHistory"]= JSON.parse(obj[0]['Record']["medicalHistory"]);
    return obj;
}

module.exports = {EHRParser};