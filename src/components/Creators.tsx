interface CreatorsProps {
  image: string;
  name: string;
  description: string;
}

export default function Creators({ image, name, description }: CreatorsProps) {
  return (
    <div className="flex items-center gap-3 p-3 w-full hover:bg-gray-100 cursor-pointer rounded-lg border border-gray-200">
      <img
        src={image}
        alt={name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <h3 className="text-base font-medium">{name}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}
