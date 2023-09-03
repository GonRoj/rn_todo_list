import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

import Modal from './components/Modal';
import EmptyInputModal from './components/EmptyInputModal';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App() {
  const [textValue, setTextValue] = useState('');
  const [itemsList, setItemsList] = useState([]);
  const [itemSelected, setItemSelected] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [emptyInputModalVisible, setEmptyInputModalVisible] = useState(false);

  const onHandleChangeItem = text => setTextValue(text);

  const addItem = () => {
    if (textValue === '') {
      // Show the empty input modal if the input is empty
      setEmptyInputModalVisible(true);
      return;
    }
    setItemsList(prevState => [
      ...prevState,
      { id: Math.random(), value: textValue, completed: false }, // Add completed property
    ]);
    setTextValue('');
  };

  const renderListItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.completionButton}
        onPress={() => onToggleCompletion(index)}>
        {item.completed ? (
          <Icon name="thumbs-o-up" size={21} color="#fff" />
        ) : (
          <Icon name="thumbs-up" size={21} color="#fff" />
        )}
      </TouchableOpacity>
      <Text
        style={[
          styles.textItem,
          item.completed && styles.completedText, // Apply styles for completed items
        ]}>
        {item?.value}
      </Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onHandleModal(index)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const onToggleCompletion = index => {
    setItemsList(prevState =>
      prevState.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const onHandleDelete = () => {
    const updatedItemsList = itemsList.filter((item, index) => index !== itemSelected);
    setItemsList(updatedItemsList);
    setModalVisible(false);
  };

  const onCancel = () => {
    setModalVisible(false);
  };

  const onHandleModal = index => {
    setModalVisible(true);
    setItemSelected(index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="New Item"
          value={textValue}
          onChangeText={onHandleChangeItem}
        />
        <TouchableOpacity style={styles.addButton} onPress={addItem}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={itemsList}
          renderItem={renderListItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
      <Modal modalVisible={modalVisible} onHandleDelete={onHandleDelete} onCancel={onCancel} />
      <EmptyInputModal
        modalVisible={emptyInputModalVisible}
        onGoBack={() => setEmptyInputModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    paddingTop: 80,
    backgroundColor: '#f0f0f0', // New background color
  },
  title: {
    fontSize: 35,
    fontWeight: '500',
    marginBottom: 25,
  },
  inputContainer: {
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 17,
    paddingLeft: 12,
  },
  listContainer: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  textItem: {
    flex: 1,
    fontSize: 18,
    paddingLeft: 10,
    color: 'black',
    fontWeight: '600',
  },
  completedText: {
    textDecorationLine: 'line-through', // Apply strike-through text for completed items
    color: '#888', // Customize the color for completed items
  },
  completionButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: '#7B8B9C',
  },
  completionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  deleteButton: {
    paddingHorizontal: 11,
    paddingVertical: 12,
    borderTopRightRadius: 9,
    borderBottomRightRadius: 9,
    backgroundColor: '#CB5338',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '400',
  },
  addButton: {
    backgroundColor: '#000',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
/* 
    
#CB5338 anaranjado
    
#7B8B9C gris

    */
