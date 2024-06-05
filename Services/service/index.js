
// post job api

export const post_job = async (formData) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/job/postAJob`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        })
        const data = res.json();
        return data;

}
// get job api
export const get_job = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/job/getAllJobs`, {
            method: 'GET',
        })
        const data = res.json();
        return data;

}

// get specified job api
export const get_specified_job = async (id) => {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/job/getSpecifiedJob?id=${id}`, {
            method: 'GET',
        })
        const data = res.json();
        return data;

}

// apply  job api

export const apply_job = async (formData) => {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/job/applyJob`, {
            method: 'POST',
            body: formData,
        });
        const data = await res.json();
        return data;
   
}

// get my all posted job api 

export const get_my_posted_job = async (id) => {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/job/getPostedJobs?id=${id}`, {
            method: 'GET',
        })
        const data = res.json();
        return data;

}


// get my all application of specified jobs api

export const get_all_applications = async (id) => {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/job/getAllApplicationsOfSpecifiedJob?id=${id}`, {
            method: 'GET',
        })
        const data = res.json();
        return data;

}


export const get_application_details = async (id) => {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/job/getApplicationDetail?id=${id}`, {
            method: 'GET',
        })
        const data = res.json();
        return data;

}