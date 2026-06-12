export const detectImageFileFormat = async (fileData) => {
    const buffer = await fileData.slice(0, 4).arrayBuffer();
    const view = new Uint8Array(buffer);
    let hex = "";
    view.forEach((b) => {
        hex += b.toString(16).padStart(2, '0').toUpperCase();
    });
    let fileExtension = '.jpg';
    let realMimeType = 'image/jpeg';

    if (hex.startsWith('89504E47')) {
        fileExtension = '.png';
        realMimeType = 'image/png';
    } else if (hex.startsWith('FFD8FF')) {
        fileExtension = '.jpg';
        realMimeType = 'image/jpeg';
    } else if (hex.startsWith('52494646') && hex.endsWith('45')) {
        fileExtension = '.webp';
        realMimeType = 'image/webp';
    }
    return fileExtension
}