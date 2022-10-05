import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
 * {
   margin: 0;
   padding: 0;
   outline: none;
   box-sizing: border-box;
   -webkit-font-smoothing: antialiased;
  scroll-behavior: smooth;
   -webkit-osx-font-smoothing: grayscale;

   @font-face {
     font-family: 'Renner';
     src: url('./fonts/Renner.ttf');
   }
 }

body,
input,
textarea,
select,
button {
  font: 400 1rem "Renner", sans-serif  !important;
}

body {
  background-color: #f3f3f3 !important;
  -webkit-font-smoothing: antialiased;
}

button {
  cursor: pointer;
}

a {
  color: inherit;
  text-decoration: none;
}

.form-label {
  margin-bottom: 6px;
}

span.required {
  color: #dc3545;
}

.form-control {
  height: 51px;
  width: 100%;
  background: #ffffff;

  border: 1px solid #949494;
  box-sizing: border-box;
  border-radius: 8px;
}

.form-group {
  margin-top: 10px;
}

.add-item > div {
  display: flex;
  width: 100%;
}

.add-item > div > div {
  flex: 1;
}

.add-item > div > div + div {
  margin-left: 1rem;
}

.add-item div:nth-child(2) {
  display: block;
}

.add-item button {
  height: 52px;
  width: 52px;
  margin-left: 1rem;
  padding: 16px !important;
  background: #fa7c49;
}

.add-item button:hover {
  background-color: #fb936a;
}

.add-item button svg {
  margin: 0;
  padding: 0;
}

.add-item ul {
  width: 100%;
  padding: 0;
  display: block !important;
  list-style: none;
}

.add-item li {
  width: 100%;
  margin-top: 8px;
  padding: 8px 16px;
  background-color: #e6e6e6;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.add-item li span {
  flex: 1;
}

.add-item select {
  flex: 1;
  width: 100%;
}

.error-message {
  color: #dc3545;
}

`;
