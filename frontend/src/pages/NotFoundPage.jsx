import { useNavigate } from 'react-router-dom'
import { FaceFrownIcon } from '@heroicons/react/24/outline'
import AnimatedButton from '../components/ui/AnimatedButton'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <FaceFrownIcon className="h-16 w-16 text-gray-400 mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">404</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <AnimatedButton onClick={() => navigate('/')}>
        Go Home
      </AnimatedButton>
    </div>
  )
}