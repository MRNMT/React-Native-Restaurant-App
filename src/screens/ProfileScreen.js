import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Input, Button, Text, Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { AuthService } from '../services/AuthService';
import { checkAuthStatus, logoutUser } from '../redux/authSlice';
import { useTheme } from '../contexts/ThemeContext';

const ProfileScreen = ({ navigation }) => {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const { theme, toggleTheme, isDarkMode } = useTheme();

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        contact: '',
        address: '',
        email: '',
        cardNumber: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                surname: user.surname || '',
                contact: user.contact || '',
                address: user.address || '',
                email: user.email || '',
                cardNumber: user.cardNumber || '',
            });
        }
    }, [user]);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleUpdate_Profile = async () => {
        try {
            await AuthService.updateProfile(formData);
            dispatch(checkAuthStatus());
            Alert.alert('Success', 'Profile Updated Successfully');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <ScrollView style={{ backgroundColor: theme.colors.background }} contentContainerStyle={styles.container}>
            <Text h4 style={[styles.header, { color: theme.colors.textPrimary }]}>My Profile</Text>

            <Input
                label="First Name"
                placeholder="First Name"
                placeholderTextColor={theme.colors.textPlaceholder}
                value={formData.name}
                onChangeText={(val) => handleChange('name', val)}
                leftIcon={<Icon name="user" type="feather" color={theme.colors.textSecondary} size={20} />}
                inputStyle={{ color: theme.colors.textPrimary }}
                inputContainerStyle={{ borderBottomColor: theme.colors.inputBorder }}
                labelStyle={{ color: theme.colors.textSecondary }}
            />
            <Input
                label="Last Name"
                placeholder="Last Name"
                placeholderTextColor={theme.colors.textPlaceholder}
                value={formData.surname}
                onChangeText={(val) => handleChange('surname', val)}
                leftIcon={<Icon name="user" type="feather" color={theme.colors.textSecondary} size={20} />}
                inputStyle={{ color: theme.colors.textPrimary }}
                inputContainerStyle={{ borderBottomColor: theme.colors.inputBorder }}
                labelStyle={{ color: theme.colors.textSecondary }}
            />
            <Input
                label="Email"
                value={formData.email}
                editable={false}
                leftIcon={<Icon name="mail" type="feather" color={theme.colors.textSecondary} size={20} />}
                inputStyle={[{ color: theme.colors.textPrimary }, { opacity: 0.7 }]}
                inputContainerStyle={{ borderBottomColor: theme.colors.inputBorder }}
                labelStyle={{ color: theme.colors.textSecondary }}
            />
            <Input
                label="Contact Number"
                placeholder="Contact Number"
                placeholderTextColor={theme.colors.textPlaceholder}
                value={formData.contact}
                keyboardType="phone-pad"
                onChangeText={(val) => handleChange('contact', val)}
                leftIcon={<Icon name="phone" type="feather" color={theme.colors.textSecondary} size={20} />}
                inputStyle={{ color: theme.colors.textPrimary }}
                inputContainerStyle={{ borderBottomColor: theme.colors.inputBorder }}
                labelStyle={{ color: theme.colors.textSecondary }}
            />
            <Input
                label="Address"
                placeholder="Address"
                placeholderTextColor={theme.colors.textPlaceholder}
                value={formData.address}
                onChangeText={(val) => handleChange('address', val)}
                leftIcon={<Icon name="home" type="feather" color={theme.colors.textSecondary} size={20} />}
                inputStyle={{ color: theme.colors.textPrimary }}
                inputContainerStyle={{ borderBottomColor: theme.colors.inputBorder }}
                labelStyle={{ color: theme.colors.textSecondary }}
            />
            <Input
                label="Card Number"
                placeholder="Card Number"
                placeholderTextColor={theme.colors.textPlaceholder}
                value={formData.cardNumber}
                keyboardType="numeric"
                onChangeText={(val) => handleChange('cardNumber', val)}
                leftIcon={<Icon name="credit-card" type="feather" color={theme.colors.textSecondary} size={20} />}
                inputStyle={{ color: theme.colors.textPrimary }}
                inputContainerStyle={{ borderBottomColor: theme.colors.inputBorder }}
                labelStyle={{ color: theme.colors.textSecondary }}
            />

            <Button
                title="Update Profile"
                onPress={handleUpdate_Profile}
                containerStyle={styles.btn}
                buttonStyle={{ backgroundColor: theme.colors.primary }}
            />

            {!user?.isAdmin && (
                <View style={[styles.settingsSection, { borderTopColor: theme.colors.border }]}>
                    <Text h5 style={[styles.settingsTitle, { color: theme.colors.textPrimary }]}>Profile</Text>
                    <Button
                        title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        type="outline"
                        onPress={toggleTheme}
                        containerStyle={styles.btn}
                        buttonStyle={{ borderColor: theme.colors.primary }}
                        titleStyle={{ color: theme.colors.primary }}
                        icon={<Icon name={isDarkMode ? "sun-o" : "moon-o"} type="font-awesome" color={theme.colors.primary} size={20} />}
                    />
                    <Button
                        title="Logout"
                        type="outline"
                        onPress={() => {
                            dispatch(logoutUser());
                            navigation.navigate('Welcome');
                        }}
                        containerStyle={styles.btn}
                        buttonStyle={{ borderColor: theme.colors.primary }}
                        titleStyle={{ color: theme.colors.primary }}
                        icon={<Icon name="sign-out" type="font-awesome" color={theme.colors.primary} size={20} />}
                    />
                </View>
            )}

            {user?.isAdmin && (
                <View style={[styles.adminSection, { borderTopColor: theme.colors.border }]}>
                    <Text h5 style={[styles.adminTitle, { color: theme.colors.textPrimary }]}>Admin Profile</Text>
                    <Button
                        title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        type="outline"
                        onPress={toggleTheme}
                        containerStyle={styles.btn}
                        buttonStyle={{ borderColor: theme.colors.primary }}
                        titleStyle={{ color: theme.colors.primary }}
                        icon={<Icon name={isDarkMode ? "sun-o" : "moon-o"} type="font-awesome" color={theme.colors.primary} size={20} />}
                    />
                    <Button
                        title="Logout"
                        type="outline"
                        onPress={() => {
                            dispatch(logoutUser());
                            navigation.navigate('Welcome');
                        }}
                        containerStyle={styles.btn}
                        buttonStyle={{ borderColor: theme.colors.primary }}
                        titleStyle={{ color: theme.colors.primary }}
                        icon={<Icon name="sign-out" type="font-awesome" color={theme.colors.primary} size={20} />}
                    />
                    <Button
                        title="Go to Admin Dashboard"
                        type="outline"
                        onPress={() => navigation.navigate('Admin')}
                        containerStyle={styles.btn}
                        buttonStyle={{ borderColor: theme.colors.primary }}
                        titleStyle={{ color: theme.colors.primary }}
                    />
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexGrow: 1,
    },
    header: {
        textAlign: 'center',
        marginBottom: 20,
    },
    btn: {
        marginVertical: 10,
    },
    settingsSection: {
        marginTop: 40,
        borderTopWidth: 1,
        paddingTop: 20,
        alignItems: 'center',
    },
    settingsTitle: {
        marginBottom: 10,
    },
    adminSection: {
        marginTop: 40,
        borderTopWidth: 1,
        paddingTop: 20,
        alignItems: 'center',
    },
    adminTitle: {
        marginBottom: 10,
    },
});

export default ProfileScreen;