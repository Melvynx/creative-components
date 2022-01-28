import styled from '@emotion/styled';
import Layout from '~/components/Layout';
import NotifyMeInput from '~/components/NotifyMeInput';

const NotifyMe = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <Wrapper>
      <NotifyMeInput />
    </Wrapper>
  </Layout>
);

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: 8px;
  padding: 16px;
  display: flex;
  justify-content: center;
`;

export default NotifyMe;
