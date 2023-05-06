export type AgitoEvent = {
  id: string;
  name: string;
  date: Date;
  time: string;
  local: string;
  clicks: number | null;
};

export type SelectedEvent = {
  id: string;
  imagesUrl: string[];
};

export type ResponseEvent = {
  id: string;
  name: string;
};
