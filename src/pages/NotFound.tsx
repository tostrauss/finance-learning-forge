
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-app-light-gray">
      <div className="text-center max-w-md px-6">
        <h1 className="text-6xl font-bold mb-4 text-app-purple">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
        <p className="mb-8 text-gray-500">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button className="bg-app-purple hover:bg-app-dark-purple">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
