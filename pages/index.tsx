import Layout from "../components/layout/Layout";
import Link from "next/link";
import { css } from "@emotion/css";

const IndexPage = () => {
  return (
    <Layout>
      <p>content</p>
      <Link href="examples/dropdown">
        <a
          className={css`
            color: red;
          `}
        >
          Dropdown
        </a>
      </Link>
    </Layout>
  );
};
export default IndexPage;
