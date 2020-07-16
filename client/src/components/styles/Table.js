import styled from 'styled-components';

export const TableStyles = styled.table`
  border-collapse: collapse;
  margin: 0.75rem 0 1.5rem;

  th {
    background-color: ${(props) => props.theme.gray};
  }

  th,
  td {
    padding: 1rem;
    text-align: center;
  }

  tr {
    border-bottom: 1px solid ${(props) => props.theme.black};
  }
`;
