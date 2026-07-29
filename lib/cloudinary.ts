/**
 * Cloudinary Integration Helper for Chill Co.
 * Serves images directly from Cloudinary CDN without requiring any environment variables.
 */

export interface CloudinaryTransformOptions {
  cloudName?: string;
  width?: number;
  height?: number;
  crop?: 'fill' | 'fit' | 'limit' | 'scale' | 'thumb';
  quality?: 'auto' | number;
  format?: 'auto' | 'webp' | 'avif' | 'png' | 'jpg';
}

const DEFAULT_CLOUD_NAME = 'chill-co';

/**
 * Builds an optimized Cloudinary CDN URL given a Public ID, Cloudinary path, or full URL.
 * Works out-of-the-box with ZERO environment variables required!
 */
export function getCloudinaryUrl(
  publicIdOrPath: string,
  options: CloudinaryTransformOptions = {}
): string {
  if (!publicIdOrPath) return '';

  // If it's already a full HTTP/HTTPS URL or local path, return as-is
  if (publicIdOrPath.startsWith('http://') || publicIdOrPath.startsWith('https://')) {
    return publicIdOrPath;
  }

  // If it's a local static asset path, return as-is
  if (publicIdOrPath.startsWith('/') && !publicIdOrPath.startsWith('/v1/')) {
    return publicIdOrPath;
  }

  const {
    cloudName = DEFAULT_CLOUD_NAME,
    width,
    height,
    crop = 'fill',
    quality = 'auto',
    format = 'auto'
  } = options;

  const transforms: string[] = [`f_${format}`, `q_${quality}`];

  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (crop && (width || height)) transforms.push(`c_${crop}`);

  const transformString = transforms.join(',');
  const cleanPath = publicIdOrPath.replace(/^\//, '');

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}/${cleanPath}`;
}

/**
 * Next.js Image loader for Cloudinary (Zero env setup required)
 */
export function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('/')) {
    return src;
  }
  return getCloudinaryUrl(src, { width, quality: quality || 'auto' });
}
