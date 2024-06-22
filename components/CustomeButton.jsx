import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({ title, handlePress, containerStyles, isLoading , textStyles}) => {
    return (
        <>
            <TouchableOpacity 
            style={[styles.button, containerStyles, {opacity: isLoading ? 0.5 : 1}]} 
            activeOpacity={0.7}
            disabled={isLoading}
            onPress={handlePress}
            >
                <Text className={`text-primary font-semibold text-lg ${textStyles}`}>{title}</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: 'rgb(255 156 1 )',
        paddingVertical: 16,
        borderRadius: 30,
        minHeight: "64px",
    },
});

export default CustomButton