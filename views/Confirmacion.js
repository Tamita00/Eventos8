import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { postAuth } from './../authService';

export default function Confirmacion() {
    const navigation = useNavigation();
    const route = useRoute(); 
    const { eventoACrear, token, categories, locations } = route.params;

    const selectedCategory = categories.find(category => category.id === eventoACrear.id_event_category);
    const selectedLocation = locations.find(location => location.id === eventoACrear.id_event_location);

    const guardarEvento = async () => {
        if (!eventoACrear) {
            console.error("Error al subir evento");
        } else {
            await postAuth('event/', eventoACrear, token);
            alert('Tu evento ha sido creado con éxito!');
            navigation.navigate('Index', { token });
        }
    };

    const eventoNuevo = {
        'Nombre': eventoACrear.name,
        'Descripción': eventoACrear.description,
        'Categoría': selectedCategory ? selectedCategory.name : 'No especificada',
        'Localidad': selectedLocation ? selectedLocation.name : 'No especificada',
        'Fecha inicio': eventoACrear.start_date,
        'Duración en minutos': eventoACrear.duration_in_minutes,
        'Precio': eventoACrear.price,
        'Asistencia máxima': eventoACrear.max_assistance,
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>¿Querés publicar este evento?</Text>
            <View style={styles.datosEvento}>
                {Object.entries(eventoNuevo).map(([key, value]) => (
                    <Text key={key} style={styles.text}>
                        {`${key}: ${value}`}
                    </Text>
                ))}
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("Formulario", { token })} style={styles.no}>
                    <Text style={styles.buttonText}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={guardarEvento} style={styles.si}>
                    <Text style={styles.buttonText}>Si</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        marginVertical: 4,
        fontWeight: '600',
        color: '#333',
    },
    datosEvento: {
        backgroundColor: '#007BFF',
        borderRadius: 8,
        padding: 20,
        width: '100%',
        marginVertical: 20,
        elevation: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    no: {
        borderColor: '#007BFF',
        backgroundColor: 'transparent',
        flex: 1,
        marginRight: 10,
        paddingVertical: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 8,
    },
    si: {
        backgroundColor: '#007BFF',
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
