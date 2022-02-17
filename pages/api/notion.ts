import { Client } from "@notionhq/client";
import { ApiHandler } from "~/interfaces/next-api";

const client = new Client({ auth: process.env.NOTION_API_TOKEN });

const handler: ApiHandler = async (req, res) => {
  const response = await client.databases.query({
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

  const randomResult =
    response.results[Math.floor(Math.random() * response.results.length)];

  res.status(200).json(randomResult);
};

export default handler;
