import React from 'react'

function ChatPreview() {
  return (
    <>
      <button className='w-full flex gap-4 p-2 bg-white hover:bg-neutral-100 rounded-lg'>
        <div className='flex gap-4 items-center'>
            <img className='w-14 h-14 object-cover' src="https://robohash.org/2"/>
            <div className='flex flex-col gap-1 text-left'>
                <h3 className='text-lg font-semibold text-emerald-600'>User Name</h3>
                <p className='w-64 sm:w-36 md:w-48 lg:w-64 xl:w-72 2xl:w-96 text-sm text-neutral-500 overflow-hidden whitespace-nowrap truncate'>Lorem ipsum dolor sit amet consectetur adipisicing elit. hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhjjjjjjj</p>
            </div>
        </div>
      </button>
    </>
  )
}

export default ChatPreview
