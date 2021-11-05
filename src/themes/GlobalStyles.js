import { createGlobalStyle } from "styled-components";

// font-family: 'Lato', sans-serif;
// font-family: 'Open Sans', sans-serif;
// font-family: 'Poppins', sans-serif;

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
  }

  #root {
    min-height: 100vh;
    position: relative;
    display: table;
    height: 100%;
    width: 100%;
  }

  body {
    background: ${({ theme }) => theme.colors.body};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.font};
    /* transition: all 0.50s linear; */
    height: 100%;
    width: 100%;
  }

  a {
    color: ${({ theme }) => theme.colors.secondary};
    cursor: pointer;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  li, ul, ol {
    list-style: none;
  }

  button {
    border: 0;
    display: inline-block;
    padding: 12px 24px;
    font-size: 14px;
    border-radius: 4px;
    margin-top: 5px;
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.button.text};
    font-family: ${({ theme }) => theme.font};
    letter-spacing: 1px;
    font-weight: 600;
  }

  button.btn {
    background-color: ${({ theme }) => theme.colors.button.background};
    color: ${({ theme }) => theme.colors.button.text};
  }

  input {
    width: 100%;
    height: 2.75rem;
    padding: 0 1rem;
    margin-block: 0.5rem;
  }

  .layout-header, .layout-footer {
    z-index: 3;
  }
  .layout-main-content {
    z-index: 2;
  }
`;