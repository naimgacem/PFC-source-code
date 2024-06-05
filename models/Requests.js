import mongoose from 'mongoose';
const RequestsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }, 
    about: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Requests = mongoose.models.Requests || mongoose.model('Requests', RequestsSchema);

export default Requests; 