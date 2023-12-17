import { fireEvent, render, screen } from '@testing-library/react';
import InputBarWrap from '../Components/InputBar/InputBarWrap';
import Map from '../sportsman/Map';
import Header from '../sportsman/Header';

describe('畫面互動測試', () => {
    test('測試登入操作順暢', () => {
        const placeholder = '測試';
        render(
            <InputBarWrap placeholder={placeholder} />
        );

        const inputBar = screen.getByPlaceholderText(placeholder);
        expect(inputBar).toBeInTheDocument();
        expect(inputBar).toHaveValue('');
        const val = '測試文案';
        fireEvent.change(inputBar, { target: { value: val } });
        expect(inputBar).toHaveValue(val);
    });

    test('測試卡片顯示正常', () => {
        render(
            <Map />
        );

        const inputBar = screen.getByText('Map');
        expect(inputBar).toBeInTheDocument();
    });

    test('地圖操作顯示正常', () => {
        render(
            <Map />
        );

        const inputBar = screen.getByText('Map');
        expect(inputBar).toBeInTheDocument();
    });

    test('測試 HeaderBar 互動正常', () => {
        const mockFn1 = jest.fn();
        const mockFn2 = jest.fn();
        const mockFn3 = jest.fn();
        render(
            <Header
                handleShowMap={mockFn1}
                handleShowMenu={mockFn2}
                handleShowNotifications={mockFn3}
            />
        );

        const menu = screen.getByTestId('menu');
        const notification = screen.getByTestId('notification');
        const map = screen.getByTestId('map');
        expect(menu).toBeInTheDocument();
        expect(notification).toBeInTheDocument();
        expect(map).toBeInTheDocument();
        fireEvent.click(menu);
        fireEvent.click(notification);
        fireEvent.click(notification);
        fireEvent.click(map);
        fireEvent.click(map);
        fireEvent.click(map);
        expect(mockFn1.mock.calls.length).toBe(3);
        expect(mockFn2.mock.calls.length).toBe(1);
        expect(mockFn3.mock.calls.length).toBe(2);
    });
});