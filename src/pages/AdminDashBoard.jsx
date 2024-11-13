import { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import BusForm from '../components/forms/BusForm';
import RouteForm from '../components/forms/RouteForm';
import AssignRouteForm from "../components/forms/AssignRouteForm";


import toast from 'react-hot-toast';

export default function AdminDashBoard() {
  const [activeTab, setActiveTab] = useState('buses');
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

  const [assignRouteData, setAssignRouteData] = useState({
    busId: '',
    routeId: ''
  });

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
      if (response.ok) {
        toast.success('Bus added successfully!');
        setBusFormData({
          busId: '',
          seatCapacity: 0,
          currentOccupancy: 0,
          currentLocation: '',
          routeId: '',
          adminId: ''
        });
      } else {
        toast.error('Failed to add bus');
      }
    } catch (error) {
      toast.error('Error adding bus');
    }
  };

  const handleRouteSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8081/api/admin/routes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(routeFormData),
      });
      if (response.ok) {
        toast.success('Route added successfully!');
        setRouteFormData({
          routeId: '',
          routeSource: '',
          routeDestination: '',
          routeStops: []
        });
      } else {
        toast.error('Failed to add route');
      }
    } catch (error) {
      toast.error('Error adding route');
    }
  };

  const handleAssignRoute = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8081/api/admin/buses/${assignRouteData.busId}/route?routeId=${assignRouteData.routeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.ok) {
        toast.success('Route assigned successfully!');
        setAssignRouteData({ busId: '', routeId: '' });
      } else {
        toast.error('Failed to assign route');
      }
    } catch (error) {
      toast.error('Error assigning route');
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center text-white space-y-4">
        <h1 className="text-5xl font-bold">Admin Dashboard</h1>
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
        <Button 
          variant={activeTab === 'assign' ? 'primary' : 'secondary'}
          onClick={() => setActiveTab('assign')}
        >
          Assign Routes
        </Button>
      </div>

      {activeTab === 'buses' && (
        <Card>
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Add New Bus</h2>
          <BusForm 
            onSubmit={handleBusSubmit}
            formData={busFormData}
            setFormData={setBusFormData}
          />
        </Card>
      )}

      {activeTab === 'routes' && (
        <Card>
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Add New Route</h2>
          <RouteForm 
            onSubmit={handleRouteSubmit}
            formData={routeFormData}
            setFormData={setRouteFormData}
          />
        </Card>
      )}

      {activeTab === 'assign' && (
        <Card>
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Assign Route to Bus</h2>
          <AssignRouteForm 
            onSubmit={handleAssignRoute}
            formData={assignRouteData}
            setFormData={setAssignRouteData}
          />
        </Card>
      )}
    </div>
  );
}