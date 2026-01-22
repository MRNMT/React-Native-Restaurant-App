import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Input, Text, Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearError } from '../redux/authSlice';
import { useTheme } from '../contexts/ThemeContext';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');

    const dispatch = useDispatch();
    const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth);
    const { theme } = useTheme();

    useEffect(() => {
        if (error) {
            Alert.alert('Registration Failed', error);
            dispatch(clearError());
        }
    }, [error, dispatch]);

    useEffect(() => {
        if (isAuthenticated) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            });
        }
    }, [isAuthenticated, navigation]);

    const handleRegister = () => {
        if (!name || !surname || !email || !password || !contact || !address) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        const userData = {
            name,
            surname,
            email,
            password,
            contact,
            address,
        };

        dispatch(registerUser(userData));
    };

    return (
        <LinearGradient 
            colors={[theme.colors.background, theme.colors.cardBackground]} 
            style={styles.container}
        >
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.header}>
                        <Text h3 style={[styles.title, { color: theme.colors.textPrimary }]}>Create Account</Text>
                        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
                            Join us and start ordering delicious food!
                        </Text>
                    </View>

                    <View style={[styles.formCard, { 
                        backgroundColor: theme.colors.cardBackground,
                        borderColor: theme.colors.border 
                    }]}>
                        <Input
                            placeholder="First Name"
                            placeholderTextColor={theme.colors.textPlaceholder}
                            inputStyle={{ color: theme.colors.textPrimary }}
                            inputContainerStyle={[styles.inputField, { backgroundColor: theme.colors.background }]}
                            onChangeText={setName}
                            leftIcon={<Icon name="user" type="feather" color={theme.colors.primary} size={20} />}
                        />
                        <Input
                            placeholder="Last Name"
                            placeholderTextColor={theme.colors.textPlaceholder}
                            inputStyle={{ color: theme.colors.textPrimary }}
                            inputContainerStyle={[styles.inputField, { backgroundColor: theme.colors.background }]}
                            onChangeText={setSurname}
                            leftIcon={<Icon name="user" type="feather" color={theme.colors.primary} size={20} />}
                        />
                        <Input
                            placeholder="Email Address"
                            placeholderTextColor={theme.colors.textPlaceholder}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            inputStyle={{ color: theme.colors.textPrimary }}
                            inputContainerStyle={[styles.inputField, { backgroundColor: theme.colors.background }]}
                            onChangeText={setEmail}
                            leftIcon={<Icon name="mail" type="feather" color={theme.colors.primary} size={20} />}
                        />
                        <Input
                            placeholder="Password"
                            placeholderTextColor={theme.colors.textPlaceholder}
                            secureTextEntry
                            inputStyle={{ color: theme.colors.textPrimary }}
                            inputContainerStyle={[styles.inputField, { backgroundColor: theme.colors.background }]}
                            onChangeText={setPassword}
                            leftIcon={<Icon name="lock" type="feather" color={theme.colors.primary} size={20} />}
                        />
                        <Input
                            placeholder="Contact Number"
                            placeholderTextColor={theme.colors.textPlaceholder}
                            keyboardType="phone-pad"
                            inputStyle={{ color: theme.colors.textPrimary }}
                            inputContainerStyle={[styles.inputField, { backgroundColor: theme.colors.background }]}
                            onChangeText={setContact}
                            leftIcon={<Icon name="phone" type="feather" color={theme.colors.primary} size={20} />}
                        />
                        <Input
                            placeholder="Address"
                            placeholderTextColor={theme.colors.textPlaceholder}
                            inputStyle={{ color: theme.colors.textPrimary }}
                            inputContainerStyle={[styles.inputField, { backgroundColor: theme.colors.background }]}
                            onChangeText={setAddress}
                            leftIcon={<Icon name="home" type="feather" color={theme.colors.primary} size={20} />}
                        />

                        <TouchableOpacity onPress={handleRegister} disabled={isLoading}>
                            <LinearGradient
                                colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
                                style={styles.button}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <Text style={styles.buttonText}>{isLoading ? 'Registering...' : 'Register'}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.dividerContainer}>
                        <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
                        <Text style={[styles.dividerText, { color: theme.colors.textSecondary }]}>OR SIGN UP WITH</Text>
                        <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
                    </View>

                    <View style={styles.socialContainer}>
                        {['google', 'facebook', 'apple', 'twitter'].map((brand) => (
                            <TouchableOpacity 
                                key={brand} 
                                style={[styles.socialIcon, { 
                                    backgroundColor: theme.colors.cardBackground,
                                    borderColor: theme.colors.border 
                                }]}
                            >
                                <Icon 
                                    name={brand} 
                                    type="font-awesome" 
                                    color={
                                        brand === 'google' ? '#DB4437' : 
                                        brand === 'facebook' ? '#4267B2' : 
                                        brand === 'twitter' ? '#1DA1F2' : 
                                        theme.colors.textPrimary
                                    }
                                />
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.footer}>
                        <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={[styles.linkText, { color: theme.colors.primary }]}>Log in</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 14,
        marginTop: 8,
        textAlign: 'center',
    },
    formCard: {
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
    },
    inputField: {
        borderBottomWidth: 0,
        borderRadius: 12,
        paddingHorizontal: 15,
        marginBottom: 10,
        height: 55,
    },
    button: {
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
        elevation: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 25,
    },
    divider: {
        flex: 1,
        height: 1,
    },
    dividerText: {
        paddingHorizontal: 10,
        fontSize: 12,
        fontWeight: 'bold',
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 25,
    },
    socialIcon: {
        marginHorizontal: 10,
        width: 50,
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    footerText: {
        fontSize: 15,
    },
    linkText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
});

export default RegisterScreen;