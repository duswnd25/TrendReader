exports.getSchema = function () {
    return {
        name: 'Post',
        primaryKey: 'id',
        properties: {
            id: 'string',
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