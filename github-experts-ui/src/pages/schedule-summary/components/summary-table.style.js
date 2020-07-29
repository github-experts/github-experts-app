import styled from 'styled-components';

export const Styles = styled.div`
  overflow: auto;
  table {
    width: 100%;
    border-spacing: 0;
    /* border-top: 1px solid #d1d5da; */
    border-bottom: 0.5px solid #d1d5da;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th {
      text-align: left;
      font-size: 10px;
      color: #8a9db0;
      text-transform: uppercase;
    }

    th,
    td {
      margin: 0;
      padding: 1.5rem;
      height: 56px;
      border-bottom: 0.5px solid #c0c0c0;

      :last-child {
        border-right: 0;
      }
    }

    td {
      color: #596d82;
      font-size: 12px;
    }

    tr td:last-child {
      white-space: nowrap;
    }
  }
`;
