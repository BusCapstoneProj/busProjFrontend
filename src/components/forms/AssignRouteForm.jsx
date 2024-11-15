import React from 'react';
import Button from '../Button';

export default function AssignRouteForm({ onSubmit, formData, setFormData, availableRoutes, onCancel }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Bus ID</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-100"
          value={formData.busId}
          disabled
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Route ID</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.routeId}
          onChange={(e) => setFormData({ ...formData, routeId: e.target.value })}
          required
        >
          <option value="">Select a route</option>
          {availableRoutes.map((route) => (
            <option key={route.routeId} value={route.routeId}>
              {route.routeId} - {route.routeSource} to {route.routeDestination}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Assign Route
        </Button>
      </div>
    </form>
  );
}