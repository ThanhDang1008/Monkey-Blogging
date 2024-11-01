import React, { Children } from "react";
import styled from "styled-components";
import { LoadingSpinner } from "../loading";
import PropTypes from "prop-types";
import { property } from "lodash";
const ButtonStyles = styled.button`
  cursor: pointer;
  padding: 0 25px;
  line-height: 1;
  color: white;
  border-radius: 8px;
  font-weight: 600;
  font-style: 18px;
  width: 100%;
  height: ${(props) => props.height || "66px"};
  display: flex;
  align-items: center;
  justify-content: center;

  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const Button = ({
  type = "button",
  onClick = () => {},
  children,
  isLoading, // Tách riêng isLoading ra, không truyền vào DOM
  ...props
}) => {
  const child = isLoading ? <LoadingSpinner></LoadingSpinner> : children;

  return (
    <ButtonStyles type={type} onClick={onClick} {...props}>
      {child}
    </ButtonStyles>
  );
};

Button.prototype = {
  type: PropTypes.oneOf(["button", "submit"]).isRequired,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default Button;
