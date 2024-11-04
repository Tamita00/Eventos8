import { useNavigation } from '@react-navigation/native';
import CustomTextInput from '../components/textInput';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { registerUser } from '../authService';
import React, { useState } from 'react';

export default function Register() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [username, setUsername] = useState('');
    const [contrasena, setContrasena] = useState('');
    const navigation = useNavigation();
  
    const handleRegister = async () => {
        try {
            const userData = {
                first_name: nombre,
                last_name: apellido,
                username,
                password: contrasena,
            };
            await registerUser(userData);
            navigation.navigate('Login');
        } catch (error) {
            alert('Error al registrar');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Regístrate</Text>
            <View style={styles.inputContainer}>
                <CustomTextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} />
                <CustomTextInput placeholder="Apellido" value={apellido} onChangeText={setApellido} />
                <CustomTextInput placeholder="Usuario" value={username} onChangeText={setUsername} />
                <CustomTextInput placeholder="Contraseña" value={contrasena} onChangeText={setContrasena} secureTextEntry />
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Registrarse</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FD',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 50,
        width: '100%',
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#333',
        marginBottom: 20,
    },
    inputContainer: {
        alignItems: 'center',
        width: '80%',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
        marginTop: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
});
