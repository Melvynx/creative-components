import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { HiOutlineExternalLink } from "react-icons/hi";
import { MoveButton } from "~/components/creative/MoveButton";
import Link from "next/link";
import { QUERIES } from "~/styles/constants";

type NotionLinkType = {
  data: {
    title: string;
    url: string;
    tags: {
      name: string;
      color: string;
    }[];
  };
  id: number;
};

export const NotionTodayLink = () => {
  const [link, setLink] = useState<NotionLinkType>();

  const getRandomLink = () => {
    void fetch("/api/notion")
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Notion API call failed");
        }
      })
      .then((json) => {
        json.data = {
          title: `${json.icon?.emoji ?? ""} ${
            json.properties["\ufeffName"].title[0].plain_text
          }`.trim(),
          url: json.properties.URL.url,
          tags: json.properties.Tags.multi_select.map((m) => ({
            name: m.name,
            color: m.color,
          })),
        };
        setLink(json);
      });
  };

  useEffect(() => {
    getRandomLink();
  }, []);

  if (!link) {
    return null;
  }

  return (
    <Wrapper>
      <Shadow />

      <Content>
        <Link href={link.data.url}>
          <Title key={link.id}>{link.data.title}</Title>
        </Link>

        <Tags>
          {link.data.tags.map((tag) => (
            <Tag key={tag.name} style={{ "--tag-color": tag.color }}>
              {tag.name}
            </Tag>
          ))}
        </Tags>

        <MoveButton
          onClick={() => {
            void fetch("/api/notion", {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                pageId: link.id,
              }),
            }).then(async (e) => (e.ok ? getRandomLink() : null));
          }}
        >
          Check Read
        </MoveButton>

        <Link href={link.data.url}>
          <LinkIcon>
            <HiOutlineExternalLink />
          </LinkIcon>
        </Link>
      </Content>
    </Wrapper>
  );
};

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;

  background-image: linear-gradient(
    300deg,
    hsl(240deg 31% 40%) 0%,
    hsl(294deg 35% 52%) 39%,
    hsl(349deg 58% 63%) 61%,
    hsl(43deg 100% 60%) 100%
  );
  border-radius: inherit;

  transition: transform 200ms var(--ease-in-out);
  &:hover {
    transform: translate(6px, 6px);
  }

  &:hover *:last-child {
    opacity: 1;
  }

  @media ${QUERIES.tabletAndUp} {
    padding: 32px;
    gap: 16px;
  }
`;

const LinkIcon = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  border-radius: 100%;
  padding: 12px;
  background: var(--color-white);
  opacity: 0;
  transition: opacity 200ms var(--ease-in-out),
    transform 200ms var(--ease-in-out);
  cursor: pointer;

  & > * {
    color: #000000;
  }

  &:hover {
    transform: scale(1.2);
  }
`;

const Wrapper = styled.div`
  border-radius: 8px;
  margin: 8px;
  position: relative;

  @media ${QUERIES.tabletAndUp} {
    margin: 16px;
  }
`;

const Shadow = styled.div`
  position: absolute;
  inset: 0;
  transform: translate(8px, 8px);
  background: #ffda79;
  border-radius: inherit;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;

  @media ${QUERIES.tabletAndUp} {
    font-size: 2rem;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const Tag = styled.span`
  background: var(--tag-color);
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
  padding: 6px 8px;
  text-transform: uppercase;
  line-height: 1;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;
