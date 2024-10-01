import React from 'react'
import StarIcon from '../icons/StarIcon'
import CanceledTripIcon from '../icons/CanceledTripIcon'
import TripsMadeIcon from '../icons/TripsMadeIcon'

const DashboardHomeSubComponent = ({ user, userName }) => {

    /* VARS */
    const [data, setData] = React?.useState([
        {value: 4.5, title: "stars", icon:<StarIcon /> },
        {value: 54, title: "trips", icon: <TripsMadeIcon />},
        {value: 4, title: "canceled trips", icon: <CanceledTripIcon />},
    ])
    
    return (
        <div className="p-4 w-full">

            {/** WELCOMING SECTION  */}
            <section className="flex justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-left">Welcome {userName}</h2>
                    <small className="text-md text-[#15800e]/80 font-semibold">Basic Account</small>
                </div>

                <div className="w-16 h-16 rounded-full overflow-hidden flex justify-center items-center">
                    <img src="/user_images/profile.jpeg" className="w-full" />
                </div>
            </section>

            {/** STADISTICS DATA  */}
            <section className="flex flex-col justify-between w-full mt-8">

                <div >
                    <h2 className="text-2xl font-bold text-left">Your data:</h2>
                    <small className="text-md text-[#15800e]/80 font-semibold">Stadistics</small>
                </div>

                <div className="w-full flex flex-row justify-evenly items-center">

                    {
                        data?.map((value, idx) => {
                            if(idx % 2 == 0)
                            {
                                return <Card data={value?.value} title={value?.title} icon={value?.icon && value?.icon} isOdd={true} />
                            }
                            else
                            {
                                return <Card data={value?.value} title={value?.title} icon={value?.icon && value?.icon} isOdd={false} />
                            }
                        })
                    }
                </div>
            </section>
        </div>
    )
}

const Card = ({ data, title, icon="", isOdd }) => {

    if(isOdd)
    {  
        return <div className="flex justify-between items-center w-1/4 rounded-md bg-[#95ff8d] p-4">
            
            <section className="text-[#15800e] w-1/3">
                {icon}
            </section>

            <section className="flex flex-col w-2/3 text-center">
                <h1 className="text-6xl font-bold text-[#15800e]">{data}</h1>
                <h2 className="text-md text-[#15800e] font-semibold">{title}</h2>
            </section>
        </div>
    }
    else
    {
        return <div className="flex justify-between items-center w-1/4 rounded-md p-4 bg-[#15800e]">
            <section className="text-white w-1/3">
                {icon}
            </section>

            <section className="flex flex-col w-2/3 text-center">
                <h1 className="text-6xl font-bold text-white">{data}</h1>
                <h2 className="text-md font-semibold text-white">{title}</h2>
            </section>
        </div>
    }
}

export default DashboardHomeSubComponent