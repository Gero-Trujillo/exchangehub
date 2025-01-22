import React from 'react'
import ChatPreview from './ChatPreview'

function SidebarChat() {
  return (
    <>
      <aside className='w-full md:w-2/6 flex flex-col p-2 gap-2 bg-white rounded-lg'>
        <ChatPreview />
        <ChatPreview />
        <ChatPreview />
        <ChatPreview />
        <ChatPreview />
        <ChatPreview />
        <ChatPreview />
        <ChatPreview />
        <ChatPreview />
        <ChatPreview />
      </aside>
    </>
  )
}

export default SidebarChat
