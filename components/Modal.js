import React from 'react';
import { Modal as NewModal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Modal = ({ modalVisible, onHandleDelete, onCancel }) => {
  return (
    <NewModal visible={modalVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Confirmation</Text>
          <Text style={styles.modalMessage}>Are you sure you want to delete this item?</Text>
          <TouchableOpacity style={styles.modalButton} onPress={onHandleDelete}>
            <Text style={styles.modalButtonText}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButtonCancel} onPress={onCancel}>
            <Text style={styles.modalButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </NewModal>
  );
};

export default Modal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#7B8B9C',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  modalButtonCancel: {
    backgroundColor: '#CB5338', // Customize the background color for the cancel button
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
