import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';

/**
 * Campo de contraseña con icono de ojo (cerrado por defecto).
 * - Icono dentro del input, alineado a la derecha
 * - Sombra y estilo consistente con CustomInput
 */
const PasswordInput = ({
  value,
  onChangeText,
  placeholder = 'Contraseña',
  error,
  width = '100%',
  // secureDefault: si quieres invertir el comportamiento en algún caso puntual
  secureDefault = true,
}) => {
  const [visible, setVisible] = useState(!secureDefault); // ojo cerrado por defecto (contraseña oculta)

  return (
    <View style={[styles.wrapper, { width }]}>
      <View style={[styles.inputRow, error && { borderColor: colors.error, borderWidth: 1 }]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          secureTextEntry={!visible}
          style={styles.input}
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={() => setVisible((v) => !v)} style={styles.iconBtn} hitSlop={10}>
          <Ionicons name={visible ? 'eye' : 'eye-off'} size={20} color={colors.textMuted} />
        </TouchableOpacity>
      </View>
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 18,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBg,
    borderRadius: 24,
    paddingLeft: 18,
    paddingRight: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  input: {
    flex: 1,
    color: colors.textDark,
    fontSize: 16,
    paddingVertical: 13,
    paddingRight: 8, // margen antes del icono
  },
  iconBtn: {
    padding: 6,
  },
  error: {
    marginTop: 6,
    marginLeft: 10,
    color: colors.error,
    fontSize: 13,
  },
});

export default PasswordInput;
