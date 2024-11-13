import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Card from '../components/Card';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

export default function PassengerDashBoard() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [route, setRoute] = useState(null);
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [isBoarded, setIsBoarded] = useState(false); 
  const navigate=useNavigate()

  const findRoute = async () => {
    try {
      const response = await fetch(`http://localhost:8084/api/passengers/findRoute?source=${source}&destination=${destination}`);
      if (response.ok) {
        const routeData = await response.json();
        setRoute(routeData);
        // After finding route, get buses for this route
        getBusesForRoute(routeData.routeId);
      } else {
        toast.error('No route found for the selected stops');
      }
    } catch (error) {
      toast.error('Error finding route');
    }
  };

  const getBusesForRoute = async (routeId) => {
    try {
      const response = await fetch(`http://localhost:8084/api/passengers/route/${routeId}/buses`);
      if (response.ok) {
        const busesData = await response.json();
        setBuses(busesData);
      } else {
        toast.error('No buses found for this route');
      }
    } catch (error) {
      toast.error('Error fetching buses');
    }
  };

  const handleBoard = async (busId) => {
    try {
      //const passengerId = localStorage.getItem('passengerId'); // Assuming you store this on login
      const response = await fetch(`http://localhost:8082/api/buses/${busId}/board`, {
        method: 'PUT'
      });
      if (response.ok) {
        setIsBoarded(true);
        setSelectedBus(busId);
        toast.success('Successfully boarded the bus');
      } else {
        toast.error('Failed to board the bus');
      }
    } catch (error) {
      toast.error('Error while boarding');
    }
  };

  const handleDeboard = async (busId) => {
    try {
      //const passengerId = localStorage.getItem('passengerId');
      const response = await fetch(`http://localhost:8082/api/buses/${busId}/deboard`, {
        method: 'PUT'
      });
      if (response.ok) {
        setIsBoarded(false);
        setSelectedBus(null);
        toast.success('Successfully deboarded the bus');
      } else {
        toast.error('Failed to deboard the bus');
      }
    } catch (error) {
      toast.error('Error while deboarding');
    } 
    navigate(`/profile`)
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Find Your Route</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="Enter source location"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter destination"
            />
          </div>
        </div>
        <Button onClick={findRoute}>Find Route</Button>
      </Card>

      {route && (
        <Card>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Route Details</h3>
          <div className="space-y-2">
            <p><span className="font-medium">Route ID:</span> {route.routeId}</p>
            <p><span className="font-medium">Source:</span> {route.routeSource}</p>
            <p><span className="font-medium">Destination:</span> {route.routeDestination}</p>
            <div>
              <span className="font-medium">Stops:</span>
              <ul className="list-disc list-inside ml-4">
                {route.routeStops?.map((stop, index) => (
                  <li key={index}>{stop}</li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}

      {buses.length > 0 && (
        <Card>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Available Buses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {buses.map((bus) => (
              <div key={bus.busId} className="border rounded-lg p-4 shadow-sm">
                <p><span className="font-medium">Bus ID:</span> {bus.busId}</p>
                <p><span className="font-medium">Current Location:</span> {bus.currentLocation}</p>
                <p><span className="font-medium">Available Seats:</span> { bus.currentOccupancy}</p>
                {!isBoarded && (
                  <Button 
                    onClick={() => handleBoard(bus.busId)}
                    disabled={bus.currentOccupancy >= bus.seatCapacity}
                  >
                    Board Bus
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {isBoarded && (
        <Card>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Current Journey</h3>
          <p>You are currently on bus: {selectedBus}</p>
          <Button onClick={()=>handleDeboard(selectedBus)} variant="danger">Deboard Bus</Button>
        </Card>
      )}
    </div>
  );
}