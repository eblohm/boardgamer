import styled from 'styled-components';

export const PostFormStyles = styled.div`
  margin-bottom: 2rem;

  h3 {
    margin-top: 1rem;
  }

  form {
    textarea {
      border: 1px solid ${(props) => props.theme.green};
      border-radius: 2px;
      font-family: 'Raleway', sans-serif;
      margin: 0.5rem 0;
      padding: 0.5rem;
      resize: none;
      width: 100%;
    }
  }
`;

export const ItemStyles = styled.div`
  border: 1px solid ${(props) => props.theme.purple};
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  padding: 1rem;

  @media screen and (min-width: 500px) {
    flex-direction: row;
  }

  .user-info {
    margin-right: 2rem;
    text-align: center;

    a {
      color: ${(props) => props.theme.purple};
      margin-top: 0.5rem;
      text-decoration: none;
    }
  }

  .post-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .comment-count {
      background-color: ${(props) => props.theme.green};
      border-radius: 50%;
      padding: 0.25rem 0.65rem;
    }

    .post-actions {
      margin-top: 1rem;
      button {
        &:not(:last-child) {
          margin-right: 1rem;
        }
      }
    }
  }
`;
