import React from 'react'
import FacebookIcon from '../icons/FacebookIcon'
import InstagramIcon from '../icons/InstagramIcon'
import YoutubeIcon from '../icons/YoutubeIcon'

const FooterComponent = () => {


    const [socialMedia] = React?.useState([
        {
            text: "Facebook",
            icon: <FacebookIcon />,
            path: "/"
        },
        {
            text: "Instagram",
            icon: <InstagramIcon />,
            path: "/"
        },
        {
            text: "Youtube",
            icon: <YoutubeIcon />,
            path: "/"
        },
    ])

    return (
        <div className="w-[90%] bg-[#15800e] h-[15rem] mx-auto mb-4 mt-8 rounded-lg p-4 relative flex justify-between">
            
            {/* LOGO */}
            <div className="w-1/4 h-full flex justify-center items-center">
                <img src="/images/logo3.png" className="w-full" />
            </div>

            {/* SOCIAL MEDIAS */}
            <div className="w-1/4 h-full flex justify-center items-center flex flex-col gap-2">
                <h2 className="text-white font-bold text-lg text-left w-full">Redes sociales: </h2>

                {
                    socialMedia?.map((value, idx) => {
                        return <a href={value?.path} className="w-full flex justify-start items-center gap-2 text-white/80 hover:text-white transition-all duration-300">
                            {value?.icon} {value?.text}
                        </a>
                    })
                }

            </div>

        </div>
    )
}

export default FooterComponent