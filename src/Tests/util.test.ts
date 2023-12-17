import { delay, getDistance } from '../utils';
import distanceFormat from '../utils/distanceFormat';
import getCurrentCoords from '../utils/getCurrentCoords';

describe('輔助套件功能測試', () => {
    describe('Delay 套件測試', () => {
        test('Delay 時間測試', (done) => {
            const testing = async (ms: number) => {
                const date1 = new Date().getTime();
                await delay(ms);
                const date2 = new Date().getTime();
                return [date1, date2];
            };

            const delayMS = 1000;
            testing(1000).then(([d1, d2]) => {
                expect(d2-d1).toBeGreaterThanOrEqual(delayMS);
                done();
            });
        }, 10000);
    });

    describe('DistanceFormat 套件測試', () => {
        test('1000次隨機 1-1000000000 隨機長度轉換公里測試(浮點數)', () => {
            for (let i = 0; i < 1000; i++) {
                const m = Math.random() * 1000000000;
                const mf = distanceFormat(m);
                const str = mf.toString().split('.')[1] || '';
                expect(mf * 1000 - m).toBeLessThanOrEqual(10);
                expect(str.length).toBeLessThanOrEqual(2);
            }
        });
    });

    describe('GPS 套件測試', () => {
        test('1000次取用，確保一定可以拿到定位', async () => {
            const testing = async () => {
                const coords = await getCurrentCoords();
                return coords;
            };

            const promises = [];
            for (let i = 0; i < 1000; i++) {
                promises.push(testing());
            }
            const values = await Promise.all(promises);
            values.forEach((val) => {
                expect(typeof val.latitude).toBe('number');
                expect(typeof val.longitude).toBe('number');
                expect(val.latitude).toBeLessThanOrEqual(90);
                expect(val.latitude).toBeGreaterThanOrEqual(-90);
                expect(val.longitude).toBeLessThanOrEqual(180);
                expect(val.longitude).toBeGreaterThanOrEqual(-180);
            });
        }, 10000);
    });

    describe('GPS 距離套件測試', () => {
        test('1000次隨機經緯度距離計算', async () => {
            for (let i = 0; i < 1000; i++) {
                const longitude = Math.random() * 360 - 180;
                const latitude = Math.random() * 180 - 90;
                const dist = await getDistance(longitude, latitude);
                expect(dist).toBeGreaterThanOrEqual(0);
                expect(dist).toBeLessThanOrEqual(50000);
            }
        });
    });
});

