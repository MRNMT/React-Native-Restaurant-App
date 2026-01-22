import React, { useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Input, Text, Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../contexts/ThemeContext';
import { AuthService } from '../services/AuthService';

const AdminLoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { theme } = useTheme();

    const handleAdminLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter email and password');
            return;
        }

        setLoading(true);
        try {
            const user = await AuthService.login(email, password);
            
            if (user.role === 'admin') {
                navigation.replace('AdminScreen');
            } else {
                Alert.alert('Error', 'Access denied. Admin credentials required.');
                await AuthService.logout();
            }
        } catch (error) {
            Alert.alert('Error', error.message || 'Invalid admin credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <LinearGradient 
            colors={[theme.colors.background, theme.colors.cardBackground]} 
            style={styles.container}
        >
            <View style={styles.content}>
                <Image 
                    source={require('../../assets/crave and click logo.png')} 
                    style={styles.logo}
                    resizeMode="contain"
                />
                
                <Text h3 style={[styles.title, { color: theme.colors.textPrimary }]}>Admin Login</Text>
                <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
                    Access the admin dashboard
                </Text>

                <View style={[styles.formCard, { 
                    backgroundColor: theme.colors.cardBackground,
                    borderColor: theme.colors.border 
                }]}>
                    <Input
                        placeholder="Admin Email"
                        placeholderTextColor={theme.colors.textPlaceholder}
                        leftIcon={<Icon name="shield" type="font-awesome" color={theme.colors.primary} size={20} />}
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        inputStyle={{ color: theme.colors.textPrimary }}
                        inputContainerStyle={[styles.inputField, { backgroundColor: theme.colors.background }]}
                        editable={!loading}
                    />
                    <Input
                        placeholder="Admin Password"
                        placeholderTextColor={theme.colors.textPlaceholder}
                        leftIcon={<Icon name="lock" type="font-awesome" color={theme.colors.primary} size={20} />}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        inputStyle={{ color: theme.colors.textPrimary }}
                        inputContainerStyle={[styles.inputField, { backgroundColor: theme.colors.background }]}
                        editable={!loading}
                    />

                    <TouchableOpacity onPress={handleAdminLogin} disabled={loading}>
                        <LinearGradient
                            colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
                            style={styles.button}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            {loading ? (
                                <ActivityIndicator color="#FFFFFF" />
                            ) : (
                                <Text style={styles.buttonText}>Login as Admin</Text>
                            )}
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton} disabled={loading}>
                        <Text style={{ color: theme.colors.primary }}>Back to Main App</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.credentialsInfo}>
                    <Text style={{ color: theme.colors.textSecondary, fontSize: 12, textAlign: 'center' }}>
                        Default credentials:{'\n'}
                        Email: admin@fooddelivery.com{'\n'}
                        Password: admin123
                    </Text>
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
    },
    logo: {
        width: 150,
        height: 100,
        alignSelf: 'center',
        marginBottom: 20,
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 14,
        marginBottom: 30,
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
    backButton: {
        marginTop: 15,
        alignItems: 'center',
    },
    credentialsInfo: {
        marginTop: 30,
        padding: 15,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 165, 0, 0.1)',
    },
});

export default AdminLoginScreen;