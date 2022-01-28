import { ClassNames } from '@emotion/react';
import styled from '@emotion/styled';
import React, { FormEvent, useState } from 'react';
import { animated, config, useSpring } from 'react-spring';

export default function NotifyMeInput() {
  const [open, setOpen] = useState(false);
  const [submited, setSubmited] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value: string | undefined = event.target['email'].value;
    if (!value) return;

    setOpen(false);
    setSubmited(true);
    alert(`Submited ! ${value}`);
  };

  const { width } = useSpring({
    width: open ? 300 : 150,
    config: config.gentle,
  });

  const inputStyle: Record<string, string> = {
    transform: open ? 'scale(1)' : 'scale(0)',
    position: open ? 'relative' : 'absolute',
    left: open ? '0' : '8px',
  };

  const buttonStyle: Record<string, string> = {
    transform: open ? 'scale(1)' : 'scale(0)',
    position: open ? 'relative' : 'absolute',
    right: open ? '0' : '8px',
    '--color': '#ffffff',
  };

  const contentStyle: Record<string, string> = {
    transform: open ? 'scale(0)' : 'scale(1)',
    position: open ? 'absolute' : 'relative',
  };

  const containerStyle: Record<string, string> = {
    '--delay-close': open ? '0ms' : '200ms',
    '--delay-open': open ? '200ms' : '0ms',
  };

  return (
    <ClassNames>
      {({ css }) => (
        <animated.div
          className={css({
            backgroundColor: 'var(--neutral-color)',
            borderRadius: 1000,
            padding: 8,

            '--transition-duration': '350ms',
            '--timing-function': 'cubic-bezier(0.29, 0, 0.55, 1.2)',
            '--primary-color': '#f47b73',
            '--neutral-color': '#ffffff',
          })}
          style={{
            width,
          }}
        >
          <Container
            style={containerStyle}
            onSubmit={(e) => {
              onSubmit(e);
            }}
          >
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
              {submited ? 'Thanks you' : 'Notify me'}
            </Content>
          </Container>
        </animated.div>
      )}
    </ClassNames>
  );
}

const Container = styled.form`
  font-family: var(--font-family-sans-serif);

  border-radius: 1000px;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.input`
  font-family: inherit;

  padding: 8px 12px;
  border-radius: 1000px;
  cursor: pointer;

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
  transform-origin: left center;
  color: var(--primary-color);
  transition-delay: var(--delay-open);
  transition: transform var(--transition-duration) var(--timing-function);
`;

const Content = styled.span`
  font-family: inherit;
  line-height: 2.5rem;
  cursor: pointer;
  padding: 0px 8px;
  color: var(--primary-color);
  transition-delay: var(--delay-close);
  transition: transform var(--transition-duration) var(--timing-function);
`;
