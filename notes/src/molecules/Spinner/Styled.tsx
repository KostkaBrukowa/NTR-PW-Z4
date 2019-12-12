import { css, FlattenSimpleInterpolation, keyframes } from 'styled-components';

const spin = keyframes`
  0% {
  transform-origin: top right;
  transform: rotate(0turn);
  }

  100%{
  transform-origin: top left;
  transform: rotate(1turn);
  }
`;

export interface SpinnerProps {
  readonly title?: string;
  readonly isLoading: boolean;
}

const spinnerWidth = 25;
const spinnerHeight = 5;

export const Spinner = (props: SpinnerProps): FlattenSimpleInterpolation => css`
  position: relative;
  & > * {
    opacity: ${props.isLoading ? 0.3 : 1};
  }

  &::before {
    content: ${props.isLoading ? '' : 'none'}'';
    z-index: 1;
    width: ${spinnerWidth}px;
    height: ${spinnerHeight}px;
    background: aqua;
    position: absolute;
    left: calc(50% - ${spinnerWidth / 2}px);
    top: calc(50% - ${spinnerHeight / 2}px);
    animation: ${spin} 1s linear infinite;
  }

  &::after {
    content: '${props.isLoading ? props.title : undefined}';
    font-size: 1.5rem;
    position: absolute;
    left: calc(50% - ${spinnerWidth / 2}px);
    top: calc(50% - ${spinnerHeight / 2}px + 1rem);
    transform: translateX(-25%);
  }
`;
