import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';

/**
 * Campo de contraseña con icono de ojo (cerrado por defecto).
 * - Icono dentro del input, alineado a la derecha
 * - Sombra y estilo consistente con CustomInput
 * - Mensaje de caracteres mínimos de contraseña
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
  const [showHint, setShowHint] = useState(false); //  muestra la guía cuando el usuario escribe
  //  Verifica si la contraseña cumple los requisitos mínimos
  const isPasswordValid = (password) =>
  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);

  return (
    <View style={[styles.wrapper, { width }]}>
      <View style={[styles.inputRow, error && { borderColor: colors.error, borderWidth: 1 }]}>
        <TextInput
           value={value}
           placeholder={placeholder}
           placeholderTextColor={colors.textMuted}
           secureTextEntry={!visible}
           style={styles.input}
           autoCapitalize="none"
           onFocus={() => setShowHint(true)} // 👁️ Muestra la guía cuando el usuario entra al campo
           onBlur={() => {
             // Si el usuario sale del campo y la contraseña cumple los requisitos → oculta el mensaje
             if (isPasswordValid(value)) setShowHint(false);
           }}
           onChangeText={(text) => {
             onChangeText(text);
             // Oculta la guía automáticamente al cumplir los requisitos
             if (isPasswordValid(text)) setShowHint(false);
            }}
        />

        <TouchableOpacity onPress={() => setVisible((v) => !v)} style={styles.iconBtn} hitSlop={10}>
          <Ionicons name={visible ? 'eye' : 'eye-off'} size={20} color={colors.textMuted} />
        </TouchableOpacity>
      </View>
      {!!error && <Text style={styles.error}>{error}</Text>}
      {!error && showHint && (
        <Text style={styles.hint}>
         La contraseña debe contener mínimo 8 caracteres, una mayúscula, un número y un símbolo.
        </Text>
      )}

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
    outlineStyle: 'none', 
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
  hint: {
    marginTop: 6,
    marginLeft: 10,
    color: colors.textMuted,
    fontSize: 13,
    fontStyle: 'italic',
    lineHeight: 18,
  },
});

export default PasswordInput;
