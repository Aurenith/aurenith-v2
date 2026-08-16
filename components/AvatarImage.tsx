"use client";

import { useState, useEffect, ReactNode } from "react";

interface AvatarImageProps {
  src?: string;
  alt: string;
  children: ReactNode;
}

export default function AvatarImage({ src, alt, children }: AvatarImageProps) {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  if (src && !error) {
    return (
      <img
        src={src}
        alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        onError={() => setError(true)}
      />
    );
  }

  return <>{children}</>;
}
