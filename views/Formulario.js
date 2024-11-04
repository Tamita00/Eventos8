import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import { getCategories, getLocations } from '../authService';

export default function Formulario() {
    const navigation = useNavigation();
    
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [duracion, setDuracion] = useState("");
    const [precio, setPrecio] = useState("");
    const [asistenciaMax, setAsistenciaMax] = useState("");
    const [eventDate, setEventDate] = useState("");
    
    const [categories, setCategories] = useState([]);
    const [idSelectedCategory, setIdSelectedCategory] = useState(null);
    const [locations, setLocations] = useState([]);
    const [idSelectedLocation, setIdSelectedLocation] = useState(null);
    
    const route = useRoute();
    const { token, id } = route.params;  

    const renderItem = (item) => (
        <View style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemDate}>{item.start_date}</Text>
        </View>
    );

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories(token);
                setCategories(data);
            } catch (error) {
                console.error('(UseEffect) Error al cargar las categorías:', error);
            }
        };
    
        const fetchLocations = async () => {
            try {
                const data = await getLocations(token);
                setLocations(data);
            } catch (error) {
                console.error('(UseEffect) Error al cargar las localidades:', error);
            }
        };
    
        fetchCategories();
        fetchLocations();
    }, [token]);

    function handleGuardar() {
        const eventoACrear = {
            name: nombre,
            description: descripcion,
            id_event_category: idSelectedCategory,
            id_event_location: idSelectedLocation,
            start_date: eventDate,
            duration_in_minutes: duracion,
            price: precio,
            enabled_for_enrollment: 1,
            max_assistance: asistenciaMax,
        };
        navigation.navigate('Confirmacion', { eventoACrear, token, categories, locations });
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear un nuevo evento</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Nombre" 
                value={nombre} 
                onChangeText={setNombre} 
            />
            <TextInput 
                style={styles.input} 
                placeholder="Descripción" 
                value={descripcion} 
                onChangeText={setDescripcion} 
            />
            <TextInput 
                style={styles.input} 
                placeholder="Duración (minutos)" 
                value={duracion} 
                keyboardType="numeric"
                onChangeText={setDuracion} 
            />
            <TextInput 
                style={styles.input} 
                placeholder="Precio" 
                value={precio} 
                keyboardType="numeric"
                onChangeText={setPrecio} 
            />
            <TextInput 
                style={styles.input} 
                placeholder="Asistencia máxima" 
                value={asistenciaMax} 
                keyboardType="numeric"
                onChangeText={setAsistenciaMax} 
            />
            <TextInput 
                style={styles.input} 
                placeholder="Fecha del evento" 
                value={eventDate} 
                onChangeText={setEventDate} 
            />
            <View style={styles.dropdownContainer}>
                <Dropdown
                    data={categories}
                    labelField="name"
                    valueField="id"
                    placeholder="Categoría"
                    value={idSelectedCategory}
                    onChange={(item) => setIdSelectedCategory(item.id)}
                    renderItem={renderItem}
                />
            </View>
            <View style={styles.dropdownContainer}>
                <Dropdown
                    data={locations}
                    labelField="name"
                    valueField="id"
                    placeholder="Localidad"
                    value={idSelectedLocation}
                    onChange={(item) => setIdSelectedLocation(item.id)}
                    renderItem={renderItem}
                />
            </View>
            <TouchableOpacity onPress={handleGuardar} style={styles.boton}>
                <Text style={styles.botonText}>Guardar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#eaeaea', // Color de fondo más claro
        padding: 20,
        paddingTop: 40,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#2c3e50', // Color más oscuro
        marginBottom: 30,
    },
    input: {
        height: 55,
        width: '100%',
        borderColor: '#2980b9',
        borderWidth: 1.5,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: 'white',
        fontSize: 16,
    },
    dropdownContainer: {
        width: '100%',
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 15,
        shadowColor: '#2980b9',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    boton: {
        backgroundColor: '#27ae60', // Color verde más vivo
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        elevation: 5,
        marginTop: 25,
    },
    botonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
    item: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc',
        backgroundColor: '#f9f9f9',
    },
    itemText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    itemDate: {
        fontSize: 12,
        color: '#7f8c8d',
    },
});
