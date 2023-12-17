import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // 將檢測用的 expect 函式 引用進來（後面會看到）
import userEvent from '@testing-library/user-event';
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

        const todoButton = screen.getByText('TEST BTN'); // 在這邊「 Add todo 」是 TodoButton 裡面的內容
        userEvent.click(todoButton); // 模擬使用者的點擊行為
        expect(mockFunc).toBeCalledTimes(1); // 去預測函式是否真的因為點擊而被呼叫

        userEvent.click(todoButton);
        expect(mockFunc).toBeCalledTimes(2);
    });
});