export default function MechanicAvatar({ src, alt = "Mekanik" }) {
  return (
    <img 
      className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" 
      src={src || "https://images.unsplash.com/photo-1534528741775-53994a69daeb"} 
      alt={alt} 
    />
  );
}