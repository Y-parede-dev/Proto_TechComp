import { promises as fs, constants } from 'fs';

export const fileExistsCustom = async (filePath) => {
    try {
        await fs.access(filePath, constants.F_OK);
        return true;
    } catch (error) {
        return false;
    }
};