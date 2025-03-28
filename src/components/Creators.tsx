import type React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface CreatorProps {
  image: string
  name: string
  description: string
}

const Creators: React.FC<CreatorProps> = ({ image, name, description }) => {
  return (
    <div className="flex items-center space-x-4 p-2 rounded-lg hover:bg-emerald-100/50 dark:hover:bg-emerald-800/30 transition-colors">
      <Avatar className="h-10 w-10 border-2 border-emerald-200 dark:border-emerald-700">
        <AvatarImage src={image} alt={name} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-medium leading-none text-emerald-800 dark:text-emerald-200">{name}</p>
        <p className="text-xs text-emerald-600 dark:text-emerald-400">{description}</p>
      </div>
    </div>
  )
}

export default Creators

