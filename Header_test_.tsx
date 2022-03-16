import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { IconCards, IconSettings } from '../../../Foundation/Media';
import Header from '../index';
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
const backFunc = jest.fn();

const createTestProps = (props: Object) => ({
    navigation: {
        navigate: jest.fn(),
        goBack: backFunc
    },
    ...props
});
describe('Header Test', () => {
    let props: any;
    it('Renders simple Header', () => {
        props = createTestProps({});
        const component = render(<Header {...props} />);
        expect(component).toMatchSnapshot();
    });
    it('Renders simple Header with title', () => {
        props = createTestProps({});
        const component = render(<Header {...props} title="Header" />);
        expect(component).toMatchSnapshot();
    });
    it('Header Back Click', () => {
        const goBack = jest.fn();
        const navigate = jest.fn();
        props = createTestProps({});
        const component = render(<Header navigation={{ goBack, navigate }} />);
        const event = component.getByTestId('backTouchTest');
        fireEvent.press(event);
        expect(goBack).toBeCalledTimes(1);
    });
    it('Header Back Click with custom function', () => {
        const func = jest.fn();
        props = createTestProps({});
        const component = render(<Header {...props} handleBack={func} />);
        const event = component.getByTestId('backTouchTest');
        fireEvent.press(event);
        expect(func).toBeCalledTimes(1);
    });
    it('Header with Label and Click', () => {
        const func = jest.fn();
        props = createTestProps({});
        const component = render(
            <Header
                {...props}
                label={{
                    title: 'Label',
                    action: func
                }}
            />
        );
        expect(component).toMatchSnapshot();
        const event = component.getByTestId('labelTouchTest');
        fireEvent.press(event);
        expect(func).toBeCalledTimes(1);
    });
    it('Header with icon and Click', () => {
        const func1 = jest.fn();
        const func2 = jest.fn();
        props = createTestProps({});
        const component = render(
            <Header
                {...props}
                title="Header"
                appControls={[
                    {
                        title: 'cards',
                        icon: <IconCards />,
                        action: func1
                    },
                    {
                        title: 'settings',
                        icon: <IconSettings />,
                        action: func2
                    }
                ]}
            />
        );
        expect(component).toMatchSnapshot();
        const event = component.getByTestId('iconTouchTest1');
        fireEvent.press(event);
        expect(func1).toBeCalledTimes(1);
    });
    it('Header with More Vert and Click', () => {
        const func = jest.fn();
        const func1 = jest.fn();

        props = createTestProps({});
        const component = render(
            <Header
                {...props}
                label={{
                    title: 'Label',
                    action: func1
                }}
                moreVert={func}
            />
        );
        expect(component).toMatchSnapshot();
        const event = component.getByTestId('moreVertTouchTest');
        fireEvent.press(event);
        expect(func).toBeCalledTimes(1);
    });
});
