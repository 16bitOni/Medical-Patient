const mongoose = require('mongoose');
const link = 'mongodb+srv://subhadipmondal789:DrugDatadatabase%409809@drugdata.xj4ds8z.mongodb.net/Drug?retryWrites=true&w=majority&appName=DrugData';
mongoose.connect(link)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((error) => {
        console.error("MongoDB Failed to connect:", error);
    });


    const UserSchema = new mongoose.Schema({
        aadhar: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },{collection:'patientlogin'});

const User = mongoose.model('User', UserSchema);
const PatientSchema = new mongoose.Schema({
    FirstName:String,
    lastName:String,
    DOB:String,
    Sex:String,
    Height:Number,
    Weight: Number,
    MaritialStatus:String,
    ContactNumber:Number,
    Email:String,
    EmergencyNumber:Number,
    AdharNo:Number,
});
const Patient = mongoose.model("Patient", PatientSchema,"patient");

const currentTime = new Date();

const prescriptionSchema = new mongoose.Schema({
    name:String,
    adharnum:Number,
    medicines:[{
        rank:String,
        id:String,
        medicineName:String,
        quantity:String
      }],
      review:String,
      medicalRequirements:String,
      createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create a model for the prescription schema
const Prescription = mongoose.model('Prescription', prescriptionSchema,"Prescriptions");

module.exports = {User,Prescription,Patient};
