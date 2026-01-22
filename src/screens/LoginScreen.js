import React, { useState, useEffect } from 'react';
import { 
    View, 
    StyleSheet, 
    Alert, 
    TouchableOpacity, 
    KeyboardAvoidingView, 
    Platform, 
    ScrollView,
    ActivityIndicator 
} from 'react-native';
import { Input, Text, Icon, CheckBox } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../redux/authSlice';
import { useTheme } from '../contexts/ThemeContext';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const dispatch = useDispatch();
    const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth);
    const { theme } = useTheme();

    useEffect(() => {
        if (error) {
            Alert.alert('Login Failed', error);
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

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        dispatch(loginUser({ email, password }));
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
                    {/* Header Section */}
                    <View style={styles.header}>
                        <Text h2 style={[styles.title, { color: theme.colors.textPrimary }]}>
                            Crave <Text style={{color: theme.colors.primary}}>&</Text> Click
                        </Text>
                        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
                            Welcome back! Please login to continue.
                        </Text>
                    </View>

                    {/* Form Card */}
                    <View style={[styles.formCard, { 
                        backgroundColor: theme.colors.cardBackground,
                        borderColor: theme.colors.border 
                    }]}>
                        <Input
                            placeholder="Email Address"
                            placeholderTextColor={theme.colors.textPlaceholder}
                            leftIcon={<Icon name="mail" type="feather" color={theme.colors.primary} size={20} />}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            inputStyle={{ color: theme.colors.textPrimary }}
                            inputContainerStyle={[styles.inputField, { backgroundColor: theme.colors.background }]}
                        />
                        <Input
                            placeholder="Password"
                            placeholderTextColor={theme.colors.textPlaceholder}
                            leftIcon={<Icon name="lock" type="feather" color={theme.colors.primary} size={20} />}
                            onChangeText={setPassword}
                            secureTextEntry
                            inputStyle={{ color: theme.colors.textPrimary }}
                            inputContainerStyle={[styles.inputField, { backgroundColor: theme.colors.background }]}
                        />

                        <View style={styles.optionsContainer}>
                            <CheckBox
                                title="Remember Me"
                                checked={rememberMe}
                                onPress={() => setRememberMe(!rememberMe)}
                                containerStyle={styles.checkboxContainer}
                                textStyle={{ color: theme.colors.textSecondary }}
                                checkedColor={theme.colors.primary}
                                uncheckedColor={theme.colors.textSecondary}
                            />
                            <TouchableOpacity onPress={() => Alert.alert('Reset', 'Feature coming soon')}>
                                <Text style={{ color: theme.colors.primary, fontWeight: '600' }}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={handleLogin} disabled={isLoading} activeOpacity={0.8}>
                            <LinearGradient
                                colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
                                style={styles.button}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                {isLoading ? (
                                    <ActivityIndicator color="#FFF" />
                                ) : (
                                    <Text style={styles.buttonText}>Log In</Text>
                                )}
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    {/* Divider */}
                    <View style={styles.dividerContainer}>
                        <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
                        <Text style={[styles.dividerText, { color: theme.colors.textSecondary }]}>OR CONNECT WITH</Text>
                        <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
                    </View>

                    {/* Social Buttons */}
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
                                    size={22}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={[styles.linkText, { color: theme.colors.primary }]}>Register</Text>
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
        padding: 24,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontWeight: '900',
        letterSpacing: 1,
    },
    subtitle: {
        fontSize: 14,
        marginTop: 8,
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
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        paddingHorizontal: 5,
    },
    checkboxContainer: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        padding: 0,
        marginLeft: 0,
    },
    button: {
        height: 55,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
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
        marginVertical: 30,
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
        marginBottom: 30,
    },
    socialIcon: {
        marginHorizontal: 10,
        width: 55,
        height: 55,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    footerText: {
        fontSize: 15,
    },
    linkText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
});

export default LoginScreen;