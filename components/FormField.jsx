import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native'
import {useState} from 'react'

import {icons} from '../constants'

const FormField = ({title, value, placeholder,
                   handleChangeText, otherStyles, ...props}) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <TextInput className="text-base text-gray-100
            font-pmedium">{title}</TextInput>
            <View  className="w-full
            h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200
            focus:border-secondary flex items-center flex-row">
                <TextInput
                className="flex-1 text-white font-psemibold text-base"
                value={value}
                placeholder={placeholder}
                placeholderTextColor="#7b7b8b"
                onChange={handleChangeText}
                secureTextEntry={title === 'Password' && !showPassword}/>
                {title === "Password" && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image
                            source={!showPassword ? icons.eye : icons.eyeHide}
                            className="w-6 h-6"
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}
export default FormField
