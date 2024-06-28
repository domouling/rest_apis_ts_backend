import { connectDB } from '../server';
import db from '../config/db';

jest.mock('../config/db')
describe('connectDB', () => {
    it('Should handle database connection error', async () => {
        jest.spyOn(db, 'authenticate').mockReturnValueOnce(Promise.reject(new Error('Error al conectar a la base de datos')));
        const consoleSpy = jest.spyOn(console, 'log');

        await connectDB();

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error al conectar a la base de datos'));
    })
})

