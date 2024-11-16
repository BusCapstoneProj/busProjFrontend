import { useState, useEffect, useCallback } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import BusForm from '../components/forms/BusForm';
import RouteForm from '../components/forms/RouteForm';

import AssignRouteForm from '../components/forms/AssignRouteForm';
import BusList from '../components/BusList';
import RouteList from '../components/RouteList';
import toast from 'react-hot-toast';



export default function AdminDashBoard() {
  const [activeTab, setActiveTab] = useState('buses');
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [showBusForm, setShowBusForm] = useState(false);
  const [showRouteForm, setShowRouteForm] = useState(false);
  const [showAssignRouteForm, setShowAssignRouteForm] = useState(false);
  const [selectedBusId, setSelectedBusId] = useState(null);
  const [isEditingRoute, setIsEditingRoute] = useState(false);

  const [busFormData, setBusFormData] = useState({
    busId: '',
    seatCapacity: 0,
    currentOccupancy: 0,
    currentLocation: '',
    routeId: '',
    adminId: ''
  });

  const [routeFormData, setRouteFormData] = useState({
    routeId: '',
    routeSource: '',
    routeDestination: '',
    routeStops: []
  });

  const [assignRouteFormData, setAssignRouteFormData] = useState({
    busId: '',
    routeId: ''
  });

  const fetchBuses = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8081/api/admin/allBuses');
      if (!response.ok) throw new Error('Failed to fetch buses');
      const data = await response.json();
      setBuses(data);
    } catch (error) {
      toast.error('Failed to fetch buses');
      console.error('Error fetching buses:', error);
    }
  }, []);

  const fetchRoutes = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8083/api/routes/allRoutes');
      if (!response.ok) throw new Error('Failed to fetch routes');
      const data = await response.json();
      setRoutes(data);
    } catch (error) {
      // Add custom styles for the error message container
      const errorContainerStyle = {
        padding: "20px",
        background: "linear-gradient(135deg, #ff6b6b 0%, #ff4757 100%)",
        borderRadius: "15px",
        margin: "20px auto",
        maxWidth: "500px",
        boxShadow: "0 10px 25px rgba(255, 71, 87, 0.2)",
        animation: "slideIn 0.5s ease, pulse 2s infinite",
        border: "3px solid rgba(255,255,255,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        transition: "all 0.3s ease",
        transform: "translateY(-5px)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)"
      };

      // Create and append error container to DOM
      const errorContainer = document.createElement('div');
      Object.assign(errorContainer.style, errorContainerStyle);
      
      // Add error message with styling and animation
      errorContainer.innerHTML = `
        <style>
          @keyframes slideIn {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
          }
          .error-icon {
            font-size: 48px;
            margin-bottom: 15px;
            animation: rotate 1s ease;
          }
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        </style>
        <div class="error-icon">⚠️</div>
        <div style="
          color: white;
          font-size: 24px;
          font-weight: bold;
          text-align: center;
          margin-bottom: 15px;
          font-family: 'Poppins', sans-serif;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        ">
          Failed to fetch routes
        </div>
        <div style="
          color: rgba(255,255,255,0.9);
          font-size: 16px;
          text-align: center;
          font-family: 'Poppins', sans-serif;
          line-height: 1.5;
          max-width: 80%;
        ">
          Unable to load route information. Please try again later or contact support.
        </div>
      `;

      // Add to page temporarily with fade out animation
      document.body.appendChild(errorContainer);
      setTimeout(() => {
        errorContainer.style.opacity = '0';
        errorContainer.style.transform = 'translateY(20px)';
        setTimeout(() => errorContainer.remove(), 500);
      }, 4500);

      // Enhanced toast notification
      toast.error('Failed to fetch routes', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: {
          background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
          borderRadius: "15px",
          padding: "20px",
          color: "white",
          fontSize: "16px",
          fontWeight: "600",
          boxShadow: "0 8px 20px rgba(255, 71, 87, 0.25)",
          border: "2px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)"
        }
      });

      console.error('Error fetching routes:', error);
    }
  }, []);

  useEffect(() => {
    fetchBuses();
    fetchRoutes();
  }, [fetchBuses, fetchRoutes]);

  const handleBusSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8081/api/admin/buses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(busFormData),
      });

      if (!response.ok) throw new Error('Failed to save bus');
      
      toast.success('Bus added successfully!');
      setShowBusForm(false);
      setBusFormData({
        busId: '',
        seatCapacity: 0,
        currentOccupancy: 0,
        currentLocation: '',
        routeId: '',
        adminId: ''
      });
      await fetchBuses();
    } catch (error) {
      toast.error('Error adding bus');
      console.error('Error saving bus:', error);
    }
  };

  const handleRouteSubmit = async (e) => {
    e.preventDefault();
    try {
        const url = isEditingRoute 
            ? `http://localhost:8083/api/routes/${routeFormData.routeId}` 
            : 'http://localhost:8083/api/routes/addRoute';
        
        const response = await fetch(url, {
            method: isEditingRoute ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(routeFormData),
        });

        if (!response.ok) {
            throw new Error(`Failed to ${isEditingRoute ? 'update' : 'save'} route`);
        }
        
        toast.success(`Route ${isEditingRoute ? 'updated' : 'added'} successfully!`);
        setShowRouteForm(false);
        setIsEditingRoute(false);
        setRouteFormData({
            routeId: '',
            routeSource: '',
            routeDestination: '',
            routeStops: [],
        });
        await fetchRoutes();
    } catch (error) {
        toast.error(`Error ${isEditingRoute ? 'updating' : 'adding'} route`);
        console.error(`Error ${isEditingRoute ? 'updating' : 'saving'} route:`, error);
    }
};


  const handleAssignRouteSubmit = async (e) => {
    e.preventDefault();
    try {
      const { busId, routeId } = assignRouteFormData; // Destructure the busId and routeId from form data
      const response = await fetch(`http://localhost:8082/api/buses/setRouteToBus/${busId}/${routeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ routeId }),
      });
  
      if (!response.ok) throw new Error('Failed to assign route');
  
      toast.success('Route assigned successfully!');
      setShowAssignRouteForm(false);
      setAssignRouteFormData({
        busId: '',
        routeId: ''
      });
      await fetchBuses(); // Refresh the buses after assignment
    } catch (error) {
      toast.error('Error assigning route');
      console.error('Error assigning route:', error);
    }
  };
  


  const handleDeleteBus = async (busId) => {
    try {
      const response = await fetch(`http://localhost:8081/api/admin/buses/${busId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete bus');
      
      toast.success('Bus deleted successfully!');
      await fetchBuses();
    } catch (error) {
      toast.error('Error deleting bus');
      console.error('Error deleting bus:', error);
    }
  };

  const handleDeleteRoute = async (routeId) => {
    try {
      const response = await fetch(`http://localhost:8083/api/routes/deleteRoute/${routeId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete route');
      
      toast.success('Route deleted successfully!');
      await fetchRoutes();
    } catch (error) {
      toast.error('Error deleting route');
      console.error('Error deleting route:', error);
    }
  };

  const handleAssignRoute = (busId) => {
    setSelectedBusId(busId);
    setAssignRouteFormData({ busId, routeId: '' });
    setShowAssignRouteForm(true);
  };

  const handleEditRoute = (route) => {
    setRouteFormData(route);
    setIsEditingRoute(true);
    setShowRouteForm(true);
  };

  return (
    <div className="space-y-8">
      <div className="text-center text-white space-y-4">
        <h1 className="text-5xl font-bold">Admin DashBoard</h1>
        <p className="text-xl">Manage buses and routes</p>
      </div>

      <div className="flex justify-center space-x-4 mb-8">
        <Button 
          variant={activeTab === 'buses' ? 'primary' : 'secondary'}
          onClick={() => setActiveTab('buses')}
        >
          Manage Buses
        </Button>
        <Button 
          variant={activeTab === 'routes' ? 'primary' : 'secondary'}
          onClick={() => setActiveTab('routes')}
        >
          Manage Routes
        </Button>
      </div>

      {activeTab === 'buses' && (
        <div className="space-y-6">
          {!showBusForm && !showAssignRouteForm && (
            <BusList
              buses={buses}
              onDelete={handleDeleteBus}
              onAddNewBus={() => setShowBusForm(true)}
              onAssignRoute={handleAssignRoute}
            />
          )}
          
          {showBusForm && (
            <Card>
              <h2 className="text-2xl font-bold text-blue-900 mb-6">Add New Bus</h2>
              <BusForm 
                onSubmit={handleBusSubmit}
                formData={busFormData}
                setFormData={setBusFormData}
                onCancel={() => {
                  setShowBusForm(false);
                  setBusFormData({
                    busId: '',
                    seatCapacity: 0,
                    currentOccupancy: 0,
                    currentLocation: '',
                    routeId: '',
                    adminId: ''
                  });
                }}
              />
            </Card>
          )}

          {showAssignRouteForm && (
            <Card>
              <h2 className="text-2xl font-bold text-blue-900 mb-6">Assign Route to Bus</h2>
              <AssignRouteForm 
                onSubmit={handleAssignRouteSubmit}
                formData={assignRouteFormData}
                setFormData={setAssignRouteFormData}
                availableRoutes={routes}
                onCancel={() => {
                  setShowAssignRouteForm(false);
                  setAssignRouteFormData({
                    busId: '',
                    routeId: ''
                  });
                }}
              />
            </Card>
          )}
        </div>
      )}

      {activeTab === 'routes' && (
        <div className="space-y-6">
          {!showRouteForm && (
            <RouteList
              routes={routes}
              onEdit={handleEditRoute}
              onDelete={handleDeleteRoute}
              onAddNewRoute={() => setShowRouteForm(true)}
            />
          )}

          {showRouteForm && (
            <Card>
              <h2 className="text-2xl font-bold text-blue-900 mb-6">
                {isEditingRoute ? 'Edit Route' : 'Add New Route'}
              </h2>
              <RouteForm 
                onSubmit={handleRouteSubmit}
                formData={routeFormData}
                setFormData={setRouteFormData}
                onCancel={() => {
                  setShowRouteForm(false);
                  setIsEditingRoute(false);
                  setRouteFormData({
                    routeId: '',
                    routeSource: '',
                    routeDestination: '',
                    routeStops: []
                  });
                }}
              />
            </Card>
          )}
        </div>
      )}
    </div>
  );
}