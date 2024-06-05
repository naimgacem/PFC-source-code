import ConnectDB from '@/DB/connectDB';
import Job from '@/models/Service';

export default async (req, res) => {
    await ConnectDB();
    const { method } = req;
    switch (method) {
        case 'GET':
            await getPostedJobs(req, res);
            break;
        default:
            res.status(400).json({ success: false, message: 'Invalid Request' });
    }
}

const getPostedJobs = async (req, res) => {
    await ConnectDB();
    const data = req.query;
    const id = data?.id;

    if (!id) return res.status(400).json({ success: false, message: "Please Login" });
    
        const gettingjobs = await Job.find({user : id}).populate('user', 'name email');
        return res.status(200).json({ success: true, data: gettingjobs })
   
}
