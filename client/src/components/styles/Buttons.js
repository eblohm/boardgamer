import styled from 'styled-components';

const DefaultButton = styled.button`
  border: none;
  border-radius: 2px;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem 1.5rem;
`;

export const PlainButton = styled(DefaultButton)`
  background-color: ${(props) => props.theme.gray};

  &,
  a {
    color: ${(props) => props.theme.black};
    text-decoration: none;
  }

  .submit-button {
    background: transparent;
    border: 0;
  }
`;

export const RedButton = styled(DefaultButton)`
  background-color: ${(props) => props.theme.red};

  &,
  a {
    color: ${(props) => props.theme.white};
    text-decoration: none;
  }
`;

export const BlueButton = styled(DefaultButton)`
  background-color: ${(props) => props.theme.blue};

  &,
  a {
    color: ${(props) => props.theme.white};
    text-decoration: none;
  }
`;

export const GreenButton = styled(DefaultButton)`
  background-color: ${(props) => props.theme.green};

  &,
  a {
    color: ${(props) => props.theme.white};
    text-decoration: none;
  }
`;
