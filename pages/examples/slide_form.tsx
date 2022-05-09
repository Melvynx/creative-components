import styled from "@emotion/styled";
import Layout from "~/components/layout/Layout";
import {
  SlideBackButton,
  SlideForm,
  SlideFormTab,
  useSlideFormContext,
} from "~/components/slide-form";
import { TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { HiArrowSmLeft } from "react-icons/hi";
import { useRef, useState } from "react";
import { TwoFAInput, TwoFAInputState } from "~/components/creative/TwoFAInput";
import { ExampleWrapper } from "~/components/ExampleWrapper";

const SlideFormExample = () => {
  return (
    <ExampleWrapper>
      <SlideForm
        tabs={["email", "password", "2fa", "success"]}
        initialTab={"email"}
      >
        <SlideBackButton>
          <BackButton>
            <HiArrowSmLeft />
          </BackButton>
        </SlideBackButton>
        <Title>Login</Title>
        <SlideFormTab tab="email">
          <EmailForm />
        </SlideFormTab>
        <SlideFormTab tab="password">
          <PasswordForm />
        </SlideFormTab>
        <SlideFormTab tab="2fa">
          <LastForm />
        </SlideFormTab>
        <SlideFormTab tab="success">
          <SuccessForm />
        </SlideFormTab>
      </SlideForm>
    </ExampleWrapper>
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
        defaultValue={"jean@gmail.com"}
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
  const { next, submitForm, form } = useSlideFormContext();
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [twoFAState, setTwoFAState] = useState<TwoFAInputState>("idle");

  const checkCode = async (code: string) => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);

      setTimeout(() => {
        if (code === "666666") {
          resolve("");
          setTwoFAState("success");
          submitForm(code);

          // eslint-disable-next-line no-console
          console.log("Submit: ", form);

          setTimeout(() => {
            next(code);
          }, 250);
        } else {
          reject("Invalid code");
          setTwoFAState("error");
        }
        setIsLoading(false);
      }, 250);
    });
  };

  return (
    <Form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <FormTitle>2FA</FormTitle>
      <Body>
        Add your authentication code. You can find it in your OAuth2 app.
      </Body>
      <TwoFAInput
        state={twoFAState}
        onSubmit={async (code) => checkCode(code)}
      />
      <LoadingButton loading={isLoading} type={"submit"} fullWidth>
        Submit
      </LoadingButton>
    </Form>
  );
};

const SuccessForm = () => {
  return (
    <div>
      <FormTitle>Success</FormTitle>
      <p>You are logged in</p>
    </div>
  );
};

const Title = styled.h2`
  font-size: 2rem;
  text-align: center;
  font-weight: 300;
  margin-bottom: 16px;
`;

const FormTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 500;
`;

const Body = styled.p`
  font-size: 1rem;
  color: var(--color-gray-300);
`;

const BackButton = styled.button`
  position: absolute;
  top: var(--padding);
  left: var(--padding);
  width: 32px;
  height: 32px;
  cursor: pointer;
  border-radius: 1000px;
  background-color: var(--color-secondary);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    filter: brightness(0.8);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
`;

export default SlideFormExample;
