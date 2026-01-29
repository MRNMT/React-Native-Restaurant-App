import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ImageBackground, Dimensions } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../contexts/ThemeContext';

const { width, height } = Dimensions.get('window');

const AdminAccessButton = ({ navigation, theme }) => (
    <TouchableOpacity 
        style={[styles.adminButton, { borderColor: theme.colors.border }]}
        onPress={() => navigation.navigate('AdminLoginScreen')}
    >
        <Icon 
            name="shield" 
            type="font-awesome" 
            color={theme.colors.textSecondary} 
            size={16} 
        />
        <Text style={[styles.adminText, { color: theme.colors.textSecondary }]}>
            Admin Access
        </Text>
    </TouchableOpacity>
);

const WelcomeScreen = ({ navigation }) => {
    const { theme } = useTheme();

    return (
        <View style={styles.container}>
            {/* Background Image for a "Foodie" vibe */}
            <ImageBackground 
                source={{ uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000' }} 
                style={styles.backgroundImage}
            >
                {/* Dark Overlay to make text readable */}
                <LinearGradient
                    colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.85)']}
                    style={styles.overlay}
                >
                    <View style={styles.content}>
                        {/* Logo Area */}
                        <View style={styles.logoContainer}>
                            <Image 
                                source={require('../../assets/crave and click logo.png')} 
                                style={styles.logo}
                                resizeMode="contain"
                            />
                        </View>

                        {/* Text Content */}
                        <View style={styles.textContainer}>
                            <Text h1 style={styles.title}>Crave & Click</Text>
                            <View style={styles.divider} />
                            <Text style={styles.subtitle}>
                                Your favorite meals, {"\n"}delivered with a single click.
                            </Text>
                        </View>

                        {/* Action Buttons */}
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity 
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate('Login')}
                            >
                                <LinearGradient
                                    colors={[theme.colors.gradientStart || '#FF7E5F', theme.colors.gradientEnd || '#FEB47B']}
                                    style={styles.gradientButton}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                >
                                    <Text style={styles.buttonText}>Login</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                activeOpacity={0.7}
                                onPress={() => navigation.navigate('Register')} 
                                style={[styles.outlineButton, { borderColor: '#FFFFFF' }]}
                            >
                                <Text style={styles.outlineButtonText}>Create Account</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                <Text style={styles.guestButtonText}>Continue as Guest</Text>
                            </TouchableOpacity>

                            {/* Admin Access Button */}
                            <AdminAccessButton navigation={navigation} theme={theme} />
                        </View>
                    </View>
                </LinearGradient>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: width,
        height: height,
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
    },
    content: {
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    logoContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 15,
        borderRadius: 100,
        marginBottom: 30,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    logo: {
        width: 100,
        height: 100,
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 38,
        textAlign: 'center',
        letterSpacing: 1,
    },
    divider: {
        width: 50,
        height: 4,
        backgroundColor: '#FF7E5F',
        marginVertical: 15,
        borderRadius: 2,
    },
    subtitle: {
        color: '#E0E0E0',
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 26,
    },
    buttonContainer: {
        width: '100%',
    },
    gradientButton: {
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    outlineButton: {
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1.5,
        marginBottom: 20,
    },
    outlineButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    guestButtonText: {
        color: '#BBBBBB',
        textAlign: 'center',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    adminButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 20,
        backgroundColor: 'transparent',
    },
    adminText: {
        fontSize: 14,
        marginLeft: 8,
        fontWeight: '500',
    },
});

export default WelcomeScreen;
