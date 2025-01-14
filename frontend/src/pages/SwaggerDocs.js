import React from 'react';
import config from '../config.json';

function SwaggerDocs() {
    return (
        <iframe
            title="Swagger API Docs"
            src={`${config.backendUrl}/docs`}
            style={{ width: '100%', height: '80vh' }}
        />
    );
}

export default SwaggerDocs;