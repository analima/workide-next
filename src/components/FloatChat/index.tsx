import { Content } from './style';
import chat from '../../assets/chat.svg';
// eslint-disable-next-line 
export default function FloatChat() {
  return ( 
    <Content>

      <a href ="https://wa.me/55061991053691" rel="noreferrer" target="_blank">
        <img id="chat" src={chat} alt="Fale conosco!" />
      </a>
    
    </Content>
  )
}
