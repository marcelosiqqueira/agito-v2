export type AgitoEvent = {
  id: string;
  name: string;
  date: Date;
  time: string;
  local: string;
  clicks: number | undefined;
};

export type SelectedEvent = {
  id: string;
  imagesUrl: string[];
};

export type ResponseEvent = {
  id: string;
  name: string;
};

export type MongoEvent = {
  id: string;
  clicks: number;
}
