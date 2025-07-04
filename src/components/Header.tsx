import Image from 'next/image'
import { Button } from '@/components/ui/button'

const Header = () => {
  return (
    <header className="w-full bg-background/10 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="mx-auto px-4 xl:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <Image
              src="/equal-logo.png"
              alt="Equal Logo"
              width={150}
              height={50}
              className="h-8 w-auto"
              priority
            />
            <p className="text-sm text-gray-500"> | </p>
            <span className="text-sm text-gray-500">
              <span className="font-regular">India's One-Stop-Shop for Digital Verifications 🏆</span>
            </span>
          </div>
          {/* Navigation/Actions Section */}
          <div className="flex items-center space-x-4">
            <Button>
              Login
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 