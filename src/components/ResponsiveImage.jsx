import React from 'react';
import { srcSet } from '@/lib/utils';

// <picture> that serves AVIF, then WebP responsive variants, falling back to the
// original jpg/png <img>. Variants are produced by
// tools/generate-responsive-images.js. Pass `sizes` describing the rendered
// width so the browser can pick the smallest sufficient variant.
const ResponsiveImage = React.forwardRef(function ResponsiveImage(
  { src, alt = '', sizes = '100vw', className, loading = 'lazy', fetchpriority, onClick, ...rest },
  ref
) {
  return (
    <picture>
      <source type="image/avif" srcSet={srcSet(src, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(src, 'webp')} sizes={sizes} />
      <img
        ref={ref}
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        fetchpriority={fetchpriority}
        onClick={onClick}
        className={className}
        {...rest}
      />
    </picture>
  );
});

export default ResponsiveImage;
