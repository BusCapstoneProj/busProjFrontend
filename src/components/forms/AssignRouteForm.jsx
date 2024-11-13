import Button from '../Button';

export default function AssignRouteForm({ onSubmit, formData, setFormData }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Bus ID</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.busId}
          onChange={(e) => setFormData({ ...formData, busId: e.target.value })}
          required
        />
      </div>
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
      <Button type="submit" fullWidth>Assign Route</Button>
    </form>
  );
}