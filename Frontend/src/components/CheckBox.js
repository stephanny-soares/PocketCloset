// CheckBox.js
// Componente reutilizable y compatible con Android, iOS y Web
// Si @react-native-community/checkbox no funciona en Web, usamos un fallback visual

import React from 'react';
import { Platform, Pressable, View } from 'react-native';
import CheckBoxBase from '@react-native-community/checkbox';
import colors from '../constants/colors';

// Fallback para Web: dibuja un recuadro clicable con estilo similar
const WebCheckBox = ({ value, onValueChange }) => (
  <Pressable
    onPress={() => onValueChange(!value)}
    style={{
      width: 20,
      height: 20,
      borderWidth: 2,
      borderColor: value ? colors.primary : '#999',
      backgroundColor: value ? colors.primary : 'transparent',
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {value && (
      <View
        style={{
          width: 8,
          height: 8,
          backgroundColor: '#fff',
          borderRadius: 2,
        }}
      />
    )}
  </Pressable>
);

// Detectamos la plataforma actual
const CheckBox = Platform.OS === 'web' ? WebCheckBox : CheckBoxBase;

export default CheckBox;
