export default function AlertCard({ title, location, type }: any) {
  const borderColor = type === 'alert' ? 'border-sys-alert' : 'border-sys-warn';
  
  return (
    <div className={`bg-sys-card border-l-4 ${borderColor} p-3 rounded-r-sm`}>
      <p className="text-[10px] font-bold text-white uppercase">{title}</p>
      <p className="text-[9px] text-sys-text">{location}</p>
    </div>
  );
}