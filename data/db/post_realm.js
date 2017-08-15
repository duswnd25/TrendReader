exports.getSchema = function () {
    return {
        name: 'Post',
        properties: {
            name: 'string',
            favicon_src: 'string',
            header_src: 'string',
            title: 'string',
            link: 'string',
            summary: 'string',
            type: 'string',
            timestamp: 'date'
        }
    };
};