import React from 'react';
import Button from './Button';

export default function RouteList({ routes, onEdit, onDelete, onAddNewRoute }) {
  return (
    <div className="space-y-8 p-6 bg-gray-50 rounded-xl">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-lg border border-gray-100">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-600">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Route ID</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Source</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Destination</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Stops</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {routes.map((route) => (
              <tr key={route.routeId} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">{route.routeId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{route.routeSource}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{route.routeDestination}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{route.routeStops.join(', ')}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-3">
                  <Button variant="secondary" onClick={() => onEdit(route)} className="hover:scale-105 transform transition-transform duration-200">
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => onDelete(route.routeId)} className="hover:scale-105 transform transition-transform duration-200">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        <Button 
          variant="primary" 
          onClick={onAddNewRoute}
          className="px-6 py-2.5 hover:scale-105 transform transition-transform duration-200 shadow-lg hover:shadow-xl"
        >
          Add New Route
        </Button>
      </div>
    </div>
  );
}