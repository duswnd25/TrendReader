let message = {};

message.rootMenu = ['최신글', 'WEB', 'GitHub'];
message.blogList = [];

message.typeText = (postText, postSubMenu) => {
    let result = {
        message: {
            text: postText,
        },
        keyboard: {
            type: 'buttons',
            buttons: message.rootMenu
        }
    };

    if (typeof postSubMenu === 'object') {
        result.keyboard.buttons = postSubMenu;
    } else {
        switch (postSubMenu) {
            case '메인':
                result.keyboard.buttons = message.rootMenu;
                break;
            case '블로그목록':
                break;
        }
    }

    return result;
};

message.typePhoto = (postText, postImgUrl, postLabel, postButtonUrl) => {
    return {
        "message": {
            "text": postText,
            "photo": {
                "url": postImgUrl,
                "width": 640,
                "height": 480
            },
            "message_button": {
                "label": postLabel,
                "url": postButtonUrl
            }
        },
        "keyboard": {
            "type": "buttons",
            "buttons": message.rootMenu
        }
    };
};

message.typeButton = (postText, postLabel, postButtonUrl) => {
    return {
        "message": {
            "text": postText,
            "message_button": {
                "label": postLabel,
                "url": postButtonUrl
            }
        }, "keyboard": {
            "type": "buttons",
            "buttons": message.rootMenu
        }
    };
};

module.exports = message;