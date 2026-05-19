import MechanicAvatar from "./MechanicAvatar";

export default function MechanicListCard({ name, status, avatar }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
      <div className="flex items-center space-x-3">
        <MechanicAvatar src={avatar} alt={name} />
        <div>
          <h4 className="text-sm font-bold text-gray-800">{name}</h4>
          <p className="text-xs text-gray-400">{status}</p>
        </div>
      </div>
    </div>
  );
}