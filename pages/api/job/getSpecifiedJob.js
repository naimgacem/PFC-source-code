import ConnectDB from '@/DB/connectDB';
import Job from '@/models/Service';

export default async (req, res) => {
    await ConnectDB();
    const { method } = req;
    if (method=='GET') {
            await getSpecifiedJob(req, res);  
    }
}
const getSpecifiedJob = async (req, res) => {
    await ConnectDB();
    const data = req.query;
    const id = data?.id

    if (!id) return res.status(400).json({ success: false, message: "Please Login" })
            const gettingjobs = await Job.findById(id).populate('user');
            return res.status(200).json({ success: true, data: gettingjobs })
      
}