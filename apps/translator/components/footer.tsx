import React, { ReactElement } from 'react';

const Footer = (): ReactElement => (
    <div className="absolute bottom-0">
        <p>Want to dig deeper?</p>
        <p>
            <a href="/translations" className="text-green-600 hover:text-green-700"> See the full list of translations &rarr; </a>
        </p>
    </div>
)
export default Footer;