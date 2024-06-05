import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },location: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: { 
        type: String,
        required: true,
    },
    service_category: {
        type: String,
        required: true,
    },
    
},{timestamps: true});

const Service =  mongoose.models.Service || mongoose.model('Service', ServiceSchema); 

export default Service; 


