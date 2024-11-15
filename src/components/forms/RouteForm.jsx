import React from 'react';
import Button from '../Button';

export default function RouteForm({ onSubmit, formData, setFormData, onCancel }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Route ID</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.routeId}
          onChange={(e) => setFormData({ ...formData, routeId: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Source</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.routeSource}
          onChange={(e) => setFormData({ ...formData, routeSource: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Destination</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.routeDestination}
          onChange={(e) => setFormData({ ...formData, routeDestination: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Route Stops (comma-separated)</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.routeStops.join(', ')}
          onChange={(e) => setFormData({ 
            ...formData, 
            routeStops: e.target.value.split(',').map(stop => stop.trim())
          })}
          placeholder="Stop 1, Stop 2, Stop 3"
          required
        />
      </div>
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {formData.routeId ? 'Update Route' : 'Add Route'}
        </Button>
      </div>
    </form>
  );
}