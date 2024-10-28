import React from 'react'
import { Link } from 'react-router-dom'
import AndroidIcon from './icons/AndroidIcon'
import WebIcon from './icons/WebIcon'
import MacIcon from './icons/MacIcon'

const FAQComponent = () => {


    const [questions] = React?.useState([
        {
            title: "Error: Tu usuario no está registrado 🤔",
            desc: "Actualmente, si estas usando algún proveedor de correos como Hotmail o Outlook, algunas de las funciones no funcionarán correctamente con nuestro servicio, por favor trata de usar servicios gmail mientras resolvemos esos problemas."
        },
        {
            title: "Mi pago no se refleja en la aplicación 😣",
            desc: "El pago de cualquier viaje en la aplicación se reflejará después de 24 horas, pero aún así, su viaje debe aparecer como pagado."
        },
        {
            title: "¿Cómo se que mi pago se proceso? 🤔",
            desc: "Chequea siempre tu correo electrónico para ver si recibiste una confirmación de tu viaje, de la misma manera, chequea tu qr o la sección de viajes, si tu viaje aparece ahí, tu pago ha sido procesado."
        },
        {
            title: "Mi aplicación me muestra un error al hacer mi pago... 😲",
            desc: "Si esto te sucede, primero asegurate que tienes el saldo necesario para hacer el viaje, nuestra aplicación por lo general muestra un error si no hay fondos insuficientes."
        },
        {
            title: "¿Tendremos aplicación para plataformas de escritorio? 🖥",
            desc: "Temporalmente no. Nuestros servicios están disponibles para Android, iOS, y de manera virtual, pero no para sistemas operativos como Windows, Mac o Linux. En un futuro lo tendremos."
        },
        {
            title: "¿Cuándo estará disponible el Mobilitrix One? 🕐",
            desc: "Todavía no hay fecha exacta, pero prontamente nuestros usuarios podrán ver los beneficios de tenerlo. También tendremos un apartado en nuestras plataformas."
        }
    ])

    return (
        <div className="w-full min-h-[100vh] h-auto relative overflow-x-hidden">

            <div className="bg-[#95ff8d] w-full h-3/5 absolute -top-[11.5rem] left-0 -z-50 mb-8">
            </div>

            <section className="w-4/6 flex flex-col mx-auto h-[20rem] justify-end">
                <h1 className="text-5xl font-bold mb-4 w-full">Nuestras preguntas más frecuentes</h1>
                <p className="text-md text-gray-700 mb-6 w-2/3">
                    Aquí te dejamos las preguntas más frecuentes concerniente a nuestros productos. ¿No encuentras lo que buscas?
                    presione el siguiente enlace: <Link to="/contact_faq">Nuevo bug encontrado...</Link>
                </p>
            </section>

            <section className="flex flex-col justify-start items-center gap-5 my-5">
                {
                    
                    questions?.map((value, idx) => {
                        return <FAQCard title={value.title} key={idx} desc={value.desc} />
                    })
                }
            </section>

        </div>
    )
}

// COMPONENT
const FAQCard = ({ title, desc }) => {
    return <div className="shadow-md rounded-md p-4 w-4/6 bg-white hover:shadow-[#15800e]/40 transition-all duration-300">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-gray-500/80">{desc}</p>
    </div>
}

export default FAQComponent