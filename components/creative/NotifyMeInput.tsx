import { css } from "@emotion/css";
import styled from "@emotion/styled";
import React, { FormEvent, useState } from "react";
// import { animated, config, useSpring } from 'react-spring';
import { motion } from "framer-motion";

export default function NotifyMeInput({
  onSubmit,
}: {
  onSubmit: (email: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value: string | undefined = event.target["email"].value;
    if (!value) return;

    setOpen(false);
    setSubmitted(true);
    onSubmit(value);
  };

  const inputStyle: Record<string, string> = {
    transform: open ? "scale(1)" : "scale(0)",
    position: open ? "relative" : "absolute",
    left: open ? "0" : "8px",
    transformOrigin: open ? "center center" : "left center",
  };

  const buttonStyle: Record<string, string> = {
    transform: open ? "scale(1)" : "scale(0)",
    position: open ? "relative" : "absolute",
    right: open ? "0" : "8px",
    "--color": "#ffffff",
    transformOrigin: open ? "left center" : "right center",
  };

  const contentStyle: Record<string, string> = {
    transform: open ? "scale(0)" : "scale(1)",
    position: open ? "absolute" : "relative",
  };

  const containerStyle: Record<string, string> = {
    "--delay-close": open ? "0ms" : "200ms",
    "--delay-open": open ? "200ms" : "0ms",
    "--justify-content": "center",
  };

  return (
    <>
      <motion.div
        className={css({
          backgroundColor: "var(--neutral-color)",
          borderRadius: 1000,
          padding: 8,

          "--transition-duration": "350ms",
          "--timing-function": "cubic-bezier(0.29, 0, 0.55, 1.2)",
          "--primary-color": "#f47b73",
          "--neutral-color": "#ffffff",
        })}
        animate={{
          width: open ? 300 : 150,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
          mass: 0.5,
          duration: 0.25,
        }}
      >
        <Container style={containerStyle} onSubmit={onFormSubmit}>
          <Input
            name="email"
            type="email"
            style={inputStyle}
            placeholder="E-mail"
          />
          <Button type="submit" style={buttonStyle} value="Send" />
          <Content
            onClick={() => {
              setOpen(true);
            }}
            style={contentStyle}
          >
            {submitted ? "Thanks you" : "Notify me"}
          </Content>
        </Container>
      </motion.div>
    </>
  );
}

const Container = styled.form`
  font-family: var(--font-family-sans-serif);

  border-radius: 1000px;
  position: relative;

  display: flex;
  justify-content: var(--justify-content);
  align-items: center;
`;

const Button = styled.input`
  font-family: inherit;

  padding: 8px 12px;
  border-radius: 1000px;
  cursor: pointer;
  margin-left: auto;

  color: var(--neutral-color);
  background-color: var(--primary-color);
  transition-delay: var(--delay-open);
  transition: transform var(--transition-duration) var(--timing-function);
`;

const Input = styled.input`
  font-family: inherit;
  min-width: 200px;
  border: none;
  margin-left: 8px;
  background: transparent;
  outline: none;
  color: var(--primary-color);
  transition-delay: var(--delay-open);
  transition: transform var(--transition-duration) var(--timing-function);
`;

const Content = styled.span`
  font-family: inherit;
  line-height: 2.5rem;
  cursor: pointer;
  padding: 0 8px;
  color: var(--primary-color);
  transition-delay: var(--delay-close);
  transition: transform var(--transition-duration) var(--timing-function);
`;
