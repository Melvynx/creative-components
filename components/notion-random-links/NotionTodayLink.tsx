import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { HiOutlineExternalLink } from "react-icons/hi";

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

  useEffect(() => {
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
  }, []);

  if (!link) {
    return null;
  }

  return (
    <Wrapper>
      <Shadow />

      <Content>
        <Title key={link.id}>{link.data.title}</Title>
        <Tags>
          {link.data.tags.map((tag) => (
            <Tag key={tag.name} style={{ "--tag-color": tag.color }}>
              {tag.name}
            </Tag>
          ))}
        </Tags>

        <LinkIcon>
          <HiOutlineExternalLink />
        </LinkIcon>
      </Content>
    </Wrapper>
  );
};

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px;

  background-image: linear-gradient(
    300deg,
    hsl(240deg 31% 40%) 0%,
    hsl(294deg 35% 52%) 39%,
    hsl(349deg 58% 63%) 61%,
    hsl(43deg 100% 60%) 100%
  );
  border-radius: inherit;
  cursor: pointer;

  transition: transform 200ms var(--ease-in-out);
  &:hover {
    transform: translate(6px, 6px);
  }

  &:hover *:last-child {
    opacity: 1;
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
  transition: opacity 200ms var(--ease-in-out);

  & > * {
    color: #000000;
  }
`;

const Wrapper = styled.div`
  border-radius: 8px;
  margin: 16px;
  position: relative;
`;

const Shadow = styled.div`
  position: absolute;
  inset: 0;
  transform: translate(8px, 8px);
  background: #ffda79;
  border-radius: inherit;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
`;

const Tag = styled.span`
  background: var(--tag-color);
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
  padding: 4px 8px;
  text-transform: uppercase;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;
