export const appendFullStop = (inputString: string): string => {
    const words: string[] = inputString.split(',');
    const wordsWithDot: string[] = words.map((word: string) => '.' + word.trim());
    const result: string = wordsWithDot.join(', ');
  
    return result;
}

export const getMediaDuration = (file: File): Promise<number> => {
    return new Promise((resolve, reject) => {
        const mediaElement = document.createElement(file.type === 'audio' ? 'audio' : 'video');
        mediaElement.src = URL.createObjectURL(file);
        mediaElement.onloadedmetadata = () => {
            resolve(mediaElement.duration);
        };
        mediaElement.onerror = reject;
    });
};
  