import React, { useState } from 'react'
import { Settings, LogOut } from 'lucide-react'
import { 
  DropdownMenu, 
  DropdownMenuContent,
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="flex items-center justify-between bg-white p-3 shadow-md">
      {/* Brand logo */}
      <a href="/" className="flex items-center space-x-2">
        {/* <img 
          src="../../public/guru.jpeg" 
          alt="Brand Logo" 
          width={30} 
          height={30}
        /> */}
        <span className="text-xl font-bold">Gurukul</span>
      </a>

      {/* User profile dropdown */}
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <img 
              src="../../public/profile.png" 
              alt="Arpit Khare" 
              width={40} 
              height={40} 
              className="rounded-full"
            />
            <span className="sr-only">Open user menu</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem asChild>
            <a href="/settings" className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <button 
              onClick={() => console.log('Logout clicked')} 
              className="flex w-full items-center text-red-600"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  )
}

