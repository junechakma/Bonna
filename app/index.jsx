import { router, Redirect } from 'expo-router';

import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import CustomButton from '../components/CustomeButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const buttonStyle = {
    width: "100%",
    marginTop: 28
}


export default function App() {
    return (

        <View className="relative w-full h-full">
           <StatusBar style="light" />
            <Image
                source={require('../assets/images/bg.png')}
                blurRadius={70}
                className="absolute w-full h-full "
            />
            <SafeAreaView className="w-full  ">
                <ScrollView contentContainerStyle={{ height: "100%" }} >
                    <View className="w-full flex-1 items-center justify-center h-full px-4 ">
                        <Image source={require('../assets/logo.png')}
                            className="w-52 h-52"
                        />

                        <View className="relative mt-5">
                            <Text className="text-4xl text-white font-bold text-center">
                                <Text className="text-orange-400 text-5xl"> Bonna {``}</Text>
                                ML Powered Flood Forecasting App
                            </Text>
                        </View>

                        {/* <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
                        Where creativity meets innovation : embark on a journey of limitless exploration with Aora
                    </Text> */}
                    
                    </View>
                    <View className="mb-24 px-4">
                        <CustomButton title="Flood Forecasting"
                            handlePress={() => router.push("/flood")}
                            containerStyles={buttonStyle}
                            textStyles="font-semibold text-lg"
                        />
                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}


