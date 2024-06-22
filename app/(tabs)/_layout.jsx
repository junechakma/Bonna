import { View, Text } from 'react-native';
import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TabIcon = ({ iconName, color, name, focused }) => {
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', gap: 2 }}>
            {iconName === 'waves' ? (
                <MaterialIcons name={iconName} size={24} color={color} />
            ) : (
                <MaterialCommunityIcons name={iconName} size={24} color={color} />
            )}
            <Text
                style={{
                    color: color,
                    fontWeight: focused ? '600' : '400', // Change font weight based on focus
                    fontSize: 10, // Adjust font size if needed
                }}
            >
                {name}
            </Text>
        </View>
    );
};

const TabsLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#FFA001',
                    tabBarInactiveTintColor: '#CDCDE0',
                    tabBarStyle: {
                        backgroundColor: '#161622',
                        borderTopWidth: 1,
                        borderTopColor: '#232533',
                        height: 56,
                    },
                }}
            >
                <Tabs.Screen
                    name='flood'
                    options={{
                        title: 'Flood Forecast',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                iconName="waves" // Name of the Material icon for flood (e.g., "waves")
                                color={color}
                                name="Flood"
                                focused={focused}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name='weather'
                    options={{
                        title: 'Weather Forecast',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                iconName="weather-pouring" // Name of the Material icon for weather (e.g., "wb_sunny")
                                color={color}
                                name="Weather"
                                focused={focused}
                            />
                        ),
                    }}
                />
            </Tabs>
        </>
    );
};

export default TabsLayout;
