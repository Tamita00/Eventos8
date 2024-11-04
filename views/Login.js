import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { loginUser } from '../authService';
import React, { useState } from 'react';

export default function Login() {
    const [username, setUsername] = useState('');
    const [contrasena, setContrasena] = useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
        if (!username || !contrasena) {
            alert('Por favor, completa todos los campos');
            return;
        }
        try {
            const credentials = {
                username,
                password: contrasena,
            };
            const user = await loginUser(credentials);
            navigation.navigate('Index', { nombre: user.username, token: user.token });
        } catch (error) {
            alert('Error al iniciar sesión');
            console.error('Error en el login:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Inicio sesión</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Usuario"
                    value={username}
                    onChangeText={setUsername}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Contraseña"
                    value={contrasena}
                    onChangeText={setContrasena}
                    secureTextEntry
                    style={styles.input}
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Iniciar Sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', // Fondo blanco
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#2E7D32', // Verde oscuro
        marginBottom: 20,
    },
    inputContainer: {
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    input: {
        width: '90%',
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#A5D6A7', // Verde claro
        backgroundColor: 'white',
        marginBottom: 15,
        shadowColor: '#000',
    },
    button: {
        backgroundColor: '#66BB6A', // Verde para el botón
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '90%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
});
