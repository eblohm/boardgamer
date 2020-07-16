import styled from 'styled-components';

export const ProfileFormStyles = styled.div`
  small {
    font-size: 0.75rem;
  }

  .social-button {
    margin-bottom: 1rem;
  }

  .form-actions {
    .form-submit {
      margin-right: 1rem;
    }
  }

  form {
    .form-group {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;

      &.social-input {
        flex-direction: row;

        i {
          width: 45px;
        }

        input {
          width: 100%;
        }
      }

      input,
      textarea {
        border: 1px solid ${(props) => props.theme.purple};
        border-radius: 5px;
        font-family: 'Raleway', sans-serif;
        padding: 0.5rem;
      }

      textarea {
        resize: none;
      }
    }
  }

  p {
    margin: 0.5rem 0;
  }
`;
