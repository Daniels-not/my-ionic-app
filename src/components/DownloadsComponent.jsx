import React from 'react'
import AndroidIcon from './icons/AndroidIcon'
import WebIcon from './icons/WebIcon'
import MacIcon from './icons/MacIcon'

const DownloadsComponent = () => {

    const [cardsInfo, setCardsInfo] = React.useState([
        {title: "Android", icon: <AndroidIcon />},
        {title: "Mac", icon: <MacIcon />},
    ])


    return (
        <div className="w-full h-[100vh] relative overflow-hidden flex flex-col justify-center items-center">

            <div className="bg-[#95ff8d] w-full h-3/4 skew-y-12 absolute -top-[10rem] left-0 -z-50">
            </div>

            <section className="w-2/6 flex flex-col w-full text-center">
                <h1 className="text-5xl font-bold mb-4 w-full">Descarga Nuestra App</h1>
                <p className="text-md text-gray-700 mb-6 w-1/3 mx-auto">
                    Puedes descargar nuestra App a través de las plataformas disponibles o bien, 
                    puedes usar nuestra plataforma web.
                </p>
            </section>

            <section className="w-full flex flex-row justify-center items-center h-1/3">
                {
                    cardsInfo?.map((value, index) => {
                        return <Cards title={value?.title} Icon={value?.icon} />
                    })
                }
            </section>

        </div>
    )
}

const Cards = ({ title, Icon  }) => {
    return (
        <div className="w-1/4 h-full flex flex-col justify-evenly items-center mx-5 items-center p-4 bg-white rounded text-[#15800e] shadow-md"> 
            {Icon}
            <h2 className="font-bold">{title} Platform</h2>
            <button className="bg-[#15800e] text-white font-bold py-2 px-6 rounded-full hover:bg-[#0f5f0a] hover:scale-[1.1] transition duration-300">
                Descargar
            </button>
        </div>
    );
}

export default DownloadsComponent