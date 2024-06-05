import Intro from '@/components/Intro'
import NavBar from '@/components/NavBar'
import Head from 'next/head'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import useSWR from 'swr'
import { get_job } from '@/Services/service'
import { setJobData } from '@/Utils/ServiceSlice'
import { InfinitySpin } from 'react-loader-spinner'

export default function Home() {
const dispatch = useDispatch();
 const { data,isLoading } = useSWR('/getAllJobs', get_job)
  useEffect(() => {
    if (data) dispatch(setJobData(data?.data))
  }, [data, dispatch])

  return (
    <>

      <Head>
        <title>On-demand sevices platform</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Naim&&Nassim" />
        <meta name="language" content="en-US" />
      </Head>

      {
        isLoading ? (
          <div className='bg-gray w-full h-screen flex items-center flex-col justify-center'>
            <InfinitySpin width='200' color="#4f46e5" />
            <p className='text-xs uppercase'>Loading Resources...</p>
          </div>
        ) : (
          <>
            <NavBar />
            <div className="w-full h-screen bg-gray-200  text-black">
              <Intro />
            </div>
          </>
        )
      }
    </>
  )
}
