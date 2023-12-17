import { fireEvent, render, screen } from '@testing-library/react';
import InputBarWrap from './InputBarWrap';

describe('Input Bar 元件操作測試', () => {
    test('資料輸入測試', () => {
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
});