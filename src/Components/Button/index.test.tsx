import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Button from './index'; // 把 TodoButton 引用進來

describe('元件測試 Button', () => {
    test('當按下按鈕時，確定 onClick 有被呼叫', () => {
        const mockFunc = jest.fn(); // 宣告一個模擬用的函式
        render( // 將 TodoButton 渲染出來，因為之後才可以被抓得到
            <Button
                text="TEST BTN"
                onClick={mockFunc}
            />
        );

        const todoButton = screen.getByText('TEST BTN');
        expect(todoButton).toBeInTheDocument();
        fireEvent.click(todoButton);
        expect(mockFunc.mock.calls).toHaveLength(1);
        fireEvent.click(todoButton);
        expect(mockFunc.mock.calls).toHaveLength(2);
    });
});