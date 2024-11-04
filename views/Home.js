import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function Home() {
    const navigation = useNavigation();
    const saludo = "Hola! Un gusto tenerte en nuestra aplicación";

    return (
        <View style={styles.container}>
            <Text style={styles.saludo}>{saludo}</Text>
            <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.botonText}>Iniciar sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('Register')}>
                <Text style={styles.botonText}>Registrarse</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff', // Color de fondo claro
        padding: 30,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    saludo: {
        fontSize: 26,
        fontWeight: '600',
        marginBottom: 25,
        textAlign: 'center',
        color: '#2E7D32', // Color del texto verde oscuro
    },
    boton: {
        backgroundColor: '#66BB6A', // Color verde para botones
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
        marginVertical: 10,
        elevation: 3, // Sombra para Android
    },
    botonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
});
