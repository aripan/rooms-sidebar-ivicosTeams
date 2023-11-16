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

export const convertBlobToBinaryData = async (imageRes) => {
    // create the buffer from the Blob object
    const imageArrayBuffer = await imageRes.arrayBuffer();
    const imageBuffer = Buffer.from(imageArrayBuffer);

    // convert it to base64 and then to imageUrl
    const imageBase64String = imageBuffer.toString('base64');
    const image = 'data:image/jpeg;base64,' + imageBase64String;

    return image
}


