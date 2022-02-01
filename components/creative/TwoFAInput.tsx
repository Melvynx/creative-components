import styled from "@emotion/styled";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { QUERIES, WEIGHTS } from "~/styles/constants";

export type TwoFAInputState = "error" | "idle" | "success";

export const TwoFAInput = ({
  onSubmit,
  state = "idle",
}: {
  onSubmit: (code: string) => Promise<unknown>;
  state: TwoFAInputState;
}) => {
  const [digits, setDigits] = useState<string[]>(new Array(6).fill(""));
  const wrapperRef = useRef<HTMLDivElement>();

  const submit = () => {
    onSubmit(digits.join("")).catch(() => {
      setDigits(new Array(6).fill(""));
      (wrapperRef.current.children[0] as HTMLInputElement)?.focus();
    });
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    setDigits((prev) => {
      const copyPrev = [...prev];
      copyPrev[index] = event.target.value[event.target.value.length - 1] ?? "";
      return copyPrev;
    });

    if (index === digits.length - 1) {
      const unfilledInput = Array.from(wrapperRef.current.children).find(
        (i: HTMLInputElement) => !String(i.value).trim()
      ) as HTMLLinkElement;
      unfilledInput?.focus();
      return;
    }
    (wrapperRef.current.children[index + 1] as HTMLInputElement)?.focus();
  };

  useEffect(() => {
    const onPaste = (event: ClipboardEvent) => {
      const digits = event.clipboardData
        .getData("text")
        .split("")
        .reduce((acc, curr) => {
          if (acc.length > 6) {
            return acc;
          }

          const number = Number(curr);
          if (Number.isNaN(number) || number < 0 || number > 9) {
            return acc;
          }

          acc.push(number);
          return acc;
        }, []);

      setDigits(digits);
    };

    document.addEventListener("paste", onPaste);
    return () => {
      document.removeEventListener("paste", onPaste);
    };
  }, []);

  useEffect(() => {
    if (digits.every((e) => String(e).trim())) {
      submit();
    }
  }, [digits]);

  const styles: Record<string, string> =
    state === "idle"
      ? {}
      : {
          "--border-color":
            state === "error" ? "var(--color-error)" : "var(--color-success)",
          animation: state === "error" ? "shake 500ms var(--ease-in-out)" : "",
        };

  return (
    <Wrapper style={styles} ref={wrapperRef}>
      {digits.map((digit, index) => {
        return (
          <Input
            value={digit}
            onChange={(e) => {
              onChange(e, index);
            }}
            key={index}
          />
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  justify-content: center;
`;

const Input = styled.input`
  --input-border-color: var(--border-color, var(--color-primary));
  --size: 42px;
  --font-size: 1.2rem;

  @media ${QUERIES.tabletAndUp} {
    --size: 48px;
    --font-size: 1.4rem;
  }

  width: var(--size);
  height: var(--size);
  font-size: var(--font-size);
  border: 2px solid var(--input-border-color);
  color: var(--color-white);
  background-color: var(--color-gray-900);
  transition: transform 200ms var(--ease-out), filter 100ms var(--ease-out);

  border-radius: 4px;
  font-weight: ${WEIGHTS.bold};
  text-align: center;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 1px var(--input-border-color);
    transform: translateY(-2px);
  }

  &:hover {
    filter: brightness(0.95);
  }
`;
