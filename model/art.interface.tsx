export enum ArtType {
  IMAGE = "image",
  VIDEO = "video",
}

export interface ArtPropertiesInterface {
  id?: string;
  link: string;
  name: string;
  description?: string;
  descriptionLink?: string;
  isFeatured?: boolean;
  thumbnails?: ArtThumbnailsMapInterface;
  isVideo?: boolean;
  cover?: string;
  width?: number;
  height?: number;
  coverWidth?: number;
  coverHeight?: number;
}

export interface ArtThumbnailsMapInterface {
  thumbnail: string;
  medium: string;
}
