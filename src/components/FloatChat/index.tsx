import { Content } from './style';
import chat from '../../assets/chat.svg';
import Image from 'next/image'
// eslint-disable-next-line 
export default function FloatChat() {
  return ( 
    <Content>

      <a href ="https://wa.me/55061991053691" rel="noreferrer" target="_blank">
        <Image id="chat" src={chat} alt="Fale conosco!" />
      </a>
    
    </Content>
  )
}
