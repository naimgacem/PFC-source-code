import React from 'react'
import Image from 'next/image'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { useRouter } from 'next/router'

export default function JobsCard({job , posted}) {
    const router = useRouter();
    return (
        <div key={job._id} className='w-full cursor-pointer  transition-all duration-1000  md:w-5/12 m-4 border hover:shadow-xl rounded px-4 md:flex md:flex-wrap'>
            <div className='mb-4 flex  items-center justify-center py-2 '>
                <Image width={70} height={70} className="flex rounded-full " src={"https://xsgames.co/randomusers/avatar.php?g=male"} alt="no image" />
                <div className='flex flex-col mx-2 px-2'>
                    <h1 className='text-xl md:text-2xl font-semibold'>{job?.user.name}</h1>
                    <p className='text-xs sm:text-sm md:text-base text-gray-800'>{job?.location}</p>
                </div>
            </div>
            <div className='mb-4 flex flex-col md:flex-wrap md:flex-row w-full justify-between  items-center '>

                <div className='mb-4 flex  items-start justify-center py-2 flex-col'>
                    <div className='flex px-6 rounded-2xl py-1 items-center justify-center bg-indigo-200 text-indigo-900  '>
                        <p>{job?.title} </p>
                    </div>
                </div>
                {
                    posted ? (
                        <button onClick={() => router.push(`/frontend/detailPostedService/${job?._id}`)} className='my-2 py-2 px-4  border border-indigo-600   rounded flex items-center justify-center transition-all duration-700 hover:bg-indigo-600 hover:text-white text-indigo-600 font-semibold'>View Requests <AiOutlineArrowRight className='mx-2 text-xl' /></button>
                    ) : (

                        <button onClick={() => router.push(`/frontend/serviceDetails/${job?._id}`)} className='my-2 py-2 px-4  border border-indigo-600   rounded flex items-center justify-center transition-all duration-700 hover:bg-indigo-600 hover:text-white text-indigo-600 font-semibold'>View Detail <AiOutlineArrowRight className='mx-2 text-xl' /></button>
                    )
                }
            </div>
        </div>
    )
}