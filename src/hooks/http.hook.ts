import axios from 'axios';

export const useHttp = () => {
    const request = async (url: string): Promise<any> => {
        try {
            const response = await axios.get(url);

            if (response.status !== 200) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`)
            }

            const data: any = await response.data;
            return data;
        } catch (e) {
            console.log(e)
            throw e;
        }
    }

    return {
        request
    }
}