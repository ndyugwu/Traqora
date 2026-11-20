import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function PassengerDetailsScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');

  const handleValidate = () => {
    if (!firstName.trim() || !lastName.trim()) {
      setError('First name and last name are required for supplier fulfillment.');
      return;
    }
    setError('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Passenger Details</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        testID="first-name-input"
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        testID="last-name-input"
      />
      {error ? (
        <Text style={styles.errorText} testID="passenger-error">
          {error}
        </Text>
      ) : null}
      <Button title="Validate Details" onPress={handleValidate} testID="validate-button" />
      <View style={styles.privacyNoticeContainer} testID="passenger-privacy-notice">
        <Text style={styles.privacyText}>
          Notice: Passenger information is collected solely for supplier fulfillment. Only necessary travel details are required.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
    fontSize: 12,
  },
  privacyNoticeContainer: {
    marginTop: 12,
    padding: 10,
    backgroundColor: '#f4f6f8',
    borderRadius: 6,
  },
  privacyText: {
    fontSize: 12,
    color: '#555',
    lineHeight: 16,
  },
});
