export default interface Column {
  [key: string]: any;
  id?: number;
  parent_category?: {
    name: string;
    id: number;
  };
  subcategory?: {
    name: string;
    id: number;
  };
  urls?: string[];
  banner_volume?: {
    value: number;
    cpm: string;
  };
  video_volume?: {
    value: number;
    cpm: string;
  };
  native_volume?: {
    value: number;
    cpm: string;
  };
}
