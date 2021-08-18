import React from 'react';
import { Container } from '@material-ui/core';
import Lang from '../../auth/Lang';

const Index = (Component) => {
    return (
        <Container component="main" maxWidth="xs">
            <Lang/>
            <Component/>
        </Container>
    )
}

export default Index;