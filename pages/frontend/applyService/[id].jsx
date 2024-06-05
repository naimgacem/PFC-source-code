import NavBar from '@/components/NavBar';
import { apply_job } from '@/Services/service';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ApplyJob() {
    const router = useRouter()
    const { id } = router.query
    const activeUser = useSelector(state => state.User.userData)
    const [formikData, setFormikData] = useState({ name: '', email: activeUser?.email, about: '', service: id, user: activeUser?._id })
    const [file, setFile] = useState(null)
    const [error, setError] = useState({ name: '', email: "", about: '', service: '', user: '', image: '' });

    const { name, email, about, service, user } = formikData;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name) {
            setError({ ...error, name: "Name Field is required" })
            return;
        }

        if (!email) {
            setError({ ...error, email: "Email Field is required" })
            return;
        }

        if (!user) {
            return toast.error('Please Login First')
        }

        if (!service) {
            return toast.error('Please Follow Apply Process ')
        }

        if (!about) {
            setError({ ...error, about: "About Field is required" })
            return;
        }

        if (!file) {
            setError({ ...error, image: "Please Upload a picture" })
            return;
        }

        // Check if the file type is PNG
        if (file.type !== 'image/png') {
            setError({ ...error, imgae: "Please Upload a PNG file" })
            return;
        }

        const form = new FormData();
        form.append('name', name);
        form.append('email', email);
        form.append('about', about);
        form.append('service', service);
        form.append('user', user);
        form.append('image', file);

        const res = await apply_job(form);
        if (res.success) {
            toast.success('Your Details are Submitted, Redirecting...')
            setTimeout(() => {
                router.push('/')
            }, 1000);
        } else {
            toast.error('Something Went Wrong')
        }
    }

    return (
        <>
            <NavBar />
            <div className='w-full py-20 flex items-center justify-center flex-col'>
                <h1 className='text-xl mt-4 uppercase tracking-widest border-b-2 border-b-indigo-600 py-2 font-semibold mb-8 md:text-2xl lg:text-4xl'>Enter Your Info</h1>
                <form encType="multipart/form-data" onSubmit={handleSubmit} className="sm:w-1/2 w-full px-4 mx-4 h-full">
                    <div className='w-full mb-4 flex flex-col items-start justify-center'>
                        <label htmlFor="title" className='mb-1 text-base font-semibold'>Name :</label>
                        <input name='name' onChange={(e) => setFormikData({ ...formikData, name: e.target.value })} type="text" id='title' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='Enter Name' />
                        {error.name && <p className="text-sm text-red-500">{error.name}</p>}
                    </div>
                    <div className='w-full mb-4 flex flex-col items-start justify-center'>
                        <label htmlFor="email" className='mb-1 text-base font-semibold'>Email :</label>
                        <input name='email' value={email} disabled type="email" id='email' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='Enter Email' />
                        {error.email && <p className="text-sm text-red-500">{error.email}</p>}
                    </div>
                    <div className='w-full mb-4 flex flex-col items-start justify-center'>
                        <label htmlFor="description" className='mb-1 text-base font-semibold'>About :</label>
                        <textarea name='about' onChange={(e) => setFormikData({ ...formikData, about: e.target.value })} id='description' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='Enter description'></textarea>
                        {error.about && <p className="text-sm text-red-500">{error.about}</p>}
                    </div>
                    <div className='w-full mb-4 flex flex-col items-start justify-center'>
                        <label htmlFor="file" className='mb-1 text-base font-semibold'>Upload image :</label>
                        <input accept="image/png" name='image' onChange={(e) => setFile(e.target.files[0])} type="file" id='file' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' />
                        {error.image && <p className="text-sm text-red-500">{error.image}</p>}
                    </div>
                    <button type="submit" className='w-full py-2 rounded bg-indigo-600 text-white font-semibold tracking-widest'>Submit</button>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}
