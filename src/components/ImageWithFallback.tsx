import React from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallback?: string;
}

export function ImageWithFallback({ src, fallback, alt, ...props }: ImageWithFallbackProps) {
  return (
    <picture>
      <source srcSet={src} type="image/webp" />
      {fallback && <source srcSet={fallback} type="image/jpeg" />}
      <img src={fallback || src} alt={alt} {...props} />
    </picture>
  );
}