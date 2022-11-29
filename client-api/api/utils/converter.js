const EHRParser = (obj) => {
    console.log("OBJH ", obj)
    console.log("obj[0]['Record'] ", obj[0]['Record'])
    obj[0]['Record']["medicalHistory"]= JSON.parse(obj[0]['Record']["medicalHistory"]);
    return obj;
}

const getAllEhrParser = (stringEhr) => {
    let result = JSON.parse(stringEhr)
    console.log("result ", result[0])
    result.map((item, index) => {
        result[index]['Record']["medicalHistory"] = JSON.parse(item['Record']['medicalHistory'])
        result[index]['Record']["allergic"] = JSON.parse(item['Record']['allergic'])
        result[index]['Record']["diagnose"] = JSON.parse(item['Record']['diagnose'])
    })
    return result;
}

const getHistoryEhrParser = (stringEhr) => {
    let result = JSON.parse(stringEhr)
    console.log("result ", result[0])
    result.map((item, index) => {
        result[index]['value']["medicalHistory"] = JSON.parse(item['value']['medicalHistory'])
        result[index]['value']["allergic"] = JSON.parse(item['value']['allergic'])
        result[index]['value']["diagnose"] = JSON.parse(item['value']['diagnose'])
    })
    return result;
}

module.exports = {EHRParser, getAllEhrParser, getHistoryEhrParser};