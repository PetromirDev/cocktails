import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        box-sizing: border-box;
    }
    html, body {
        padding: 0;
        font-size: 16px;
        font-family: "Chelsea Market", sans-serif;
    }
    a, button {
        cursor: pointer;
    }
    
    button {
        font-size: 1rem;
        font-family: "Chelsea Market", sans-serif;
        border: none;
        padding: .8em 1.4em;
    }

    input {
        font-family: "Chelsea Market", sans-serif;
        border: none;
        font-size: 1rem;
    }

    input:focus {
        outline: none;
    }

    @media (max-width: 1200px) {
        html, body {
            font-size: 14px;
        }
    }
`

export default GlobalStyle
