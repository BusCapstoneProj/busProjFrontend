import React from 'react';
import Button from './Button';

export default function BusList({ buses, onDelete, onAddNewBus, onAssignRoute }) {
  return (
    <div className="space-y-6">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bus ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Occupancy</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {buses.map((bus) => (
              <tr key={bus.busId}>
                <td className="px-6 py-4 whitespace-nowrap">{bus.busId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{bus.seatCapacity}</td>
                <td className="px-6 py-4 whitespace-nowrap">{bus.currentOccupancy}</td>
                <td className="px-6 py-4 whitespace-nowrap">{bus.currentLocation}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {bus.routeId || (
                    <Button onClick={() => onAssignRoute(bus.busId)}>
                      Assign Route
                    </Button>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button variant="danger" onClick={() => onDelete(bus.busId)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        <Button variant="primary" onClick={onAddNewBus}>
          Add New Bus
        </Button>
      </div>
    </div>
  );
}