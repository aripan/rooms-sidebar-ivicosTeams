export const cardJson = {
    type: "AdaptiveCard",
    version: "1.2",
    body: [
        {
            type: "ColumnSet",
            columns: [
                {
                    type: "Column",
                    width: "auto",
                    items: [
                        {
                            type: "Image",
                            url: "https://randomuser.me/api/portraits/thumb/men/75.jpg",
                            size: "Small",
                            style: "Person",
                        },
                    ],
                },
                {
                    type: "Column",
                    width: "stretch",
                    items: [
                        {
                            type: "TextBlock",
                            text: "Random User",
                            weight: "Bolder",
                            size: "Medium",
                        },
                        {
                            type: "TextBlock",
                            text: "Available • Free all day",
                            spacing: "None",
                            size: "Small",
                            color: "Good",
                        },
                        {
                            type: "TextBlock",
                            text: "1:22 PM - Your local time",
                            spacing: "Small",
                            size: "Small",
                        },
                    ],
                },
            ],
        },
        {
            type: "ActionSet",
            actions: [
                {
                    type: "Action.OpenUrl",
                    title: "Contact",
                    url: "mailto:random.user@ivicos.eu",
                },
            ],
        },
    ],
};

export const cardJson2 = {
    type: "AdaptiveCard",
    version: "1.0",
    body: [
        {
            type: "ColumnSet",
            columns: [
                {
                    type: "Column",
                    width: "auto",

                    items: [
                        {
                            type: "Image",
                            url: "https://randomuser.me/api/portraits/thumb/men/75.jpg",
                            size: "Small",
                            style: "Person",
                        },
                    ],

                },
                {
                    type: "Column",
                    width: "stretch",
                    verticalContentAlignment: 'Center',
                    items: [
                        {
                            type: "TextBlock",
                            text: "Random User",
                            weight: "Bolder",
                            size: "Medium",
                        },

                    ],
                },

            ],
        },
        {
            type: "ActionSet",
            actions: [
                {
                    type: "Action.OpenUrl",
                    title: "Contact",
                    url: "mailto:random.user@ivicos.eu",
                },
            ],
        },
    ],
};