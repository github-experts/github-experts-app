import { css } from 'styled-components';
import media from 'styled-media-query';

export const RequestFormStyles = css`
  height: calc(100% - 52px);

  .pills {
    background: #f7fbff;
  }
  .top-section {
    padding: 2rem 3rem;
  }
  .column-info {
    flex: 3;
    justify-content: space-around;
  }
  .cta-button {
    flex: 1;
    justify-content: center;
    text-align: center;
    margin: auto;
  }
  footer {
    height: 60px;
    border-top: 1px solid rgb(220, 223, 227);
  }
  .radio-checkboxes {
    line-height: 2rem;
    input {
      margin-right: 0.5rem;
    }
  }
  ${media.lessThan('medium')`
  .form-group textarea.form-control {
    height: unset;
    min-height: unset;
  }
`}
`;
