import NavBar from '@/components/NavBar'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import { GoLocation } from 'react-icons/go'
import { MdCategory, MdEmail, MdPhone } from 'react-icons/md'
import { FaUserAstronaut } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { get_specified_job } from '@/Services/service'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { InfinitySpin } from 'react-loader-spinner'
import useSWR from 'swr'



export default function JobDetails() {
    const router = useRouter()
    const { id } = router.query
    const user = useSelector(state => state?.User?.userData)
    const [JobDetails, setJobDetails] = useState(null);


    const { data, error , isLoading } = useSWR(`/get-specified-job`, () => get_specified_job(id));


    useEffect(() => {
        if(data) setJobDetails(data?.data)
    }, [data])


    if(error) toast.error(error)


    const handleApply = () => {
        if (!user) return toast.error('Please Login First');
        router.push(`/frontend/applyService/${id}`)
    }



    return (
        <>
            {
                isLoading ? (
                    <div className='bg-gray w-full h-screen flex items-center flex-col justify-center'>
                        <InfinitySpin width='200' color="#4f46e5" />
                        <p className='text-xs uppercase'>Loading Resources Hold Tight...</p>
                    </div>
                ) : (
                    <>
                        <ToastContainer />
                        <NavBar />
                        <div className='w-full  py-20 flex items-center md:px-8 px-2  justify-center flex-col  '>
                            <div className='w-full h-40 bg-gray-50 text-indigo-600 font-bold flex items-center justify-center flex-col'>
                                <h1 className='text-3xl'>Service Details</h1>
                            </div>
                            <div className='flex items-center  justify-center w-full py-10'>
                                <div className='flex w-full px-8 md:px-20 items-start md:flex-row flex-col md:justify-between justify-center'>
                                    <div className='flex mb-1 items-center justify-center'>
                                        <Image src={"https://xsgames.co/randomusers/avatar.php?g=male"} alt="no-image" className='rounded-full mb-2' width={100} height={100} />
                                        <div className='px-4 mx-2 flex flex-col items-start justify-center'>
                                            <p className='font-semibold text-base mb-1' >{JobDetails?.title} </p>
                                            <GoLocation className='text-xs font-semibold text-indigo-600' />
                                            <p className=' text-sm text-gray-800 mb-1'>{JobDetails?.location}</p>
                                            {console.log(JobDetails?.location?.location)}
                                        </div>

                                    </div>
                                    <div className='md:px-4 mb-1 px-2 md:mx-2 flex flex-col items-start justify-center'>
                                        <div className='flex items-center justify-center mb-1'>
                                            <FaUserAstronaut className='text-xs font-semibold text-indigo-600' />
                                            <p className='font-semibold text-base mx-1'>Service Poster </p>
                                            <p className=' text-sm text-gray-800 mx-1'>{JobDetails?.user?.name}</p>
                                        </div>
                                        <div className='flex items-center justify-center mb-1'>
                                            <MdEmail className='text-xs font-semibold text-indigo-600' />
                                            <p className='font-semibold text-base mx-1'>Email </p>
                                            <p className=' text-sm text-gray-800 mx-1'>{JobDetails?.user?.email}</p>
                                        </div>
                                    </div>
                                    <div className='md:px-4 mb-1 px-2 md:mx-2 flex flex-col items-start justify-center'>
                                        <div className='flex items-center justify-center mb-1'>
                                            <MdPhone className='text-xs font-semibold text-indigo-600' />
                                            <p className='font-semibold text-base mx-1'>Phone </p>
                                            <p className=' text-sm text-gray-800 mx-1'>{JobDetails?.phone}</p>
                                        </div>
                                        <div className='flex items-center justify-center mb-1'>
                                            <MdCategory className='text-xs font-semibold text-indigo-600' />
                                            <p className='font-semibold text-base mx-1'>Category </p>
                                            <p className=' text-sm text-gray-800 mx-1'>{JobDetails?.service_category}</p>
                                        </div>
                                    </div>
                                    
                                    <div className='flex items-center justify-center'>
                                        {
                                            JobDetails?.user?.email === user?.email ? (
                                                <p className='text-xs text-red-500'>unable to book your service</p>
                                            ) : (
                                                <div className='flex items-center justify-center  '>
                                                    <button onClick={handleApply} className='md:px-6 md:py-3 px-3 py-2 mt-2 md:mt-0 bg-indigo-500 rounded text-base tracking-widest uppercase transition-all duration-700 hover:bg-indigo-900 text-white  '>Send request</button>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='w-full md:px-4 py-2 flex items-center md:items-start md:flex-row flex-col justify-start md:justify-center'>
                                <div className='md:w-8/12 w-full md:px-4 py-8 flex flex-col items-center content-start justify-center '>
                                    <h1 className='text-center lg:text-2xl font-semibold text-xl mb-4 uppercase border-b-2 border-indigo-600 py-2'>Service Description</h1>
                                    <p className='px-4'>{JobDetails?.description}</p>
                                </div>
                            </div>
                            
                                </div>
                    </>
                )
            }

        </>
    )
}