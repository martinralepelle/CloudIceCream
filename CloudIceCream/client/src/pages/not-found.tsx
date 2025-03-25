import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { Link } from "wouter";
import { useEffect } from "react";

export default function NotFound() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="py-20 w-full flex items-center justify-center bg-primary/5">
      <Card className="w-full max-w-md mx-4 shadow-md">
        <CardContent className="pt-8 pb-8 px-6">
          <div className="flex flex-col items-center text-center mb-6">
            <AlertCircle className="h-16 w-16 text-primary mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
            <p className="text-gray-600">
              The page you're looking for is currently under construction. 
              We're working on adding this content soon!
            </p>
          </div>

          <div className="mt-6">
            <Link 
              to="/" 
              className="flex items-center justify-center gap-2 bg-primary text-white py-3 px-4 rounded-lg w-full font-medium hover:bg-primary/90 transition-colors"
              onClick={() => window.scrollTo(0, 0)}
            >
              <Home size={18} />
              Return to Homepage
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
