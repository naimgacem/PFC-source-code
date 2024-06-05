import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';

export default function ApplicationsDataTable({ application }) {

    const [Data, setData] = useState([]);

    useEffect(() => {
        setData(application)
    }, [application])
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        setFilteredData(Data);
    }, [Data])

    const handleDownloadImage = async (name) => {
        const fileUrl = `/uploads/${name}`;
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = 'image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const columns = [
        {
            name: 'Name',
            selector: row => row?.user?.name,
        },
        {
            name: 'Email',
            selector: row => row?.user?.email,
        },
        {
            name: 'Descripton',
            selector: row => row?.about,
        },
        {
            name: 'Image',
            selector: row => <button onClick={() => handleDownloadImage(row?.image)} className=' w-26 py-2 text-xs text-indigo-600 hover:text-white my-2 hover:bg-indigo-600 border border-indigo-600 rounded transition-all duration-700'>Download Image</button>
        },
    ];

    return (
        <>

            <DataTable
                subHeaderAlign={"right"}
                columns={columns}
                data={filteredData}
                keyField="id"
                title={`Total Requests : ${Data?.length}`}
                fixedHeader
                fixedHeaderScrollHeight='79%'
                subHeader
                persistTableHead
                className="h-screen bg-white"
            />
        </>
    )
}
