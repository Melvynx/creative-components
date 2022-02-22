import { Client } from "@notionhq/client";
import { ApiHandler } from "~/interfaces/next-api";

const notion = new Client({ auth: process.env.NOTION_API_TOKEN });

const handler: ApiHandler = async (req, res) => {
  if (req.method === "PATCH") {
    void patchHandler(req, res);
  }
  if (req.method === "GET") {
    void getHandler(req, res);
  }
  res.status(404);
};

const patchHandler: ApiHandler = async (req, res) => {
  const response = await notion.pages.update({
    page_id: req.body.pageId,
    properties: {
      Read: {
        checkbox: true,
      },
    },
  });
  res.status(200).json(response);
  return;
};

const getHandler: ApiHandler = async (req, res) => {
  const response = await notion.databases.query({
    database_id: "5b0fd593d0b74fa6a019c039ee362344",
    filter: {
      and: [
        {
          property: "Read",

          checkbox: {
            equals: false,
          },
        },
        {
          property: "Created",
          created_time: {
            before: "2022-02-08T20:45:00.000Z",
          },
        },
      ],
    },

    sorts: [
      {
        property: "Created",
        direction: "descending",
      },
    ],
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const randomResult: any =
    response.results[Math.floor(Math.random() * response.results.length)];

  if (randomResult.object !== "page") {
    res.status(404);
    return;
  }

  const json = {
    data: {
      title: `${randomResult.icon?.emoji ?? ""} ${
        randomResult.properties["\ufeffName"].title[0].plain_text
      }`.trim(),
      url: randomResult.properties.URL.url,
      tags: randomResult.properties.Tags.multi_select.map((m) => ({
        name: m.name,
        color: m.color,
      })),
    },
  };

  res.status(200).json(json);
};

export default handler;
