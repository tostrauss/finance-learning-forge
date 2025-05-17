import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/9c884c7d-61d5-4f77-afd9-d6b2d00e9c68.png" 
              alt="App Logo" 
              className="w-12 h-12"
            />
            <h1 className="text-2xl font-bold text-app-purple">Stock Trading App</h1>
          </div>
          <Link to="/signup">
            <Button className="bg-app-pink hover:bg-app-pink/90 text-white">Sign Up</Button>
          </Link>
        </div>
      </header>
      
      <main className="flex-grow flex items-center bg-gradient-to-br from-white to-app-light-purple/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-4xl font-bold text-app-purple mb-4">
                FLF
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Comprehensive trading platform with real-time market data, in-depth analysis tools,
                and educational resources from your syllabus to ease your investment journey.
              </p>

              <div className="flex space-x-4 mt-6">
                <Link to="/learning">
                  <Button className="bg-app-purple hover:bg-app-dark-purple text-white">
                    Start Learning
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="outline" className="border-app-purple text-app-purple hover:bg-app-light-purple/10">
                    Go to Dashboard
                  </Button>
                </Link>
              </div>
            </div>

            <div className="hidden md:block">
              <img 
                src="/lovable-uploads/c8f339f9-e514-4f19-b101-d560f37865b0.png" 
                alt="Stock Trading App Preview" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-600 text-sm">
            <p>Developed by: Tobias Strauss, Jaxon Holden, and Lars Dukart</p>
            <p className="mt-1">© 2025 Stock Trading App. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
