import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { HiOutlineExternalLink } from "react-icons/hi";
import Link from "next/link";
import { QUERIES } from "~/styles/constants";
import { useStickyState } from "~/hooks/useStickyState";
import { FiCheck, FiArrowRight } from "react-icons/fi";
import { ActionButton } from "~/components/notion-random-links/ActionButton";
import { Spinner } from "~/components/loader/Loader";
import { NotionLinkType } from "~/interfaces/notion";

export const NotionTodayLink = () => {
  const [link, setLink] = useStickyState<NotionLinkType>(null, "notion-link");
  console.log(link);
  const [isLoading, setIsLoading] = useState(false);

  const getRandomLink = () => {
    setIsLoading(true);
    void fetch("/api/notion")
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Notion API call failed");
        }
      })
      .then((json: NotionLinkType) => {
        setIsLoading(false);
        if (json) {
          console.log(json);
          setLink(json);
        }
      });
  };

  useEffect(() => {
    if (link !== null) return;
    getRandomLink();
  }, [link]);

  if (!link || isLoading) {
    return <p>loading...</p>;
  }

  return (
    <Wrapper>
      <Shadow />

      <Content>
        <Link href={link.data.url ?? "#"}>
          <a>
            <Title>{link.data.title}</Title>
          </a>
        </Link>

        <Tags>
          {link.data.tags.map((tag) => (
            <Tag key={tag.name} style={{ "--tag-color": tag.color }}>
              {tag.name}
            </Tag>
          ))}
        </Tags>

        <ButtonWrapper>
          <ActionButton
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
            <FiCheck /> Done
          </ActionButton>
          <NextButton
            onClick={() => {
              getRandomLink();
            }}
          >
            Next
            <FiArrowRight />
          </NextButton>
        </ButtonWrapper>

        {/* This element should be in the last position for css-selector */}
        {isLoading ? (
          <Loader>
            <Spinner />
          </Loader>
        ) : (
          <LinkIcon>
            {/* <Link href={link.url}> */}
            <a>
              <HiOutlineExternalLink />
            </a>
            {/* </Link> */}
          </LinkIcon>
        )}
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
    hsl(44, 100%, 56%) 100%
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const NextButton = styled(ActionButton)`
  & > svg {
    transition: transform 200ms var(--ease-in-out);
  }
  padding-right: 16px;

  &:hover > svg {
    transform: translateX(8px);
  }

  &:active > svg {
    transform: translateX(12px);
  }
`;

const LinkIcon = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  border-radius: 100%;
  background: var(--color-white);
  opacity: 0;
  transition: opacity 200ms var(--ease-in-out),
    transform 200ms var(--ease-in-out);
  cursor: pointer;

  & > * {
    color: #000000;
    margin: 12px;
    display: block;
  }

  &:hover {
    transform: scale(1.2);
  }
`;

const Wrapper = styled.div`
  --radius: 8px;
  border-radius: var(--radius);
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

const Loader = styled.div`
  position: absolute;
  inset: 0;
  background: hsl(0 0% 0% / 0.5);
  background-size: 200% auto;
  border-radius: var(--radius);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  font-family: var(--font-family-sans-serif);

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
