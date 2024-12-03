import React from 'react'
import AndroidIcon from "../icons/AndroidIcon";
import WebIcon from "../icons/WebIcon";
import MacIcon from "../icons/MacIcon";

const AppsSubComponent = () => {

    const [cardsInfo, setCardsInfo] = React.useState([
        {title: "Android", icon: <AndroidIcon />},
        {title: "Servicio Web", icon: <WebIcon />},
        {title: "iOS", icon: <MacIcon />},
    ])

    return (
        <div className="w-full h-[100vh] flex flex-col justify-evenly items-center overflow-hidden bg-[#95ff8d] gap-4">
            
            <section className="w-full text-center">
                <h1 className="font-bold text-5xl text-white">Plataformas disponibles</h1>
                <p className="text-[#15800e] mt-5">
                    ¡Consigue nuestras aplicaciones, o simplemente usa nuestro servicio web!
                </p>
            </section>

            {/*  */}
            <section className="w-full flex gap-2 justify-center items-center">
                
                <div className="w-1/2 scale-[2.5] relative">
                    <img src="/images/bus2.webp" className="absolute right-[95px] top-[-100px]"/>
                </div>

                <div className="w-1/2 flex flex-col justify-center items-center gap-5">
                    {
                        cardsInfo?.length > 0
                        ?
                            cardsInfo?.map((value, _idx) => {
                                return <Cards title={value?.title} Icon={value?.icon} />
                            })
                        :
                        []
                    }
                </div>
            </section>

        </div>
    )
}

const Cards = ({ title, Icon  }) => {
    return (
        <div className="w-2/4 flex  justify-between mx-5 items-center p-4 bg-white rounded text-[#15800e]"> 
            {Icon}
            <h2 className="font-bold">{title}</h2>
        </div>
    );
}

export default AppsSubComponent