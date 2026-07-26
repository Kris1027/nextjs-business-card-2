/* public/ is uniformly webp - see the README's project-structure section.
   Add a declaration here only when a format is actually imported. */
declare module '*.webp' {
  const content: import('next/image').StaticImageData;
  export default content;
}
