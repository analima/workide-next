import { Badge } from 'react-bootstrap';

interface BadgeProps extends React.HTMLAttributes<HTMLElement>  {
  colorBorda: string;
  color: string;
  text: string;
}

export function Badges({color, colorBorda, text}: BadgeProps) {

  const colorBadge = {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorBorda,
    color: color
  }

  return (
    <>
      <Badge pill style={colorBadge}>{text}</Badge>{' '}
    </>
  );
}
