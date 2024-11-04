import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getEventos } from '../authService';

export default function Index() {
    const navigation = useNavigation();
    const route = useRoute();
    const { nombre, token, id } = route.params;
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const data = await getEventos(token);
                setEventos(data);
            } catch (error) {
                console.error('Error al cargar los eventos:', error);
            }
        };
        fetchEventos();
    }, []);

    const handleCreateEvent = () => {
        navigation.navigate('Formulario', { token: token, id: id });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>¡Bienvenido, {nombre}!</Text>
            <Text style={styles.subtitle}>Has iniciado sesión exitosamente.</Text>
            <Text style={styles.title}>Próximos Eventos</Text>
            <ScrollView contentContainerStyle={styles.cardContainer}>
                {eventos.map((item) => (
                    <View key={item.id} style={styles.eventCard}>
                        <Text style={styles.eventTitle}>{item.name}</Text>
                        <Text style={styles.eventDate}>{item.start_date}</Text>
                    </View>
                ))}
            </ScrollView>
            <TouchableOpacity style={styles.button} onPress={handleCreateEvent}>
                <Text style={styles.buttonText}>Crear nuevo evento</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FD',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#555',
        marginBottom: 30,
        textAlign: 'center',
    },
    cardContainer: {
        flexGrow: 1,
        marginBottom: 20,
    },
    eventCard: {
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    eventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    eventDate: {
        fontSize: 14,
        color: '#555',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
