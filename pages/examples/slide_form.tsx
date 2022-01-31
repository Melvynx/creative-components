import styled from "@emotion/styled";
import Layout from "~/components/layout/Layout";
import {
  SlideBackButton,
  SlideForm,
  SlideFormChildren,
  useSlideFormContext,
} from "~/components/slide-form/SlideForm";
import { Button, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useState } from "react";

const SlideFormExample = () => {
  return (
    <Layout>
      <Wrapper>
        <SlideForm tabs={["email", "password", "2fa"]} initialTab={"email"}>
          <SlideBackButton>
            <BackButton>
              <ArrowBackRoundedIcon />
            </BackButton>
          </SlideBackButton>
          <Title>Login</Title>
          <SlideFormChildren tab="email">
            <EmailForm />
          </SlideFormChildren>
          <SlideFormChildren tab="password">
            <PasswordForm />
          </SlideFormChildren>
          <SlideFormChildren tab="2fa">
            <LastForm />
          </SlideFormChildren>
        </SlideForm>
      </Wrapper>
    </Layout>
  );
};

const EmailForm = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { next } = useSlideFormContext();

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        const email = e.target["email"].value;

        // check email with regex
        if (!email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
          setError("Invalid email");
          return;
        }

        setIsLoading(true);
        setTimeout(() => {
          setError("");
          setIsLoading(false);
          next(email);
        }, 500);
      }}
    >
      <FormTitle>Login</FormTitle>
      <TextField
        name={"email"}
        error={Boolean(error)}
        helperText={error}
        fullWidth
        label={"email"}
      />
      <LoadingButton loading={isLoading} type={"submit"} fullWidth>
        Next
      </LoadingButton>
    </Form>
  );
};

const PasswordForm = () => {
  const { next } = useSlideFormContext();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();

        const password = e.target["password"].value;

        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          next(password);
        }, 500);
      }}
    >
      <FormTitle>Password</FormTitle>
      <TextField
        name={"password"}
        fullWidth
        label={"password"}
        type={"password"}
      />
      <LoadingButton loading={isLoading} type={"submit"} fullWidth>
        Next
      </LoadingButton>
    </Form>
  );
};

const LastForm = () => {
  const { submit } = useSlideFormContext();

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        submit((values) => {
          console.log(values);
        });
      }}
    >
      <FormTitle>2FA</FormTitle>
      -- TO DO --
      <Button type={"submit"} fullWidth>
        Submit
      </Button>
    </Form>
  );
};

const Title = styled.h2`
  font-size: 2rem;
  text-align: center;
  font-weight: 300;
`;

const FormTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 500;
`;

const BackButton = styled.button`
  position: absolute;
  top: var(--padding);
  left: var(--padding);
  width: 32px;
  height: 32px;
  cursor: pointer;
  border-radius: 1000px;
  background-color: hsl(0 0% 100% / 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: hsl(0 0% 100% / 0.8);
  }
`;

const Wrapper = styled.div`
  background: linear-gradient(
    330deg,
    hsl(272 51% 54%) 0%,
    hsl(226 70% 55.5%) 100%
  );
  border-radius: 8px;
  padding: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
`;

export default SlideFormExample;
