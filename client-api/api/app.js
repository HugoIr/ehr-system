const express = require('express')
const bodyParser = require('body-parser')
const { enrollAdmin } = require('./service/enrollAdmin')
const { getAllEhr } = require('./service/getAllEhr')
const { createEhr } = require('./service/createEhr')
const { registerUser } = require('./service/registerUser')

var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const cors = require('cors')
const { getEhrById } = require('./service/getEhrById')
const app = express()
const port = 8000

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/ehr/', urlencodedParser, async function(req, res) {
    
    var result = await getAllEhr();
    if (result != null) {
        result = result
        
    } else {
        result = "Failed to get all EHR"
    }
    res.send({
        "result": result
    })
    
})

app.get('/ehr/:id', urlencodedParser, async function(req, res) {
    
    var result = await getEhrById(req.params.id);
    if (result != null) {
        result = result
        
    } else {
        result = `Failed to get EHR by ${req.params.id}`
    }
    res.send({
        "result": result
    })
    
})

app.post('/ehr/', jsonParser, async function(req, res) {
    console.log("REQ", req.body)
    const user = req.body.user;
    const name = req.body.name;
    const age = req.body.age;
    const gender  = req.body.gender ;
    const nationality = req.body.nationality;
    const vitalSign  = req.body.vitalSign ;
    const medicalHistory  = req.body.medicalHistory ;
    const diagnose  = req.body.diagnose ;
    const immunizationHistory  = req.body.immunizationHistory ;
    const allergic = req.body.allergic;
    
    const result = await createEhr(
        user,
        name,
        age,
        gender,
        nationality,
        vitalSign,
        medicalHistory,
        diagnose,
        immunizationHistory,
        allergic,
        )
    res.send({
        "result": result
    })
})

app.post('/enroll/admin/', jsonParser, async function(req, res) {
    console.log("REQ", req.body)
    const enrollId = req.body.enrollId;
    const enrollSecret = req.body.enrollSecret;
    console.log("ENROLLID ", enrollId)
    console.log("enrollSecret ", enrollSecret)
    if (enrollId != null && enrollSecret != null) {
        enrollAdmin(enrollId, enrollSecret)
    }

    res.send("oke")
})

app.post('/enroll/user/', jsonParser, async function(req, res) {
    console.log("REQ", req.body)
    const email = req.body.email;
    const organizationType = req.body.organizationType;
    console.log("email ", email)
    console.log("organizationType ", organizationType)

    if (email != null) {
        const secret = await registerUser(email, organizationType)
        res.send({
            "secret": secret
        })
    }

})

app.get('*', function(req, res) {
    res.send("blank")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

Object.defineProperty(String.prototype, 'capitalize', {
    value: function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
  });
  