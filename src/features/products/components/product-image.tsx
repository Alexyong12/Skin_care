import Image from "next/image";
import { cn } from "@/lib/utils/cn";

interface ProductImageProps {
  src?: string | null;
  alt: string;
  className?: string;
}

/** Square product photo with a soft placeholder when there is no image. */
export function ProductImage({ src, alt, className }: ProductImageProps) {
  return (
    <div
      className={cn(
        "relative aspect-square overflow-hidden rounded-lg bg-secondary",
        className,
      )}
    >
      {src ? (
        // `unoptimized` lets any backend/CDN host work without configuring next.config images.
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      ) : (
        <div className="flex h-full items-center justify-center text-4xl font-semibold text-primary/30">
          {alt.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
}
