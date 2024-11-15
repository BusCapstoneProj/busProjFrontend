import React from 'react';
import Button from './Button';

export default function RouteList({ routes, onEdit, onDelete, onAddNewRoute }) {
  return (
    <div className="space-y-6">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stops</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {routes.map((route) => (
              <tr key={route.routeId}>
                <td className="px-6 py-4 whitespace-nowrap">{route.routeId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{route.routeSource}</td>
                <td className="px-6 py-4 whitespace-nowrap">{route.routeDestination}</td>
                <td className="px-6 py-4 whitespace-nowrap">{route.routeStops.join(', ')}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <Button variant="secondary" onClick={() => onEdit(route)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => onDelete(route.routeId)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        <Button variant="primary" onClick={onAddNewRoute}>
          Add New Route
        </Button>
      </div>
    </div>
  );
}