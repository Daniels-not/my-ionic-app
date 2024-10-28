import React from 'react'

const NewBugComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] h-auto bg-gray-100 relative mb-4">


      <section className="bg-[#95ff8d] w-full h-3/4 -skew-y-12 absolute bottom-[-9rem] left-0 z-0">
      </section>

      <section className="w-full max-w-md p-8 bg-white shadow-md rounded-lg relative z-10">
        <h2 className="text-2xl font-bold mb-6 text-center">¡Comentanos tus dudas o problemas!</h2>
       
        <form>

            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                <input
                id="email"
                type="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="user@mail.com"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Nombre usuario</label>
                <input
                id="username"
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="user"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Comentario</label>
                <textarea 
                    name="" 
                    id=""
                    className="mt-1 h-[10rem] block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                >

                </textarea>
            </div>

            <div className="flex flex-col gap-2">
                <button
                    type='submit'
                    className="w-full bg-[#15800e] text-white font-bold py-2 px-4 rounded-md hover:bg-[#0b4007] transition duration-200"
                >
                    Subir
                </button>
            </div>

        </form>

      </section>

    </div>
  )
}

export default NewBugComponent