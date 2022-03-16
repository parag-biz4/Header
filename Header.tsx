import React from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import IconBackArrow from '../../Assets/Images/ic_back_arrow.svg';
import IconMoreVert from '../../Assets/Images/ic_more_vert.svg';
import Paragraph from '../../Atoms/Typography/Paragraph';
import { useTheme } from '../../Core/Provider';
import styles from './style';

type Props = React.ComponentPropsWithRef<typeof View> & {
    /**
     *Navigation Object.
     */
    navigation: any;

    /**
     * Handles back press function.
     */
    handleBack?: () => void;

    /**
     * Array of objects containing details of App control items and actions.
     */
    appControls?: {
        title: string;
        icon: React.ReactNode;
        action: () => void;
    }[];

    /**
     * For Labelled app control
     */
    label?: { title: string; action: () => void };

    /**
     * More vert menu option
     */
    moreVert?: () => void;

    /**
     * Header Title
     */
    title?: string;
    /**
     * Style Header.
     */
    style?: StyleProp<ViewStyle>;

    /**
     * Custom Theme
     */
    theme?: ThemedUIComponents.Theme;
};

const Header = ({
    navigation,
    handleBack,
    label,
    moreVert,
    title,
    style,
    appControls,
    theme: propsTheme
}: Props) => {
    const { theme: hookTheme } = useTheme();
    const theme = propsTheme ?? hookTheme;
    const defaultBackClick = () => {
        navigation?.goBack();
    };

    return (
        <View
            style={[
                styles.header,
                style,
                {
                    backgroundColor: theme?.colors?.SHADES?.DEFAULT,
                    borderBottomColor: theme?.colors?.NEUTRAL[200]
                }
            ]}
        >
            <TouchableOpacity
                style={styles.backBtnTouch}
                testID="backTouchTest"
                onPress={() => {
                    handleBack ? handleBack() : defaultBackClick();
                }}
            >
                <IconBackArrow
                    style={{ color: theme?.colors?.NEUTRAL?.[900] }}
                />
            </TouchableOpacity>

            <View style={{ flex: 1 }}>
                <Paragraph
                    type="medium"
                    fontStyle="semibold"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={[
                        styles.headerText,
                        { color: theme?.colors?.NEUTRAL[900] }
                    ]}
                >
                    {title ? title : ''}
                </Paragraph>
            </View>
            <View style={{ right: 0, flexDirection: 'row' }}>
                {label ? (
                    <TouchableOpacity
                        style={
                            !appControls && !moreVert
                                ? styles.lastIcon
                                : styles.touchIcon
                        }
                        testID="labelTouchTest"
                        onPress={label?.action}
                    >
                        <Paragraph
                            type="overline"
                            overlineType="small"
                            style={{ color: theme?.colors.NEUTRAL[500] }}
                        >
                            label
                        </Paragraph>
                    </TouchableOpacity>
                ) : null}
                {appControls?.length! > 0 &&
                    appControls?.slice(0, 2)?.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={`${item.title}+${index}`}
                                style={
                                    !moreVert &&
                                    index === appControls?.length - 1
                                        ? styles.lastIcon
                                        : styles.touchIcon
                                }
                                testID={`iconTouchTest${index + 1}`}
                                onPress={item?.action}
                            >
                                {item?.icon}
                            </TouchableOpacity>
                        );
                    })}
                {moreVert ? (
                    <TouchableOpacity
                        style={{ justifyContent: 'center' }}
                        testID="moreVertTouchTest"
                        onPress={moreVert}
                    >
                        <IconMoreVert
                            style={{ color: theme?.colors?.NEUTRAL?.[900] }}
                        />
                    </TouchableOpacity>
                ) : null}
            </View>
        </View>
    );
};

export default Header;
  
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        paddingVertical: SPACING?.MD,
        paddingHorizontal: SPACING?.BIG,
        alignItems: 'center',
        height: SPACING?.XX_SM * 14,
        borderRadius: 0,
        borderBottomWidth: BORDER_WIDTH?.REGULAR
    },
    headerText: {
        textAlignVertical: 'center',
        marginLeft: SPACING?.XXX_BIG,
        marginRight: SPACING?.MD
    },
    backBtnTouch: {
        left: 0
    },
    touchIcon: {
        paddingRight: SPACING?.X_BIG,
        justifyContent: 'center'
    },
    lastIcon: {
        justifyContent: 'center'
    }
});

