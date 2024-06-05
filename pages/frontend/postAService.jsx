import NavBar from '@/components/NavBar'
import Select from 'react-select'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { post_job } from '@/Services/service';
import { useRouter } from 'next/router'


export default function PostAJob() {
    const user = useSelector(state => state.User.userData)
    const router = useRouter();

    const [formData, setFormData] = useState({ user: user?._id, title: "", phone: "", email: "", location: "", description: "", service_category: ""});
    const [error, setError] = useState({ user: "", title: "", phone: "", email: "", location: "", description: "", service_category: ""});

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.title) {
            setError({ ...error, title: "title Field is required" })
            return;
        }

        if (!formData.phone) {
            setError({ ...error, phone: "Phone number Field is required" })
            return;
        }

        if (!formData.email) {
            setError({ ...error, email: "Email Field is Required" })
            return;
        }


        if (!formData.location) {
            setError({ ...error, location: "Locationg Field is required" })
            return;
        }
        if (!formData.description) {
            setError({ ...error, description: "description Field is required" })
            return;
        }
        if (!formData.service_category) {
            setError({ ...error, service_category: "Service_category Field is required" })
            return;
        }

        if (formData.user == null) {
            return toast.error("Please Login First");
        }

        const res = await post_job(formData);
        if (res.success) {
            toast.success(res.message);
            setTimeout(() => {
                router.push('/frontend/displayServices')
            }, 1000)
        }
        else {
            toast.error(res.message);
        }
    }



    const options = [
        { value: 'adrar', label: 'Adrar' },
        { value: 'chlef', label: 'Chlef' },
        { value: 'lagouat', label: 'Laghouat' },
        { value: 'oum el bouaghi', label: 'Oum El Bouaghi' },
        { value: 'batna', label: 'Batna' },
        { value: 'bejaia', label: 'Béjaïa' },
        { value: 'biskra', label: 'Biskra' },
        { value: 'bechar', label: 'Béchar' },
        { value: 'blida', label: 'Blida' },
        { value: 'bouira', label: 'Bouira' },
        { value: 'tamanrasset', label: 'Tamanrasset' },
        { value: 'tebessa', label: 'Tebessa' },
        { value: 'tlemcen', label: 'Tlemcen' },
        { value: 'tiaret', label: 'Tiaret' },
        { value: 'tinduf', label: 'Tindouf' },
        { value: 'guelma', label: 'Guelma' },
        { value: 'el tara', label: 'El Tarf' },
        { value: 'oran', label: 'Oran' },
        { value: 'djelfa', label: 'Djelfa' },
        { value: 'jilgel', label: 'Jijel' },
        { value: 'setif', label: 'Sétif' },
        { value: 'saida', label: 'Saïda' },
        { value: 'skikda', label: 'Skikda' },
        { value: 'souk ahras', label: 'Souk Ahras' },
        { value: 'tipaza', label: 'Tipaza' },
        { value: 'tissemsilt', label: 'Tissemsilt' },
        { value: 'el oued', label: 'El Oued' },
        { value: 'benghazi', label: 'Bordj Bou Arréridj' }, // Bordj Bou Arréridj also written as Bordj Badji Mokhtar
        { value: 'illizi', label: 'Illizi' },
        { value: 'bordj badji mokhtar', label: 'Bordj Badji Mokhtar' }, // Alternative spelling
        { value: 'ghardaia', label: 'Ghardaïa' },
        { value: 'medea', label: 'Médéa' },
        { value: 'djelfa', label: 'Djelfa' }, // Djelfa appears twice, this might be a data discrepancy
        { value: 'msila', label: 'MSila' },
        { value: 'mascara', label: 'Mascara' },
        { value: 'ouargla', label: 'Ouargla' },
        { value: 'bayadh', label: 'Bayadh' },
        { value: 'inahil', label: 'In Salah' }, // In Salah also written as In Echa  
        { value: 'tamanghasset', label: 'Tamanghasset' }, // Tamanghasset appears twice, this might be a data discrepancy
        { value: 'bordj bou arreridj', label: 'Bordj Bou Arréridj' }, // Alternative spelling
        { value: 'el meniaa', label: 'El Menia' },
        
      ];
      
      const options2 = [
        // Handyman Services
        { value: 'furnitureAssembly', label: 'Furniture Assembly' },
        { value: 'minorHomeRepairs', label: 'Minor Home Repairs' },
        { value: 'babyProofing', label: 'Babyproofing' },
        { value: 'electricalHelp', label: 'Electrical Help' },
        { value: 'lightCarpentry', label: 'Light Carpentry' },
        { value: 'plumbingHelp', label: 'Plumbing Help' },
        { value: 'smartHomeInstallation', label: 'Smart Home Installation' },
        
        // Mounting & Installation
        { value: 'generalMounting', label: 'General Mounting' },
        { value: 'tvMounting', label: 'TV Mounting' },
        
        // Moving & Hauling
        { value: 'fullServiceHelpMoving', label: 'Full-Service Help Moving' },
        { value: 'heavyLiftingAndLoadingHelp', label: 'Heavy Lifting & Loading Help' },
        { value: 'movingPackingAndUnpacking', label: 'Moving Packing & Unpacking' },
        { value: 'trashAndFurnitureRemoval', label: 'Trash & Furniture Removal' },
        
        // Yard & Home Maintenance
        { value: 'powerWashing', label: 'Power Washing' },
        { value: 'snowRemoval', label: 'Snow Removal' },
        { value: 'yardWork', label: 'Yard Work' },
        { value: 'indoorPainting', label: 'Indoor Painting' },
        { value: 'decoration', label: 'Decoration' },
        
        // Errands & Delivery
        { value: 'errands', label: 'Errands' },
        
        // Assistant Services
        { value: 'executiveAssistant', label: 'Executive Assistant' },
        { value: 'organization', label: 'Organization' },
        { value: 'waitingInLine', label: 'Waiting in Line' },
        
        // Tech & Computer Help
        { value: 'computerHelp', label: 'Computer Help' },
        
        // Event & Staffing
        { value: 'eventStaffing', label: 'Event Staffing' },
        
        // Creative & Design
        { value: 'interiorDesign', label: 'Interior Design' },
        { value: 'artsAndCrafts', label: 'Arts & Crafts' },
        { value: 'automotive', label: 'Automotive' },  // Car Washing etc.
        { value: 'cookingBaking', label: 'Cooking/Baking' },
        { value: 'dataEntry', label: 'Data Entry' },
        { value: 'graphicDesign', label: 'Graphic Design' },
        { value: 'laundryAndIroning', label: 'Laundry & Ironing' },
        { value: 'officeAdministration', label: 'Office Administration' },
        { value: 'petSitting', label: 'Pet Sitting' },
        { value: 'photography', label: 'Photography' },
        { value: 'projectCoordination', label: 'Project Coordination' },
        { value: 'seniorAndDisabledCare', label: 'Senior & Disabled Care' },
        { value: 'sewing', label: 'Sewing' },
        { value: 'plumbing', label: 'Plumbing' },
        { value: 'cleaning', label: 'Cleaning' },



      ];
      







    return (
        <>
            <NavBar />
            <div className='w-full  py-20 flex items-center  justify-center flex-col'>
                <h1 className='text-xl mt-4 uppercase tracking-widest border-b-2 border-b-indigo-600 py-2 font-semibold mb-8 md:text-2xl lg:text-4xl'>Enter Service Details</h1>
                <form onSubmit={handleSubmit} className="sm:w-1/2 w-full px-4 mx-4  h-full" >
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="title" className='mb-1 text-base font-semibold'>Service name :</label>
                        <input onChange={(e) => setFormData({ ...formData, title: e.target.value })} type="text" id='title' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='Enter service name' />
                        {
                            error.title && <p className="text-sm text-red-500">{error.title}</p>
                        }
                    </div>
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="salary" className='mb-1 text-base font-semibold'>Phone :</label>
                        <input onChange={(e) => setFormData({ ...formData, phone: e.target.value })} type="number" id='salary' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='Enter your phone number ' />
                        {
                            error.phone && <p className="text-sm text-red-500">{error.phone}</p>
                        }
                    </div>
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="email" className='mb-1 text-base font-semibold'>Email :</label>
                        <input onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="email" id='email' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='Enter Email to be Contacted ' />
                        {
                            error.email && <p className="text-sm text-red-500">{error.email}</p>
                        }
                    </div>
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="company" className='mb-1 text-base font-semibold'>location :</label>
                        <Select id="location" onChange={(e) => setFormData({ ...formData, location: e.value })} placeholder="Please Select location" options={options} />
                        <div className='w-full mb-4  flex flex-col items-start justify-center'>
                            {
                                error.location && <p className="text-sm text-red-500">{error.location}</p>
                            }
                        </div>
                    </div>

                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="servicecategory" className='mb-1 text-base font-semibold'>Category :</label>
                        <Select id="servicecategory" onChange={(e) => setFormData({ ...formData, service_category: e.value })} placeholder="Please Select a service category" options={options2} />
                        <div className='w-full mb-4  flex flex-col items-start justify-center'>
                            {
                                error.service_category && <p className="text-sm text-red-500">{error.service_category}</p>
                            }
                        </div>
                    </div>
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="description" className='mb-1 text-base font-semibold'>Description :</label>
                        <textarea onChange={(e) => setFormData({ ...formData, description: e.target.value })} onResize={"none"} type="text" id='description' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='Enter description of your service ,website, links ...' />
                        {
                            error.description && <p className="text-sm text-red-500">{error.description}</p>
                        }
                    </div>
                    <button type="submit" className='w-full py-2 rounded bg-indigo-600 text-white font-semibold tracking-widest'>Submit</button>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}