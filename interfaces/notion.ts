export type NotionLinkType = {
  data: {
    title: string;
    url: string;
    tags: {
      name: string;
      color: string;
    }[];
  };
  id: number;
  url: string;
};
