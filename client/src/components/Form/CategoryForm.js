import React from 'react'

const CategoryForm = ({handleSubmit, value, setValue}) => {
    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
                <div className='text-center flex justify-center'>
                    <input 
                        type="text" 
                        placeholder='Enter a new category' 
                        value={value} 
                        onChange={(e) => setValue(e.target.value)} 
                        className="border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div className='pb-4'>
                <button 
                    type="submit" 
                    className=" bg-gray-100 hover:bg-gray-200 rounded-md p-2"
                >
                    Submit
                </button>
                </div>
                
            </form>
        </>
    )
}

export default CategoryForm