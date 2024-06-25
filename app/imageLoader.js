"use client";
const imageLoader = ({ src, width, quality }) => {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/cabin-images/${src}`;
};

export default imageLoader;
