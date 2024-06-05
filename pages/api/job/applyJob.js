import ConnectDB from '@/DB/connectDB';
import Joi from 'joi';
import AppliedJob from '@/models/Requests';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    about: Joi.string().required(),
    service: Joi.string().required(),
    user: Joi.string().required(),
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async (req, res) => {
    await ConnectDB();
    const { method } = req;
    if (method=='POST')  
        await applyToJob(req, res);   
};

const applyToJob = async (req, res) => {
    await ConnectDB();

        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Error', err);
                return res.status(500).json({ success: false, message: 'Error parsing the form' });
            }
            const oldPath = files.image.filepath;
            const originalFileName = files.image.originalFilename;

            const fileExtension = path.extname(originalFileName).toLowerCase();
            if (fileExtension !== '.png') {
                return res.status(400).json({ success: false, message: 'Please upload a PNG file' });
            }
            const randomString = crypto.randomBytes(6).toString('hex');
            const fileName = `${originalFileName.replace(fileExtension, '')}_${randomString}${fileExtension}`;

            const newPath = path.join(process.cwd(), 'public', 'uploads', fileName);

            // Read and write the file
            fs.readFile(oldPath, function (err, data) {
                if (err) return res.status(500).json({ success: false, message: 'Error reading the file' });
                
                fs.writeFile(newPath, data, function (err) {
                    if (err) return res.status(500).json({ success: false, message: 'Error writing the file' });
                    
                    fs.unlink(oldPath, function (err) {
                        if (err) return res.status(500).json({ success: false, message: 'Error deleting the temporary file' });
                    });
                });
            });

            const jobApplication = {
                name: fields.name,
                email: fields.email,
                about: fields.about,
                service: fields.service,
                user: fields.user,
                image: fileName,
            };

            const { name, email, about, service, user } = jobApplication;

            const { error } = schema.validate({ name, email, about, service, user });
            if (error) return res.status(401).json({ success: false, message: error.details[0].message.replace(/['"]+/g, '') });

            await AppliedJob.create(jobApplication);
            return res.status(200).json({ success: true, message: 'Service request submitted successfully!' });
        });

};
