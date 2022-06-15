import { ContainerStyled, DescriptionStyled, ItemStyled, ListStyled } from "./styled"

type Items = {
    id: number;
    name: string
}

type Props = {
    data: Items[]
    children: React.ReactNode;
}

export const SuccessCase = ({data, children}:Props) => {
    <ContainerStyled>
        <ListStyled>
            {data.map(item =>(
                <ItemStyled key={item.id}>
                    {item.name}
                </ItemStyled>
            ))}
        </ListStyled>
        <DescriptionStyled>
            {children}
        </DescriptionStyled>
        
    </ContainerStyled>
}