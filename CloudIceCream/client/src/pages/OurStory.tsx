import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function OurStoryPage() {
  return (
    <div className="container max-w-5xl py-10">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 text-primary">Our Story</h1>
        <div className="max-w-2xl mx-auto">
          <p className="text-xl text-gray-600">Discover how a childhood memory transformed into a mission to deliver moments of joy right to your doorstep.</p>
        </div>
        <div className="mt-8 relative">
          <div className="absolute -top-12 -left-12 w-24 h-24 bg-amber-100 rounded-full opacity-60 blur-xl"></div>
          <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-primary/20 rounded-full opacity-60 blur-xl"></div>
          <div className="relative z-10 h-[300px] rounded-2xl overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1501443762994-82bd5dace89a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Ice cream being served"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-24">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="mb-4 inline-block">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">Our Beginning</span>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-primary">How Clouds Was Born</h2>
            <Card className="p-6 bg-gradient-to-br from-white to-primary/5 border-primary/10">
              <p className="mb-4 text-gray-700">
                Clouds began with a simple idea: ice cream should be as effortless to order as it is delightful to enjoy. 
                In a world where time has become our most precious resource, we wanted to create an experience that 
                respects your time while delivering moments of pure joy.
              </p>
              <p className="text-gray-700">
                Our founder, inspired by childhood memories of rushing to catch the ice cream truck before it disappeared 
                around the corner, envisioned a modern solution — an ice cream experience that comes to you, 
                with just four clicks.
              </p>
              <div className="mt-6 flex items-center">
                <img 
                  src="https://images.unsplash.com/photo-1599740846312-4a2a26f63a8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" 
                  alt="Founder" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-gray-500">Founder & CEO</p>
                </div>
              </div>
            </Card>
          </div>
          <div className="relative">
            <div className="absolute -top-8 -right-8 w-16 h-16 bg-primary/20 rounded-full opacity-60 blur-md"></div>
            <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-amber-200 rounded-full opacity-60 blur-md"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Ice cream in a cone"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
        
        <Separator className="bg-primary/10" />
        
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <div className="relative h-[400px]">
              <div className="absolute top-0 left-0 w-[70%] h-[70%] rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                  alt="Ice cream making process"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-[60%] h-[60%] rounded-lg overflow-hidden shadow-lg border-4 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                  alt="Colorful ice cream"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-amber-100 rounded-full opacity-60 blur-md"></div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="mb-4 inline-block">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">Our Philosophy</span>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-primary">Art in Every Scoop</h2>
            <Card className="p-6 bg-gradient-to-br from-white to-primary/5 border-primary/10">
              <p className="mb-4 text-gray-700">
                At Clouds, we believe that ice cream is not just a dessert; it's an artistic expression crafted with love 
                by individuals passionate about delights and the art of ice cream making. Each flavor is a canvas, 
                thoughtfully composed to transport you to a moment of bliss.
              </p>
              <p className="mb-4 text-gray-700">
                Our commitment goes beyond just creating delicious treats. We're dedicated to saving you time with a 
                seamless experience so you can focus on what truly matters — enjoying life's simple pleasures with the people you love.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">Artisanal</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Small-batch</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Sustainable</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Innovative</span>
              </div>
            </Card>
          </div>
        </section>
        
        <Separator className="bg-primary/10" />
        
        <section>
          <div className="text-center mb-10">
            <div className="mb-4 inline-block">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">Our Craft</span>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-primary">The Art of Creating Perfect Ice Cream</h2>
            <p className="max-w-2xl mx-auto text-gray-600">We combine traditional techniques with innovative approaches to create cloud-like creations that captivate the senses.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-gradient-to-br from-white to-primary/5 border-primary/10 flex flex-col">
              <div className="bg-amber-100 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                  <path d="M12 2a8 8 0 0 0-8 8c0 5.2 8 12 8 12s8-6.8 8-12a8 8 0 0 0-8-8z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sourcing Ingredients</h3>
              <p className="text-gray-700 mb-4 flex-grow">
                We partner with local farmers to source the freshest, highest-quality ingredients for our handcrafted ice creams.
              </p>
              <a href="#" className="text-primary font-medium inline-flex items-center">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-white to-primary/5 border-primary/10 flex flex-col">
              <div className="bg-amber-100 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                  <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Small-Batch Production</h3>
              <p className="text-gray-700 mb-4 flex-grow">
                Each batch is carefully monitored to ensure the perfect texture and flavor profile that our customers love.
              </p>
              <a href="#" className="text-primary font-medium inline-flex items-center">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-white to-primary/5 border-primary/10 flex flex-col">
              <div className="bg-amber-100 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                  <path d="M16.5 9.4 7.55 4.24"></path><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovative Flavors</h3>
              <p className="text-gray-700 mb-4 flex-grow">
                Our artisans constantly experiment with new flavor combinations to create unique and memorable experiences.
              </p>
              <a href="#" className="text-primary font-medium inline-flex items-center">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </Card>
          </div>
        </section>
        
        <Separator className="bg-primary/10" />
        
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="mb-4 inline-block">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">Looking Forward</span>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-primary">Our Journey Continues</h2>
            <Card className="p-6 bg-gradient-to-br from-white to-primary/5 border-primary/10">
              <p className="mb-4 text-gray-700">
                As we continue to grow, our vision remains focused on creating moments of delight through 
                simplicity and excellence. We're constantly exploring new flavors, refining our processes, 
                and finding ways to make your experience even more seamless.
              </p>
              <p className="mb-4 text-gray-700">
                We're committed to sustainability and minimizing our environmental impact. From our 
                packaging choices to our delivery methods, we're continually seeking ways to be better stewards of our planet.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">24</p>
                  <p className="text-sm text-gray-600">Artisanal Flavors</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">12</p>
                  <p className="text-sm text-gray-600">Cities Served</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">100%</p>
                  <p className="text-sm text-gray-600">Eco-friendly Packaging</p>
                </div>
              </div>
            </Card>
          </div>
          <div className="relative">
            <div className="absolute -top-8 -right-8 w-16 h-16 bg-amber-100 rounded-full opacity-60 blur-md"></div>
            <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-primary/20 rounded-full opacity-60 blur-md"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Person enjoying ice cream"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
        
        <section className="relative py-16 px-8 bg-gradient-to-r from-primary/5 to-amber-50 rounded-3xl text-center">
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
              <path d="M12 2a8 8 0 0 0-8 8c0 5.2 8 12 8 12s8-6.8 8-12a8 8 0 0 0-8-8z"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-6 text-primary">From Our Hearts to Your Home</h2>
          <p className="italic text-xl text-gray-700 max-w-2xl mx-auto mb-6">
            "Life is like ice cream. Enjoy it before it melts."
          </p>
          <div className="mt-8 flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1532635241-17e820acc59f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80" 
              alt="Team" 
              className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md -ml-2"
            />
            <img 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80" 
              alt="Team" 
              className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md -ml-2"
            />
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80" 
              alt="Team" 
              className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md -ml-2"
            />
            <img 
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80" 
              alt="Team" 
              className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md -ml-2"
            />
          </div>
          <p className="mt-4 font-medium text-gray-700">With love, The Clouds Team</p>
        </section>
      </div>
    </div>
  );
}