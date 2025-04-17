export const generateQuestionErrorMessage = (path: string, message: string): string => {
    const match = path.match(/(\d+)/);
    const itemNum = match ? parseInt(match[0], 10) + 1 : "unknown";
    return `Question No. ${itemNum} ${message}`;
};