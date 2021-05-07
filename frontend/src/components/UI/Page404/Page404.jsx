import React from 'react';
import { Link } from 'react-router-dom';

const Page404 = (props) => {
    return (
        <div>
            <h1>This is the 404 Page</h1>
            <Link to="/">Go Home!</Link>
        </div>

    )
}

export default Page404