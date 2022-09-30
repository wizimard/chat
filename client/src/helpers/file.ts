export enum fileFormats {
  IMAGE = 'jpg jpeg webp png',
  VIDEO = 'mp4 mkv',
  AUDIO = 'mp3 ogg'
}

export function getFileFormat(file: string) {
  const extension = file.split('.').at(-1) || '';

  if (fileFormats.IMAGE.includes(extension)) return 'image';
  if (fileFormats.VIDEO.includes(extension)) return 'video';
  if (fileFormats.AUDIO.includes(extension)) return 'audio';
  return 'document';
}