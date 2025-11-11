interface ImageRendererProps {
  src: string;
  alt?: string;
  className?: string;
}

const ImageRenderer = ({
  src,
  alt = "",
  className = "",
}: ImageRendererProps) => {
  return (
    <div className={`my-2 ${className}`}>
      <img
        src={src}
        alt={alt}
        className="h-auto max-w-full rounded-md border border-gray-300 dark:border-gray-600"
        loading="lazy"
      />
    </div>
  );
};

export default ImageRenderer;
