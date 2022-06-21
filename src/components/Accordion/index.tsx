import { Content } from './style';

interface AccordionInterface {
  children: React.ReactNode;
}

export function Accordion({ children }: AccordionInterface) {
  return (
    <Content>
      <div className="accordion" id="accordionExample">
        {children}
      </div>
    </Content>
  );
}
