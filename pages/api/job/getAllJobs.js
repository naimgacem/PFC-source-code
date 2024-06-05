import ConnectDB from '@/DB/connectDB';
import Service from '@/models/Service';

export default async (req, res) => {
    await ConnectDB();
    const { method } = req;
    switch (method) {
        case 'GET':
            await getAllJobs(req, res);
            break;
        default:
            res.status(400).json({ success: false, message: 'Invalid Request' });
    }
}

const getAllJobs = async (req, res) => {
    await ConnectDB();
        const gettingjobs = await Service.find({}).populate('user');
        return res.status(200).json({ success: true, data: gettingjobs })
   
}
