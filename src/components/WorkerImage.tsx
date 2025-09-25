import Image from 'next/image';

interface WorkerImageProps {
  id: number;
  alt?: string;
  width?: number;
  height?: number;
}

const WorkerImage = ({ id, alt = 'worker', width = 150, height = 150 }: WorkerImageProps) => {
  const src = `/workers/${id}.jpg`;

  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      onError={(e: any) => {
        e.currentTarget.src = '/workers/default.jpg'; // fallback
      }}
    />
  );
};

export default WorkerImage;
