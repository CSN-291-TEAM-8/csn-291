import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
	html {
		font-size: 16px;
		box-sizing: border-box;
	}
	*, *:before, *:after {
		padding: 0;
		margin: 0;
		box-sizing: inherit;
	}
	.footer{
		color: ${(props) => props.theme.primaryColor};
		background: ${(props) => props.theme.footerColor};
		padding: 7px 3px;
	}
	textarea{
		color: ${(props) => props.theme.primaryColor};
		background: ${(props) => props.theme.bg};		
		border:1px solid ${(props) => props.theme.primaryColor} !important;		
	}
	.newpost-header textarea{
		height:50px !important;
		position:absolute;
		bottom:0px;
	}
	.modal-content:first-child{
		border:1px solid ${(props) => props.theme.primaryColor} !important;
	}
	body {
		font-family: 'Fira Sans', sans-serif;
		font-size: 1rem;
		line-height: 1.7;
		background: ${(props) => props.theme.bg};
		color: ${(props) => props.theme.primaryColor};
		overflow-x: hidden;
	}
	h1, h2, h3, h4, h5, h6 {
		font-weight: normal;
	}
	a {
		text-decoration: none;
		cursor: pointer;
		color: inherit;
	}
	.pointer {
		cursor: pointer;
	}
	.secondary {
		color: ${(props) => props.theme.secondaryColor};
	}
	.danger {
		color: ${(props) => props.theme.red};
	}
	button, svg {
	  cursor: pointer;
	}
	.bold {
		font-weight: 500;
	}
	*:focus {
	  outline: none;
	}
`;

export default GlobalStyle;