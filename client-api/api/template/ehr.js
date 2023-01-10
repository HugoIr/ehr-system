class EHR {
    constructor(id,
        name,
        dateOfBirth,
        address,
        phoneNumber,
        gender, 
        nationality,
        bloodType,
        height,
        weight,
        pulseRate,
        bloodPressure,
        respiratoryRate,
        medicalHistory,
        diagnose,
        insuranceName) 
    {
        this.id = id;
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.gender = gender; 
        this.nationality = nationality;
        this.bloodType = bloodType;
        this.height = height;
        this.weight = weight;
        this.pulseRate = pulseRate;
        this.bloodPressure = bloodPressure;
        this.respiratoryRate = respiratoryRate;
        this.medicalHistory = medicalHistory;
        this.diagnose = diagnose;
        this.insuranceName = insuranceName;
    }
}

module.exports = {EHR};