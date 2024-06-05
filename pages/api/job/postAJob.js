import ConnectDB from '@/DB/connectDB';
import Service from '@/models/Service';
import Joi from 'joi';

const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    user: Joi.required(),
    email: Joi.string().email().required(),
    location: Joi.string().required(),
    service_category: Joi.string().required(),
    phone: Joi.string().required(),
});

const postAJob = async (req, res) => {
    const data = req.body;
    const { user, title, location, description, phone, email, service_category } = data;
    const { error } = schema.validate({ user, title, location, description, phone, email, service_category });

    if (error) return res.status(400).json({ success: false, message: error.details[0].message });

    try {
        const service = await Service.create({
            user,
            title,  
            location,
            description,
            phone,
            email,
            service_category
        });

        return res.status(200).json({ success: true, message: "Service Posted Successfully!" });
    } catch (error) {
        console.log('Error in posting a service (server) => ', error);
        return res.status(500).json({ success: false, message: "Something Went Wrong Please Retry!" });
    }
}

export default async (req, res) => {
    await ConnectDB();
    const { method } = req;
    switch (method) {
        case 'POST':
            await postAJob(req, res);
            break;
        default:
            res.status(400).json({ success: false, message: 'Invalid Request' });
    }
}
