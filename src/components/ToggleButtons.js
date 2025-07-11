import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ToggleButtons = () => {
  const [activeToggle, setActiveToggle] = useState('premade'); // 'premade' or 'custom'

  return (
    <View style={styles.toggleButtons}>
      <TouchableOpacity
        style={[
          styles.toggleButton,
          activeToggle === 'premade' ? styles.activeButton : styles.inactiveButton,
        ]}
        onPress={() => setActiveToggle('premade')}
      >
        <Text style={activeToggle === 'premade' ? styles.activeText : styles.inactiveText}>
          Premade design
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.toggleButton,
          activeToggle === 'custom' ? styles.activeButton : styles.inactiveButton,
        ]}
        onPress={() => setActiveToggle('custom')}
      >
        <Text style={activeToggle === 'custom' ? styles.activeText : styles.inactiveText}>
          Custom design
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  toggleButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  toggleButton: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: '#f58220',
  },
  inactiveButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  activeText: {
    color: '#fff',
    fontWeight: '600',
  },
  inactiveText: {
    color: '#000',
    fontWeight: '600',
  },
});

export default ToggleButtons;
