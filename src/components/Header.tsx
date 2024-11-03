import { Camera } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Camera className="w-8 h-8 text-blue-500" />
            <h1 className="text-xl font-bold text-gray-800">DK Address Viewer</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link 
                  href="/about" 
                  className="text-gray-600 hover:text-blue-500 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/help"
                  className="text-gray-600 hover:text-blue-500 transition-colors"
                >
                  Help
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}