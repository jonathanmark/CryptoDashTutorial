import './App.css';
import Welcome from "./WelcomeMessage";
import styled, {css} from 'styled-components'
import AppLayout from "./AppLayout";


const MyButton = styled.div`
  color: green;
  ${props => props.primary && css `
    color: palevioletred;
  `}
`

function App() {
  return (
    <AppLayout>
      <Welcome/>
      <MyButton>Hello</MyButton>
      <MyButton primary>Hello</MyButton>
    </AppLayout>
  );
}

export default App;
