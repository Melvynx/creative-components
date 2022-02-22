import { AnchorHTMLAttributes, PropsWithChildren } from "react";
import { WEIGHTS } from "~/styles/constants";
import { css } from "@emotion/css";
import Link from "next/link";

export const DropdownItem = ({
  children,
  href,
  ...props
}: PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>>) => {
  const link = (
    <a
      {...props}
      className={css`
        width: 100%;
        color: var(--color-purple-dark);
        font-size: 1rem;
        padding: 4px 8px;
        font-weight: ${WEIGHTS.normal};
        cursor: pointer;
        min-width: 128px;
        border-radius: 4px;
        font-family: var(--font-family-sans-serif);
        text-decoration: none;

        &:hover {
          background: var(--color-purple-main);
          color: white;
          text-decoration: underline;
        }
      `}
    >
      {children}
    </a>
  );

  if (href) {
    return (
      <Link href={href} {...props}>
        {link}
      </Link>
    );
  }
  return link;
};
