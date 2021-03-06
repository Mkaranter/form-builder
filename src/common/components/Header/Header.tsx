import React from 'react'
import styled from 'styled-components'

import { Colors } from 'utils/enums'

const HeaderStyled = styled.header`
    background: ${Colors.Primary};
    grid-area: header;

    h1 {
        margin-left: 20px;
        text-transform: uppercase;
    }
`

const Header: React.FC = () => (
    <HeaderStyled>
        <h1>form builder</h1>
    </HeaderStyled>
)

export default Header
