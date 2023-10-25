export function getAccessToken(teamsfxContext) {
    const accessToken = teamsfxContext['AccessToken'];
    if (!accessToken) {
        throw new Error('No access token was found in request header.');
    }
    return accessToken;
}

export function createResponse(status, body) {
    return {
        status,
        body,
    };
}


